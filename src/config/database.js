module.exports = {
    dialect: prosses.env.DATABASE_DIALECT,
    host: prosses.env.DATABASE_HOST,
    username: prosses.env.DATABASE_USERNAME,
    password: prosses.env.DATABASE_PASSWORD,
    database: prosses.env.DATABASE_DATABASE,
    define: {
        timestamps: true,
        underscored: true,
    },
    logging: false,
};
