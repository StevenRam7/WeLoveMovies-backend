const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");
const addCritic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name"
})

function list(isShowing) {
  if (isShowing) {
    return knex("movies as m")
    .join ("movies_theaters as mt", "mt.movie_id", "m.movie_id")
    .select("m.*")
    .where({ "mt.is_showing": true })
    .distinct()
  }
  else {
    return knex("movies")
    .select("*")
  }
 }

function theaterList(movieId) {
  return knex("movies as m")
  .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
  .join("theaters as t", "t.theater_id", "mt.theater_id")
  .select("t.*")
  .groupBy("t.theater_id")
}

function reviewList(movieId) {
  return knex("movies as m")
  .join("reviews as r", "r.movie_id", "m.movie_id")
  .join("critics as c", "c.critic_id", "r.critic_id")
  .select("*")
  .where({ "r.movie_id": movieId })
  .then((result) => {
            return result.map((result) => addCritic(result));
        })
}

function read(movieId) {
  return knex("movies")
  .select("*")
  .where({ "movie_id": movieId })
  .then((result) => result[0])
}

module.exports = {
  list,
  theaterList,
  reviewList,
  read
 }