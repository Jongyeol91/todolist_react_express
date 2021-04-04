// todolist/server/routes/todolist-route.js

// Import express
const express = require('express');

// Import todolist-controller
const todolistRoutes = require('./../controllers/todolist.js');

// Create router
const router = express.Router();

router.get('/', todolistRoutes.todolistAll);

router.post('/', todolistRoutes.todolistCreate);

router.delete('/', todolistRoutes.todolistDelete);

router.patch('/', todolistRoutes.todolistComplete);

router.put('/', todolistRoutes.todolistUpdate);

// router.delete('/reset', todolistRoutes.todolistReset);


// Export router
module.exports = router;
