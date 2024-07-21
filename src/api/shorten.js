import { connectToDatabase } from '../utils/mongodb';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { longUrl } = req.body;
        const { db } = await connectToDatabase();
        const shortId = generateShortId();
        const shortUrl = `${req.headers.host}/${shortId}`;

        const newUrl = { longUrl, shortUrl, shortId };
        await db.collection('urls').insertOne(newUrl);

        res.status(200).json(newUrl);
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}

function generateShortId() {
    return Math.random().toString(36).substring(2, 8);
}