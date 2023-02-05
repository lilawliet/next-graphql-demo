import { Button } from 'antd-mobile'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

interface IProps {
  statusCode: number
  message: string
}

const Error: FC<IProps> = ({ statusCode, message }) => {
  const { t, i18n } = useTranslation()
  const changeLanguage = () => {
    i18n.changeLanguage(i18n.language === 'zh_CN' ? 'en_US' : 'zh_CN')
  }
  return (
    <div className=" flex w-full h-80 justify-center items-center ">
      <h2>{statusCode}</h2>
      <h3>{t(`error.${message}`)}</h3>
      <Button onClick={changeLanguage}>{t('change__lng')}</Button>
    </div>
  )
}

export default Error
