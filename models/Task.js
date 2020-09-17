const knex = require('../database/connection');

exports.PENDING = 'pending';
exports.DONE = 'done';

exports.all = () => {
  return knex
    .select('*')
    .from('tasks');
}

exports.create = (task) => {
  return knex('tasks')
    .insert({ description: task.description });
}

exports.find = (id) => {
  return knex
    .select('*')
    .from('tasks')
    .where('id', id)
    .first();
}

exports.delete = (id) => {
  return knex('tasks')
  .delete()
  .where('id', id);
}

exports.update = (id, task) => {
  return knex('tasks')
    .update(task)
    .update('updated_at', knex.fn.now())
    .where('id', id);
};
