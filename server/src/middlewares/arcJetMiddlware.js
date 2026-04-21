import aj from '../lib/arcjet.js';
import { isSpoofedBot } from '@arcjet/inspect';
import { UnauthorizedError } from '../errors/customError.js';

const protectLimit = async (req, res, next) => {
  try {
    const decision = await aj.protect(req);
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        res.status(429).json({ msg: 'Rate limit exceed. Please try again' });
      } else if (decision.reason.isBot) {
        throw new UnauthorizedError('Bot Detected');
      } else {
        throw new UnauthorizedError('Access denied by  security policy');
      }
    }

    if (decision.results.some(isSpoofedBot)) {
      throw new UnauthorizedError('Malicious bot activity detected');
    }
    next();
  } catch (error) {
    console.log('Arcjet protection error', error);
    next();
  }
};

export default protectLimit;
