import { Button } from 'antd-mobile'
import React, { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { useUpdateLocaleCallback } from '@/src/store/global/hooks'

interface IProps {
  statusCode: number
  message: string
}

const Error: FC<IProps> = ({ statusCode, message }) => {
  const { t, i18n } = useTranslation()
  const updateLocale = useUpdateLocaleCallback()

  const clickHandler = () => {
    updateLocale(i18n.language === 'zh_CN' ? 'en_US' : 'zh_CN')
  }

  useEffect(() => {
    console.log(i18n.language)
  }, [i18n.language])

  return (
    <div className="flex flex-col items-center justify-center w-full h-80">
      <h2>{statusCode}</h2>
      <h3>{t(`error: ${message}`)}</h3>
      <Button onClick={clickHandler}>{t('change language')}</Button>
    </div>
  )
}

export default Error
