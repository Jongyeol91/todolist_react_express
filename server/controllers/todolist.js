// server/controllers/todolist.js

// Import database
const knex = require('./../db');

// Retrieve all todolist
exports.todolistAll = async (req, res) => {
  // Get all todolist from database
  knex
    .select('*')
    .from('todolist')
    .orderBy('id','desc')
    .then(userData => {
      // Send todolist extracted from database in response
      res.json(userData)
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving todolist: ${err}` })
    })
};

// Create new todolist
exports.todolistCreate = async (req, res) => {
  console.log("create: req.body", req.body);
  // Add new todolist to database
  knex('todolist')
    .insert({ // insert new record, a book
      'ref': req.body.ref,
      'todo': req.body.todo,
      'completed': req.body.completed,
    })
    .then(() => {
      // Send a success message in response
      res.json({ message: `todolist \'${req.body.todo}\' ref ${req.body.ref}` })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error creating ${req.body.title} todolist: ${err}` })
    })
}

// Remove specific todolist
exports.todolistDelete = async (req, res) => {
  // Find specific todolist in the database and remove it
  knex('todolist')
    .where('id', req.query.id) // find correct record based on id
    .del() // delete the record
    .then(() => {
      // Send a success message in response
      res.json({ message: `todolist ${req.body.id} deleted.` })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error deleting ${req.body.id} todolist: ${err}` })
    })
}

// complete todolist
exports.todolistComplete = async (req, res) => {
  console.log("complete: req.body", req.body);
  knex('todolist')
      .where('id', req.body.id)
      .update({'completed': req.body.completed})
      .update('updatedAt', knex.fn.now())
      .then(() => {
        // Send a success message in response
        res.json({ message: 'todolist completed.' })
      })
      .catch(err => {
        // Send a error message in response
        res.json({ message: `There was an error resetting todolist: ${err}.` })
      })
}

// update todolist
exports.todolistUpdate = async (req, res) => {
  console.log("update: req.body", req.body);
  knex('todolist')
    .where('id', req.body.id)
    .update({'todo': req.body.todo, 'ref': req.body.ref})
    .update('updatedAt', knex.fn.now())
    .then(() => {
      // Send a success message in response
      res.json({ message: 'todolist updated.' })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error resetting todolist: ${err}.` })
    })
}

// Remove all todolist on the list
exports.todolistReset = async (req, res) => {
  // Remove all todolist from database
  knex
    .select('*') // select all records
    .from('todolist') // from 'todolist' table
    .truncate() // remove the selection
    .then(() => {
      // Send a success message in response
      res.json({ message: 'todolist cleared.' })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error resetting todolist: ${err}.` })
    })
}
