import { List } from 'antd-mobile'
import request from 'graphql-request'
import { NextPage } from 'next'
import useSWR from 'swr'

const DemoPage: NextPage = () => {
  const { data, error, isLoading } = useSWR(
    `query {
      feed {
        id
        url
        description
      }
    }
      `,
    (query) => request('api/graphql', query)
  )
  console.log(data, error, isLoading)

  if (error) return <div>Failed to load</div>
  if (isLoading) return <div>Loading...</div>
  if (!data) return null

  return (
    <List header="基础用法">
      {data.feed.map((link: any, index: number) => (
        <List.Item key={index}>{link.url}</List.Item>
      ))}
    </List>
  )
}

export default DemoPage
