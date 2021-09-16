exports.up = function (knex) {
  return knex.schema.createTable('mark', (table) => {
    table.string('mark1').primary().notNullable();
    table.string('mark2').primary().notNullable();
    table.string('mark3').primary().notNullable();
    table.string('mark4').primary().notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('mark');
};
