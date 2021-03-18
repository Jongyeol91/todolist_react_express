
// Import path module
const path = require('path');

// Get the location of database.sqlite file
const dbPath = path.resolve(__dirname, 'db/database.sqlite');

// Create connection to SQLite database
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true
})

// Create a table in the database called "todolist"
knex.schema
  // Make sure no "todolist" table exists
  // before trying to create new
  .hasTable('todolist')
  .then((exists) => {
    if (!exists) {
      // todolist 테이블이 존재하지 않으면
      // create new, with "id", "ref", "task", "completed"
      // and use "id" as a primary identification
      // and increment "id" with every new record (todolist)
      return knex.schema.createTable('todolist', (table)  => {
        table.increments('id').primary();
        table.string('ref');
        table.string('task');
        table.integer('completed');
        table.timestamp('createdAt').defaultTo(knex.fn.now());
      })
        .then(() => {
          // Log success message
          console.log('Table \'todolist\' created')
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`)
        })
    }
  })
  .then(() => {
    // Log success message
    console.log('done')
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`)
  })

// Just for debugging purposes:
// Log all data in "todolist" table
knex.select('*').from('todolist')
  .then(data => console.log('data:', data))
  .catch(err => console.log(err))

// Export the database
module.exports = knex;
