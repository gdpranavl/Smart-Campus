import { cache } from 'react';

export const getCachedData = cache(async (key: string, fetchFn: () => Promise<any>) => {
  // Implement caching logic here
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);
  
  const data = await fetchFn();
  await redis.set(key, JSON.stringify(data), 'EX', 3600);
  return data;
}); 