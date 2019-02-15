console.log("xhr.js connected");

function sort_date() {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'books.txt', false);
    xhr.onload = () => {
        let books = JSON.parse(xhr.responseText);

        books.sort((book_a, book_b) => {
            return book_b.return_date - book_a.return_date;
        })

        books = books.filter((book) => {
            return book.available === false;
        })
        renderHTML(books);
    }
    xhr.send();

    if (xhr.status != 200) {
        alert('Ошибка ' + xhr.status + ': ' + xhr.statusText);
    }
}


function sort_available() {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'books.txt', false);
    xhr.onload = () => {
        let books = JSON.parse(xhr.responseText);

        books = books.filter((book) => {
            return book.available === true;
        })

        renderHTML(books);
    }
    xhr.send();

    if (xhr.status != 200) {
        alert('Ошибка ' + xhr.status + ': ' + xhr.statusText);
    }
}

function print_all() {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'books.txt', false);
    xhr.onload = () => {
        let books = JSON.parse(xhr.responseText);
        renderHTML(books);
    }
    xhr.send();

    if (xhr.status != 200) {
        alert('Ошибка ' + xhr.status + ': ' + xhr.statusText);
    }

}

function renderHTML(books) {
    let htmlString = "";
    for (i = 0; i < books.length; i++) {
        let date = new Date(books[i].return_date);

        htmlString +=
            `<div class="card">
            <a href="/book_card/${books[i].id}">${books[i].name}</a>
            `;

        if (books[i].available) {
            htmlString +=
                `<p><b><span style="color: green">В наличии</span></b></p>
                `;
        } else {
            htmlString +=
                `<p>У читателя до ${date.toDateString()}</p>
            `;
        }

        htmlString +=
            `<form method="GET" action="/${books[i].id}">
            <button type="submit">Удалить</button>
        </form></div>
        `
    }

    console.log(htmlString);
    document.getElementById("book_list").innerHTML = htmlString;

}



function user(id) {
    var xhr = new XMLHttpRequest();
    let user;

    xhr.open('GET', '../users.txt', false);
    xhr.onload = () => {
        console.log(xhr.responseText);

        let users = JSON.parse(xhr.responseText);
        console.log(id);

        user = users.find((_user) => {
            console.log(_user.id);
            return _user.id == id;
        })
    }
    xhr.send();

    if (xhr.status != 200) {
        alert('Ошибка ' + xhr.status + ': ' + xhr.statusText);
    } else {
        alert(`
        ID: ${user.id}
        Имя пользователя: ${user.name}
        Читаемые книги: ${user.books}`);
    }
}