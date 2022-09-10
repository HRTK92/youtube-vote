// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../server/db/client'

const list = async (req: NextApiRequest, res: NextApiResponse) => {
  const musicList = await prisma.music.findMany()
  res.status(200).json(musicList)
}

export default list
