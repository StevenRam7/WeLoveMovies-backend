const knex = require("../db/connection");

function update(updatedReview, reviewId) {
   console.log(updatedReview)
  return knex("reviews")
  .update({ ...updatedReview })
  
}

function read(reviewId) {
   return knex("reviews as r")
  .join("critics as c", "r.critic_id", "c.critic_id")
  .select("*")
  .where({ review_id: reviewId })
  //.then((result) => result[0])
}

function destroy(reviewId){
  return knex("reviews")
  .where({ review_id: reviewId })
  .del();
}

module.exports = {
    read,
   update,
   delete: destroy
 }