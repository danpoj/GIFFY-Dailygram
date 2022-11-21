import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function signUp(req, res) {
  let currentUser
  if (req.method === 'POST') {
    const body = req.body
    currentUser = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    })
    if (!currentUser) {
      await prisma.user.create({
        data: {
          name: body.name,
          email: body.email,
          image: body.image,
        },
      })
      console.log('no user')
    }
  }

  res.json(currentUser)
}
