export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { userId, username } = req.query;

    try {
        if (username) {
            const r = await fetch(`https://users.roblox.com/v1/users/search?keyword=${username}&limit=1`);
            const data = await r.json();
            const user = data?.data?.[0];
            return res.json({ userId: user?.id || null });
        }

        if (userId) {
            const r = await fetch(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=150x150&format=Png`);
            const data = await r.json();
            return res.json({ imageUrl: data?.data?.[0]?.imageUrl || null });
        }

        res.status(400).json({ error: 'Missing param' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}