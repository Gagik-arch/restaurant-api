export default {
    limit: '10mb',
    mongodb: 'mongodb://127.0.0.1:27017/restaurants',
    PORT: 3000,
    host: 'http://localhost:3030',
    corsOptions: {
        credentials: true,
        optionsSuccessStatus: 200
    },
}
