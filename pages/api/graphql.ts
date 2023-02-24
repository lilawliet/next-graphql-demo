import { createYoga } from 'graphql-yoga'
import { NextApiRequest, NextApiResponse } from 'next'

import { createContext } from '@/src/server/context'
import { schema } from '@/src/server/schema'

export default createYoga<{
  req: NextApiRequest
  res: NextApiResponse
}>({
  schema,
  context: createContext,
  // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: '/api/graphql',
})

export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  },
}
