exports.up = function (knex) {
  return knex.schema.createTable('mark', (table) => {
    table.string('mark_id').primary().notNullable();
    table.string('roast_id').primary().notNullable();
    table.foreign('roast_id').references('roast_id').inTable('roast').onDelete('cascade');
    table.string('mark_name').notNullable();
    table.integer('mark_value').notNullable();
    table.boolean('is_crack').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('mark');
};
