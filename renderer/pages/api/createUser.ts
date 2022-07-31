import { PrismaClient } from '@prisma/client';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient();
  try {
    await prisma.user.create({
      data: { email: req.body.email, name: req.body.name },
    });
    
    res.status(200).json({ success: true, message: 'user created' });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};
