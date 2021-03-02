exports.up = function (knex) {
  return knex.schema.createTable('Torra', (table) => {
    table.string('torra_id').primary().notNullable();
    table.string('nome').primary().notNullable();
    table.string('timestamp').notNullable();
    table.string('descricao').notNullable();
    table.string('arquivo_id').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('Torra');
};
