module.exports = {
    dialect: process.env.DATABASE_DIALECT || 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    username: process.env.DATABASE_USERNAME || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'root',
    database: process.env.DATABASE_DATABASE || 'postgres',
    define: {
        timestamps: true,
        underscored: true,
    },
    logging: false,
};
