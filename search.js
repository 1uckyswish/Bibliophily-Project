const bookSearch = document.querySelector(".content-nav input").value;
const bookTitle = document.querySelectorAll(".book-title"); // returns an array
const bookDetails = document.querySelectorAll(".card-details p"); // returns an array of 3 values
const bookImg = document.querySelectorAll(".card-img img"); // returns an array;


const apiKey = "AIzaSyBkVNpp07djnpcl_ueGOP6467hRX04BPAk";
const query = bookSearch;
const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`;



fetch(url)
.then(result => result.json())
.then(bookData => {
    console.log(bookData.items[0].volumeInfo);
    setBookCard(bookData)
})
.catch(error => console.log(error));


const setBookCard = (bookData) => {
    for(let i = 0; i < 6; i++){
        bookTitle[i].innerText = bookData.items[i].volumeInfo.title;
        bookImg[i].setAttribute("src", bookData.items[i].volumeInfo.imageLinks.thumbnail);
        // bookDetails[0].innerHTML = `Author: <span>${bookData.items[i].volumeInfo.authors[0]}</span>`
    }
};

setBookCard()