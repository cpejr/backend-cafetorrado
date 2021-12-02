exports.up = function (knex) {
  return knex.schema.createTable('user', (table) => {
    table.string('user_id').primary().notNullable();
    table.string('username').notNullable();
    table.integer('password').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('user');
};
