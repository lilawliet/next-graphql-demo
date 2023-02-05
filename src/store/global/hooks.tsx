import { useAppSelector } from '../hooks'
import { GlobalState } from './reducer'

export function useGlobal(): GlobalState {
  return useAppSelector((state) => state.global)
}
