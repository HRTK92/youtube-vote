// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../server/db/client'

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  const { url, composer, genre, hook } = req.query
  await prisma.music.create({
    data: {
      url: url as string,
      composer: composer as string,
      genre: genre as string,
      hook: hook as string,
    },
  })
  res.status(200)
}

export default create
