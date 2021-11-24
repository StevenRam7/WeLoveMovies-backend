exports.up = function(knex) {
    return knex.schema.createTable("movies_theaters", (table) => {
        table.integer("movie_id").unsigned().notNullable();
        table.foreign("movie_id");
        table.references("movie_id");
        table.inTable("movies");
        table.onDelete("cascade");
        table.integer("theater_id").unsigned().notNullable();
        table.foreign("theater_id");
        table.references("theater_id");
        table.inTable("theaters");
        table.onDelete("cascade");
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("movies_theaters");
};
