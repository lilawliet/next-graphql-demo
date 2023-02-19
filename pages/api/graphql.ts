import { createContext, GraphQLContext } from '@/src/server/context'
import { makeExecutableSchema } from '@graphql-tools/schema'
import type { Link } from '@prisma/client'
import { createYoga } from 'graphql-yoga'
import { NextApiRequest, NextApiResponse } from 'next'

export const fetcher = (query: string) =>
  fetch('/api/graphql', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ query }),
  })
    .then((res) => res.json())
    .then((json) => json.data)

const typeDefinitions = /* GraphQL */ `
  type Query {
    info: String!
    feed: [Link!]!
  }

  type Link {
    id: ID!
    description: String!
    url: String!
  }
`
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: (parent: unknown, args: {}, context: GraphQLContext) => context.prisma.link.findMany(),
  },
  Link: {
    id: (parent: Link) => parent.id,
    description: (parent: Link) => parent.description,
    url: (parent: Link) => parent.url,
  },
  // Query: {
  //   info: () => `This is the API of a Hackernews Clone`,
  //   feed: async () =>
  //     await prisma.link.findMany()
  // },
  // Link: {
  //   id: (parent: Link) => parent.id,
  //   description: (parent: Link) => parent.description,
  //   url: (parent: Link) => parent.url
  // },
  // Mutation: {
  //   async postLink(
  //     parent: unknown,
  //     args: { description: string; url: string },
  //     context: GraphQLContext
  //   ) {
  //     const newLink = await context.prisma.link.create({
  //       data: {
  //         url: args.url,
  //         description: args.description
  //       }
  //     })
  //     return newLink
  //   }
  // }
}

export const schema = makeExecutableSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefinitions],
})

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
