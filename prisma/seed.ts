import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const linkData: Prisma.LinkCreateInput[] = [
  {
    url: 'google.com',
    description: 'google',
  },
  {
    url: 'baidu.com',
    description: 'baidu',
  },
]

export async function main() {
  try {
    console.log(`Start seeding ...`)
    for (const l of linkData) {
      const link = await prisma.link.create({
        data: l,
      })
      console.log(`Created link with id: ${link.id}`)
    }
    console.log(`Seeding finished.`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
