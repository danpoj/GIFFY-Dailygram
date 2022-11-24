import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function rerender(req, res) {
  if (req.method === 'POST') {
    const post = await prisma.post.findUnique({
      where: {
        id: req.body.id,
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
            image: true,
          },
        },
        Comment: {
          include: {
            author: true,
          },
        },
      },
    })

    res.json(post)
  }
}
