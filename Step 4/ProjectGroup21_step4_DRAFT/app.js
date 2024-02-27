

var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

PORT        = 9177;                 // Set a port number at the top so it's easy to change in the future

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs", defaultLayout: 'main'}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

// Database
var db = require('./database/db-connector')

/*
    ROUTES
*/
app.get('/', function(req, res)
    {  
            res.render('index');                  
    });

// Add book to the table
    app.get('/books', function(req, res)
{  
    let query1 = "SELECT * FROM Books;";               // Define our query
    let query2 = "SELECT * FROM Authors;";

    db.pool.query(query1, function(error, rows, fields){    // Execute the query
        
        let books = rows;

        db.pool.query(query2, (error, rows, fields) => { // Used to populate select list of authors in books.hbs file
            let authors = rows;
            return res.render('books', {data: books, authors: authors});
        });                                                                                     
    });                                             
});    

// display authors table
app.get('/authors', function(req, res)
{  
    let query1 = "SELECT * FROM Authors;";               // Define our query
    db.pool.query(query1, function(error, rows, fields){    
        res.render('authors', {data: rows});                  
    })                                                      
});


app.post('/add-book-form', function(req, res){

    let data = req.body;

    query1 = `INSERT INTO Books (title, yearOfPublication, price) VALUES ('${data['title']}', '${data['yearOfPublication']}', '${data['price']}')`;
    query2 = `INSERT INTO AuthorsBooks (bookID, authorID) VALUES ((SELECT bookID FROM Books WHERE title = '${data['title']}'), '${data['author1test']}')`;
    
    db.pool.query(query1, function(error, rows, fields){

        db.pool.query(query2, (error, rows, fields) => {
            res.redirect('/books')
        })
    })
});

/*
/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});