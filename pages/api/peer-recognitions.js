import { getPeerRecognitions } from '../../lib/db';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const recognitions = getPeerRecognitions();
    return res.status(200).json(recognitions);
  }
  
  return res.status(405).json({ message: 'Method not allowed' });
}
