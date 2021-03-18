// todolist/server/routes/todolist-route.js

// Import express
const express = require('express');

// Import todolist-controller
const todolistRoutes = require('./../controllers/todolist.js');

// Create router
const router = express.Router();

router.get('/all', todolistRoutes.todolistAll);

router.post('/create', todolistRoutes.todolistCreate);

router.put('/delete', todolistRoutes.todolistDelete);

router.put('/update', todolistRoutes.todolistUpdate);

router.put('/reset', todolistRoutes.todolistReset);


// Export router
module.exports = router;
