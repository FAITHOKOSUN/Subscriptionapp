import aj from '../config/arcject.js';

const arcjetMiddleware = async (req, res, next) => {
    try {
        const decision = await aj.protect(req, { requested: 1 });
        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return res.status(429).json({ error: "Rate limit exceeded, Too Many Requests" });
            }
            if (decision.reason.isBot()) {
                return res.status(403).json({ error: "Access Denied, No bots allowed" });
            }
            return res.status(403).json({ error: "Access Denied, Forbidden" });
        }
        next();
    } catch (error) {
        console.error(`Arcjet middleware error:`, error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export default arcjetMiddleware;