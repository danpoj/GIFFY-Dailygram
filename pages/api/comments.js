import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function comments(req, res) {
  const body = req.body
  if (req.method === 'POST') {
    const author = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    })

    const comment = await prisma.comment.create({
      data: {
        text: body.text,
        authorId: author.id,
        postId: body.postId,
      },
    })

    res.json(comment)
  }

  if (req.method === 'GET') {
    const comments = await prisma.comment.findMany({
      where: {},
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    })

    res.json(comments)
  }
}
