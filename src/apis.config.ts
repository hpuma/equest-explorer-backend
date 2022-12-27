import { registerAs } from '@nestjs/config';
export default registerAs('config', () => ({
  newsApiBaseURL: process.env.NEWS_API_BASE_URL,
  newsApiKey: process.env.NEWS_API_KEY,
  alphavApiKey: process.env.ALPHAVA_API_KEY,
  alphavBaseURL: process.env.ALPHAV_BASE_URL,
  marketauxBaseURL: process.env.MARKETAUX_BASE_URL,
  marketauxApiKey: process.env.MARKETAUX_API_KEY,
}));
