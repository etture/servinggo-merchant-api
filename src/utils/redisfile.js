const redis = require('redis');
let redisClient;

if (process.env.ELASTICACHE_URL) {
    redisClient = redis.createClient(process.env.ELASTICACHE_URL, {no_ready_check: true});
} else {
    redisClient = redis.createClient();
}

redisClient.on('connection', () => {
    console.log('Redis: Client connected');
});

redisClient.on('error', (err) => {
    console.log('Redis: Something went wrong:', err);
});

module.exports = redisClient;