import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  createMigrate,
  PersistedState,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
// import storageSession from 'redux-persist/lib/storage/session' // sessionStorage机制
import global from './global/reducer'
// import { updateVersion } from './global/actions'

const migrations = {
  0: (state: PersistedState): PersistedState => {
    console.log(0, state)
    return {
      ...state,
    } as PersistedState
  },
  1: (state: PersistedState): PersistedState => {
    console.log(1, state)
    return state
  },
}

const persistConfig = {
  key: 'root',
  storage: storage, // storage or storageSession
  version: 1,
  blackList: [], // 不会被存到缓存中
  // whiteList: [],  // 配置之后，只会缓存列表中的字段
  migrate: createMigrate(migrations, { debug: true }),
}

const needPersistenceReducers = combineReducers({
  // 需要持久化的 reducers
  global,
})
const persistedReducer = persistReducer(persistConfig, needPersistenceReducers)

const rootReducer = combineReducers({
  persistedReducer,
  // otherReducer
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        /**
         * 用于检测是否有任何不可序列化的值被包含在状态或派发的动作中，
         * 其模型是redux-immutable-state-invariant。
         * 任何检测到的不可序列化的值都会被记录到控制台
         */
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

setupListeners(store.dispatch)
persistStore(store)

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// store.dispatch(updateVersion())

export default store
