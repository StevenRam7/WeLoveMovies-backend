exports.up = function(knex) {
    return knex.schema.createTable("reviews", (table) => {
        table.increments("review_id").primary();
        table.text("content");
        table.integer("score");
        table.integer("critic_id").unsigned().notNullable();
        table.foreign("critic_id");
        table.references("critic_id");
        table.inTable("critics");
        table.onDelete("cascade");
        table.integer("movie_id").unsigned().notNullable();
        table.foreign("movie_id");
        table.references("movie_id");
        table.inTable("movies");
        table.onDelete("cascade");
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("reviews");
};