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

const relatedSearchCard = document.querySelectorAll(".related-search-card");
const relatedSearchContainer = document.querySelector(".related-search-container");
const relatedSearchHeader = document.querySelector(".related-search-header");

// let bookDataG;
let bookDetailId;
let bookDetailData;

// api key that will be used with Template literals
const apiKey = "AIzaSyBkVNpp07djnpcl_ueGOP6467hRX04BPAk";

// This function sets the content of book cards based on book data received from an API
const setBookCard = (bookData) => {
    // Get the number of books to display (minimum of 6 or total number of books)
    const bookCount = Math.min(bookData.items.length, 6);
  
    // Loop through each book and set its content
    for (let i = 0; i < bookCount; i++) {
        // Get the book information and volume information for the current book
        const item = bookData.items[i];
        const volumeInfo = item.volumeInfo;
  
        // Set the book title, display "Information Unavailable" if no title is available
        if (!volumeInfo.title) {
            bookTitle[i].innerText = "Information Unavailable";
        } else {
            bookTitle[i].innerText = volumeInfo.title;
        }
  
        // Set the book image, display default image and "Information Unavailable" for author if no image link is available
        if (volumeInfo.imageLinks && volumeInfo.imageLinks.thumbnail) {
            bookImg[i].setAttribute("src", volumeInfo.imageLinks.thumbnail);
        } else {
            bookImg[i].setAttribute("src", "https://islandpress.org/sites/default/files/default_book_cover_2015.jpg");
            bookAuthor[i].innerHTML = `Author: <span>Information Unavailable</span>`;
        }
  
        // Set the book published date, display "Information Unavailable" if no published date is available
        if (volumeInfo.publishedDate) {
            bookDate[i].innerHTML = `Published Date: <span>${volumeInfo.publishedDate}</span>`;
        } else {
            bookDate[i].innerHTML = `Published Date: <span>Information Unavailable</span>`;
        }
  
        // Set the book publisher, display "Information Unavailable" if no publisher is available
        if (volumeInfo.publisher) {
            bookPublish[i].innerHTML = `Publisher: <span>${volumeInfo.publisher}</span>`;
        } else {
            bookPublish[i].innerHTML = `Publisher: <span>Information Unavailable</span>`;
        }
  
        // Set the book ID and author, display "Information Unavailable" if no author is available
        bookCard[i].setAttribute("id", item.id);
        bookAuthor[i].innerHTML = `Author: <span>${volumeInfo.authors || "Information Unavailable"}</span>`;
        
        // Set the book detail button link
        bookDetailButton[i].setAttribute("href", `./details.html?id=${item.id}`);
    }
  
    // Display an alert if no books were found
    if (!bookData.items || bookData.items.length === 0) {
        alert("Sorry No Books Found");
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

    // bookDetailImg.setAttribute("src", bookDetailData.volumeInfo.imageLinks.medium);
    bookDetailAuthor.innerHTML = `by ${bookDetailData.volumeInfo.authors}`;
    bookDetailTitle.innerHTML = bookDetailData.volumeInfo.title;
    bookDetailSummary.innerHTML = bookDetailData.volumeInfo.description;

    sampleButton.setAttribute("href", bookDetailData.volumeInfo.previewLink);
    purchaseButton.setAttribute("href", bookDetailData.saleInfo.buyLink)

    // console.log(bookDetailData.volumeInfo.imageLinks);
    let actualImageLink;
    const availableImageObj = bookDetailData.volumeInfo.imageLinks;
    if (availableImageObj.hasOwnProperty("medium")) {
        actualImageLink = bookDetailData.volumeInfo.imageLinks.medium
    } else if (availableImageObj.hasOwnProperty("small")) {
        actualImageLink = bookDetailData.volumeInfo.imageLinks.small
    } else if (availableImageObj.hasOwnProperty("smallThumbnail")) {
        actualImageLink = bookDetailData.volumeInfo.imageLinks.smallThumbnail
    } else {
        actualImageLink = "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg";
    }
    console.log(actualImageLink);
    bookDetailImg.setAttribute("src", actualImageLink);


    //related-search-terms
    const auth = bookDetailData.volumeInfo.authors
    const cats = bookDetailData.volumeInfo.categories
    const title = bookDetailData.volumeInfo.title;
    const publisher = bookDetailData.volumeInfo.publisher;
    const relSearchTerms = [];
    
    
        //relatedSearchTerm Array buildout
        if (bookDetailData.volumeInfo.hasOwnProperty("authors")) {
            for (let i=0; i < auth.length; i++) {
                relSearchTerms.push(auth[i].replace("&","/"))
                }
            }
        if (bookDetailData.volumeInfo.hasOwnProperty("categories"))
            for (let i=0; i < cats.length; i++) {
                relSearchTerms.push(cats[i].replace("&","/"))
            }
            if (title != "undefined") {
                relSearchTerms.push(title.replace("&","/"))
            }
            if (publisher != "undefined") {
                relSearchTerms.push(publisher.replace("&","/"))
            }
            
    console.log(relSearchTerms);
    if (relSearchTerms.length > 1) {

    for (let i=0; i < relSearchTerms.length ;i++) {
        if (relSearchTerms[i] != "undefined") {
  relatedSearchCard[i].setAttribute("href",`./search.html?id=${relSearchTerms[i]}`);
  relatedSearchCard[i].innerHTML = relSearchTerms[i];
  relatedSearchCard[i].setAttribute("id",relSearchTerms[i]);
            } else {relatedSearchCard[i].classList.toggle("hidden")}
        } 
    } else {
        relatedSearchContainer.classList.toggle("hidden");
        relatedSearchHeader.classList.toggle("hidden");
    }
}


// // if the user click the search button it will generate a new book search
// const bookButtonEvent = bookButton.addEventListener("click", ()=>{
//     makeBookRequest();
// })





export  {bookSearch, bookTitle, bookAuthor, bookDate, bookPublish, bookImg, bookButton, apiKey, bookDetailData, setBookCard, makeBookRequest, getBookDetails, displayBookDetails}