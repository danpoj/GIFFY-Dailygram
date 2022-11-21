import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function posts(req, res) {
  const body = req.body
  if (req.method === 'POST') {
    const author = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    })

    const post = await prisma.post.create({
      data: {
        title: body.title,
        text: body.text,
        authorId: author.id,
        gif: body.gifData.src,
        width: body.gifData.width,
        height: body.gifData.height,
      },
    })

    res.json(post)
  }

  if (req.method === 'GET') {
    const posts = await prisma.post.findMany({
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
