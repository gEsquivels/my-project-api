module.exports = {
    dialect: 'postgres',
    host: '127.0.0.1',
    username: 'postgres',
    password: 'root',
    database: 'postgres',
    define: {
        timestamps: true,
        underscored: true,
    },
    logging: false,
};