import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import { LOCALE } from '@/src/i18n'

import { useAppSelector } from '../hooks'
import { globalActions, GlobalState } from './reducer'

export function useGlobal(): GlobalState {
  return useAppSelector((state) => state.persistedReducer.global)
}

export function useUpdateLocaleCallback() {
  const dispatch = useDispatch()
  const { i18n } = useTranslation()
  return useCallback(
    (locale: LOCALE) => {
      i18n.changeLanguage(locale)
      dispatch(globalActions.changeLocale({ locale }))
    },
    [dispatch, i18n]
  )
}
