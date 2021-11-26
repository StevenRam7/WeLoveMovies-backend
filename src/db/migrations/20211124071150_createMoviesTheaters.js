exports.up = function(knex) {
    return knex.schema.createTable("movies_theaters", (table) => {
        table.boolean("is_showing");
        table.integer("movie_id").unsigned().notNullable()
        .references("movies.movie_id").onDelete("cascade");
        table.integer("theater_id").unsigned().notNullable()
        .references("theater.theater_id").onDelete("cascade");
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("movies_theaters");
};
