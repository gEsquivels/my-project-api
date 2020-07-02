module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'postegres',
    database: 'project',
    define: {
        timestamps: true,
        underscored: true,
    },
    logging: false,
};
