import { LOCALE } from '@/src/i18n'
import { createSlice } from '@reduxjs/toolkit'
import { updateVersion } from './actions'

export type GlobalState = {
  version: string
  locale: LOCALE
}

const initialState: GlobalState = {
  version: process.env.NEXT_PUBLIC_VERSION,
  locale: process.env.NEXT_PUBLIC_LOCALE as LOCALE,
}
const slice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    changeLocale(
      state,
      action: {
        payload: {
          locale: LOCALE
        }
      }
    ) {
      const {
        payload: { locale },
      } = action
      state.locale = locale
    },
    clean(state) {
      state = initialState
      return state
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateVersion, () => {
      // 版本更新的时候重新初始化 state
    })
  },
})

export const globalActions = slice.actions
export default slice.reducer
