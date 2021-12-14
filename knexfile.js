// Update with your config settings.
require('dotenv').config({ path: './.env' });

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/db.sqlite',
      password: process.env.PASSWORD,
    },
    migrations: {
      directory: './src/database/migrations',
    },
    useNullAsDefault: true,
  },

};
