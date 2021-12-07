const { v4: uuidv4 } = require('uuid');

const user_id = uuidv4();
const password = process.env.PASSWORD;
console.log({ password });

exports.up = function (knex) {
  return knex.schema.createTable('user', (table) => {
    table.string('user_id').defaultTo(user_id).primary().notNullable();
    table.string('username').defaultTo('AtillaRoaster').notNullable();
    table.string('password').defaultTo(password).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('user');
};
