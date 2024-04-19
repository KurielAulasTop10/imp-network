import Redis from 'ioredis';

const redis = new Redis(`rediss://default:${process.env.REDIS_PASSWORD}@${process.env.REDIS_IP}:37389`, {
    
});

export default redis;
