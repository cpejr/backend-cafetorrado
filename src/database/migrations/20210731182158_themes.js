exports.up = function (knex) {
  return knex.schema.createTable('themes', (table) => {
    table.string('theme_id').primary().notNullable();
    table.string('lastTheme');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('themes');
};
