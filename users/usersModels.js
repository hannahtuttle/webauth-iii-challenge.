const db = require('../data/dbConfig.js')

module.exports = {
    find,
    findby,
    add, 
    findById
}

function find () {
    return db('users')
}

function findby (item) {
    return db('users').where(item)
}

function add (user) {
    return db('users')
    .insert(user, 'id')
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function findById (id) {
    return db('users').where({id}).first()
}