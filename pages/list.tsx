import { NextPage } from 'next'
import useSWR from 'swr'
import { fetcher } from './api/graphql'

// export async function getStaticProps() {
//   // `getStaticProps` 在服务器端执行。
//   return {
//     props: {
//       fallback: {
//         '/api/graphql': fetcher,
//       },
//     },
//   }
// }

const ListPage: NextPage = () => {
  const { data, error, isLoading } = useSWR(
    `{
      feed {
        id
        url
        description
      }
    }
      `,
    fetcher
  )
  console.log(data, error, isLoading)

  if (error) return <div>Failed to load</div>
  if (isLoading) return <div>Loading...</div>
  if (!data) return null

  return (
    <div>
      {/* {data.map((list: List, index: number) => (
        <div key={index}>{data.url}</div>
      ))} */}
    </div>
  )
}

export default ListPage
