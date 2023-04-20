const bookSearch = document.querySelector(".content-nav input");
const bookTitle = document.querySelectorAll(".book-title"); // returns an array
const bookAuthor = document.querySelectorAll(".author");
const bookDate = document.querySelectorAll(".date");
const bookPublish = document.querySelectorAll(".publisher");
const bookImg = document.querySelectorAll(".card-img img"); // returns an array;
const bookButton = document.querySelector(".content-nav img");


const apiKey = "AIzaSyBkVNpp07djnpcl_ueGOP6467hRX04BPAk";

const setBookCard = (bookData) => {
    for(let i = 0; i < 6; i++){
        bookTitle[i].innerText = bookData.items[i].volumeInfo.title;
        bookImg[i].setAttribute("src", bookData.items[i].volumeInfo.imageLinks.thumbnail);
        bookAuthor[i].innerHTML = `Author: <span>${bookData.items[i].volumeInfo.authors}</span>`;
        bookDate[i].innerHTML = `Published Date: <span>${bookData.items[i].volumeInfo.publishedDate}`;
        bookPublish[i].innerHTML = `Publisher: <span>${bookData.items[i].volumeInfo.publisher}</span>`
    }
};

const makeBookRequest = () => {
    const query = bookSearch.value;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`;
    fetch(url)
    .then(result => result.json())
    .then(bookData => {
    setBookCard(bookData)
})
.catch(error => console.log(error));
};


bookButton.addEventListener("click", ()=>{
    makeBookRequest();
    setBookCard();
})