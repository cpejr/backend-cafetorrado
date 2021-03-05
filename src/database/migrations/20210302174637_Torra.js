exports.up = function (knex) {
  return knex.schema.createTable('roast', (table) => {
    table.string('roast_id').primary().notNullable();
    table.string('name').primary().notNullable();
    table.string('description').notNullable();
    table.string('arquive_id').notNullable();
    table.timestamp('timestamp').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('torra');
};
