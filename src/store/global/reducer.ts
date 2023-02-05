import { createSlice } from '@reduxjs/toolkit'
import { updateVersion } from './actions'

export type GlobalState = {
  version: string
  locale: string
}

const initialState: GlobalState = {
  version: '',
  locale: process.env.BASE_LNG,
}
const slice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    add(
      state,
      action: {
        payload: {
          version: any
        }
      }
    ) {
      const {
        payload: { version },
      } = action
      state.version = version
    },
    clean(state) {
      state = initialState
      return state
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateVersion, () => {
      // 数据结构如果发生了变更，该怎么处理
    })
  },
})

export const globalActions = slice.actions
export default slice.reducer
