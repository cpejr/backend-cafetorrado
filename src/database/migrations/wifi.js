exports.up = (knex) => knex.schema.createTable('wifi', (table) => {
  table.string('name').primary().notNullable();
});

exports.down = (knex) => knex.schema.dropTable('wifi');
