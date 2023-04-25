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
const cardContainer = document.querySelector(".card-container");
const quote = document.querySelector(".content-nav p");

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
    // If no book is found, return an alert
    if (bookData.items === "") {
      quote.innerText = "Sorry No Books found";
      return;
    }
  
    // Use a template string for the quote text
    quote.innerText = "Your Next Read is a click away";
  
    // Use a constant for the maximum number of books to show
    const maxResults = 9;
  
    // Use Array.from() to create an array from the book items
    const books = Array.from(bookData.items);
  
    // Create a function to generate the HTML for a book card
    const createBookCardHtml = (book) => {
      // Use destructuring to get the volumeInfo properties
      const {
        title = "Not Available",
        authors = "Not Available",
        publishedDate = "Not Available",
        publisher = "Not Available",
        imageLinks: { thumbnail } = {},
      } = book.volumeInfo;
  
      // Use a template string to generate the HTML for the card
      return `
        <div class="card">
          <div class="card-img">
            <img src="${thumbnail || "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"}">
          </div>
          <div class="card-details">
            <h3 class="book-title">${title}</h3>
            <P class="author"> Author: <span>${authors}</span></P>
            <p class="date"> Published Date: <span>${publishedDate}</span></p>
            <p class="publisher">Publisher: <span>${publisher}</span></p>
            <a href="./details.html"><button>See More ›</button></a>
          </div>
        </div>
      `;
    };
  
    // Use Array.slice() to limit the number of books
    const limitedBooks = books.slice(0, maxResults);
  
    // Use Array.map() to generate the HTML for each book card
    const bookCardsHtml = limitedBooks.map(createBookCardHtml);
  
    // Use Array.join() to concatenate the HTML for all the book cards
    const allBookCardsHtml = bookCardsHtml.join("");
  
    // Set the innerHTML of the card container to the HTML for all the book cards
    cardContainer.innerHTML = allBookCardsHtml;
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

    // bookDetailImg.setAttribute("src", bookDetailData.volumeInfo.imageLinks.medium);
    bookDetailAuthor.innerHTML = `by ${bookDetailData.volumeInfo.authors}`;
    bookDetailTitle.innerHTML = bookDetailData.volumeInfo.title;
    bookDetailSummary.innerHTML = bookDetailData.volumeInfo.description;

    sampleButton.setAttribute("href", bookDetailData.volumeInfo.previewLink);
    purchaseButton.setAttribute("href", bookDetailData.saleInfo.buyLink)

    console.log(bookDetailData.volumeInfo.imageLinks);
    let actualImageLink;
    const availableImageObj = bookDetailData.volumeInfo.imageLinks;
    if (availableImageObj.hasOwnProperty("medium")) {
        actualImageLink = bookDetailData.volumeInfo.imageLinks.medium
    } else if (availableImageObj.hasOwnProperty("small")) {
        actualImageLink = bookDetailData.volumeInfo.imageLinks.small
    } else if (availableImageObj.hasOwnProperty("smallThumbnail")) {
        actualImageLink = bookDetailData.volumeINfo.imageLinks.smallThumbnail
    } else {
        actualImageLink = "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg";
    }
    console.log(actualImageLink);
    bookDetailImg.setAttribute("src", actualImageLink);
}


// if the user click the search button it will generate a new book search
bookButton.addEventListener("click", ()=>{
    makeBookRequest();
    // setBookCard();
})


export  {bookSearch, bookTitle, bookAuthor, bookDate, bookPublish, bookImg, bookButton, apiKey, bookDetailData, setBookCard, makeBookRequest, getBookDetails, displayBookDetails}