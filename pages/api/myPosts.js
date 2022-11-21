import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function myPosts(req, res) {
  if (req.method === 'POST') {
    const posts = await prisma.post.findMany({
      where: {
        author: {
          email: req.body.email,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
            image: true,
          },
        },
      },
    })

    res.json(posts)
  }
}
