exports.up = function (knex) {
  return knex.schema.createTable('roast', (table) => {
    table.string('roast_id').primary().notNullable();
    table.string('name').primary().notNullable();
    table.string('timestamp').notNullable();
    table.string('description').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('roast');
};
