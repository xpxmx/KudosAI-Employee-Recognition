import { getPerks } from '../../lib/db';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const perks = getPerks();
    return res.status(200).json(perks);
  }
  
  return res.status(405).json({ message: 'Method not allowed' });
}
