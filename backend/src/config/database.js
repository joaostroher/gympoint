require('dotenv/config');

module.exports = {
  dialect: 'postgres',
  host: process.env.DB_HOST || 'postgres',
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USER || 'gympoint',
  password: process.env.DB_PASS || 'gympoint',
  database: process.env.DB_NAME || 'gympoint',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
};
