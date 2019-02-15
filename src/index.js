const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const storage = require('./storage');

let app = express();

let main_storage = storage.read_storage();
console.log(`MAIN: ${JSON.stringify(main_storage)}`);

app.use(express.static(__dirname + '/public/'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(require('cookie-parser')());

app.set('view engine', 'pug');
app.set('views', __dirname + '/../views');


app.get('/', (req, res, next) => {


    res.render('index', {
        book_list: main_storage.books
    });

});


app.get('/:id([0-9]{1,})', (req, res, next) => {
    console.log("delete " + req.params.id);


    storage.delete_book(main_storage, req.params.id);

    res.redirect('back');
});



app.get('/add_book', (req, res, next) => {
    res.render('add_book');
});

app.post('/add_book', (req, res) => {
    console.log("add");
    let body = req.body;
    storage.add_book(main_storage, body);
    res.render('add_book');
});



app.post('/add_user', (req, res) => {
    let body = req.body;
    storage.add_user(main_storage, body);
    res.render('add_user');
})

app.get('/add_user', (req, res, next) => {
    res.render('add_user');
});

app.post('/book_card/return/:id', (req, res, next) => {
    console.log("____");
    let body = req.body;
    console.log(body);

    console.log('return');
    console.log(req.params.id);

    storage.return_book(main_storage, req.params.id);

    res.redirect('/book_card/' + req.params.id);
});

app.post('/book_card/:id', (req, res, next) => {
    console.log("card");
    let body = req.body;
    console.log(body);

    if (body.name) {
        console.log('change');
        storage.change_book(main_storage, body, req.params.id);
    } else if (body.days) {
        console.log('give');
        storage.give_book(main_storage, body, req.params.id);
    } else if (body.extend_days) {
        console.log('extend');
        storage.extend_book(main_storage, body, req.params.id);
    }


    res.render('book_card', {
        book: main_storage.books.find((book) => {
            return book.id == req.params.id;
        }),
        storage: main_storage,
    });

});



app.get('/book_card/:id', (req, res, next) => {

    res.render('book_card', {
        book: main_storage.books.find((item) => {
            return item.id == req.params.id;
        }),
        storage: main_storage,
    });
});






app.listen(3000, (err) => {
    if (err) throw err;
    else console.log('Running server at port 3000!');
});