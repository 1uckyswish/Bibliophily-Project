// get empty elements from html
// using a query to select all elements so i can target each one easier
const bookSearch = document.querySelector(".content-nav input");
const bookTitle = document.querySelectorAll(".book-title");
const bookAuthor = document.querySelectorAll(".author");
const bookDate = document.querySelectorAll(".date");
const bookPublish = document.querySelectorAll(".publisher");
const bookImg = document.querySelectorAll(".card-img img"); 
const bookButton = document.querySelector(".content-nav img");
const bookCard = document.querySelectorAll(".card");
const bookDetailButton = document.querySelectorAll(".bookDetailBtn");

const bookDetailImg = document.querySelector("#book-detail-img");
const bookDetailAuthor = document.querySelector("#book-detail-author");
const bookDetailTitle = document.querySelector("#book-detail-title");
const bookDetailSummary = document.querySelector("#book-detail-summary");
const sampleButton = document.querySelector("#sample-button");
const purchaseButton = document.querySelector("#purchase-button");

// let bookDataG;
let bookDetailId;
let bookDetailData;

// api key that will be used with Template literals
const apiKey = "AIzaSyBkVNpp07djnpcl_ueGOP6467hRX04BPAk";

//a function to set all of the empty elements and fill in the book data.
const setBookCard = (bookData) => {
    // a loop to append the data for each one. Doing 6 due to there only being 6 cards within html
    //if no book is found return an alert
    if(!bookData.items){
        alert("Sorry No Books Found");
    }else{
        for(let i = 0; i < 6; i++){
            //if information for the following not available return a placement holder
            if(!bookData.items[i].volumeInfo.title){
                bookTitle[i].innerText = "Information Unavailable"
            }else if(!bookData.items[i].volumeInfo.imageLinks.thumbnail){
                bookImg[i].setAttribute("src", "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg")
                bookAuthor[i].innerHTML = `Author: <span>Information Unavailable</span>`;
            }else if(!bookData.items[i].volumeInfo.publishedDate){
                bookDate[i].innerHTML = `Published Date: <span>Information Unavailable</span>`;
            }else if(!bookData.items[i].volumeInfo.publisher){
                bookPublish[i].innerHTML = `Publisher: <span>Information Unavailable</span>`
            }else{
                // if information is found then display it
                bookCard[i].setAttribute("id", bookData.items[i].id);
                bookTitle[i].innerText = bookData.items[i].volumeInfo.title;
                bookImg[i].setAttribute("src", bookData.items[i].volumeInfo.imageLinks.thumbnail);
                bookAuthor[i].innerHTML = `Author: <span>${bookData.items[i].volumeInfo.authors}</span>`;
                bookDate[i].innerHTML = `Published Date: <span>${bookData.items[i].volumeInfo.publishedDate}</span>`;
                bookPublish[i].innerHTML = `Publisher: <span>${bookData.items[i].volumeInfo.publisher}</span>`;
                bookDetailButton[i].setAttribute("href", `./details.html?id=${bookData.items[i].id}`);
            }
        }
    }
};

const makeBookRequest = () => {
    //Depending of the users input value the query for api link will be updated every time
    const query = bookSearch.value;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`;
    //Check if search box is empty
    if (query !== ""){
    fetch(url)
    .then(result => result.json())
    .then(bookData => {
        console.log(bookData);
       // apply the JSON value to access the data and apply to the function
    setBookCard(bookData);
    // bookDataG = bookData;
    })
// if errors it'll return the issues
.catch(error => console.log(error));
}
//behavior if search box is empty, TBD
else {
    alert("Blank search box")
}
};



// 
const getBookDetails = (bookDetailID) => {
    const url = `https://www.googleapis.com/books/v1/volumes/${bookDetailID}`;
    fetch(url)
    .then(resultD => resultD.json())
    .then(bookDetailData => {
        console.log(bookDetailData)
    displayBookDetails(bookDetailData)
    })
    .catch(error => console.log(error));
}

// 
const displayBookDetails = (bookDetailData) => {
    bookDetailImg.setAttribute("src", bookDetailData.volumeInfo.imageLinks.medium);
    bookDetailAuthor.innerHTML = bookDetailData.volumeInfo.authors;
    bookDetailTitle.innerHTML = bookDetailData.volumeInfo.title;
    bookDetailSummary.innerHTML = bookDetailData.volumeInfo.description;

    sampleButton.setAttribute("href", bookDetailData.volumeInfo.previewLink);
    purchaseButton.setAttribute("href", bookDetailData.saleInfo.buyLink)
}

// // if the user click the search button it will generate a new book search
// bookButton.addEventListener("click", ()=>{
//     makeBookRequest();
//     // setBookCard();
// })


export  {bookSearch, bookTitle, bookAuthor, bookDate, bookPublish, bookImg, bookButton, apiKey, bookDetailData, setBookCard, makeBookRequest, getBookDetails, displayBookDetails}