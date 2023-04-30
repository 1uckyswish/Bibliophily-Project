// get empty elements from html
// using a query to select all elements so i can target each one easier
const bookSearch = document.querySelector(".content-nav input");

const bookSearchTerm = bookSearch.value;

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

const relatedBookCards = document.querySelectorAll(".related-book-card");
const relatedBookImgs = document.querySelectorAll(".related-book-img");

let bookData;
let bookDetailData;
let fiveRelatedBooks;





// api key that will be used with Template literals
const apiKey = "AIzaSyBkVNpp07djnpcl_ueGOP6467hRX04BPAk";

// // This function sets the content of book cards based on book data received from an API
// const setBookCardOld = (bookData) => {
//     // Get the number of books to display (minimum of 6 or total number of books)
//     const bookCount = Math.min(bookData.items.length, 6);
  
//     // Loop through each book and set its content
//     for (let i = 0; i < bookCount; i++) {
//         // Get the book information and volume information for the current book
//         const item = bookData.items[i];
//         const volumeInfo = item.volumeInfo;
  
//         // Set the book title, display "Information Unavailable" if no title is available
//         if (!volumeInfo.title) {
//             bookTitle[i].innerText = "Information Unavailable";
//         } else {
//             bookTitle[i].innerText = volumeInfo.title;
//         }
  
//         // Set the book image, display default image and "Information Unavailable" for author if no image link is available
//         if (volumeInfo.imageLinks && volumeInfo.imageLinks.thumbnail) {
//             bookImg[i].setAttribute("src", volumeInfo.imageLinks.thumbnail);
//         } else {
//             bookImg[i].setAttribute("src", "https://islandpress.org/sites/default/files/default_book_cover_2015.jpg");
//             bookAuthor[i].innerHTML = `Author: <span>Information Unavailable</span>`;
//         }
  
//         // Set the book published date, display "Information Unavailable" if no published date is available
//         if (volumeInfo.publishedDate) {
//             bookDate[i].innerHTML = `Published Date: <span>${volumeInfo.publishedDate}</span>`;
//         } else {
//             bookDate[i].innerHTML = `Published Date: <span>Information Unavailable</span>`;
//         }
  
//         // Set the book publisher, display "Information Unavailable" if no publisher is available
//         if (volumeInfo.publisher) {
//             bookPublish[i].innerHTML = `Publisher: <span>${volumeInfo.publisher}</span>`;
//         } else {
//             bookPublish[i].innerHTML = `Publisher: <span>Information Unavailable</span>`;
//         }
  
//         // Set the book ID and author, display "Information Unavailable" if no author is available
//         bookCard[i].setAttribute("id", item.id);
//         bookAuthor[i].innerHTML = `Author: <span>${volumeInfo.authors || "Information Unavailable"}</span>`;
        
//         // Set the book detail button link
//         bookDetailButton[i].setAttribute("href", `./details.html?id=${item.id}`);
//     }
  
//     // Display an alert if no books were found
//     if (!bookData.items || bookData.items.length === 0) {
//         alert("Sorry No Books Found");
//     }
// };

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
    if (!bookData.items|| bookData.items.length === 0) {
        alert("Sorry No Books Found");
    }
};



// const makeBookRequestOld = () => {
//     //Depending of the users input value the query for api link will be updated every time
//     const query = bookSearch.value;
//     const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`;
//     //Check if search box is empty
//     if (query !== ""){
//     fetch(url)
//     .then(result => result.json())
//     .then(bookData => {

//        // apply the JSON value to access the data and apply to the function
//     setBookCard(bookData)

//     // console.log(bookData);
//     topSix = bookData.items.filter((book,index) => index < 6);
//     // console.log(topSix);
//     // let bookDetailID = "qPrLY-LYPlwC";
//     // fiveRelatedBooks = topSix.filter((book,id) => book.id != bookDetailID);
//     // console.log(fiveRelatedBooks);
 
//     })

// // if errors it'll return the issues
// .catch(error => console.log(error));
// }
// //behavior if search box is empty, TBD
// else {
//     alert("Blank search box")
// }

// };

const makeBookRequest = async (bookSearch) => {
    //Depending of the users input value the query for api link will be updated every time
    const query = bookSearch.value;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`;
    //Check if search box is empty
    if (query !== ""){
         try {
            const result = await fetch(url);
            const json = await result.json();
            // const bookData = json.items.filter((book,index) => index < 6);
            // setBookCard(json);
            console.log(json);
            return json
            
        }
        catch (error) {
            console.log(error);
        }
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
        displayBookDetails(bookDetailData)
        
    })
    .catch(error => console.log(error));
}

// 
const displayBookDetails = (bookDetailData) => {
    
    bookDetailAuthor.innerHTML = `by ${bookDetailData.volumeInfo.authors}`;
    bookDetailTitle.innerHTML = bookDetailData.volumeInfo.title;
    bookDetailSummary.innerHTML = bookDetailData.volumeInfo.description;

    sampleButton.setAttribute("href", bookDetailData.volumeInfo.previewLink);
    purchaseButton.setAttribute("href", bookDetailData.saleInfo.buyLink)

    
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
    
    bookDetailImg.setAttribute("src", actualImageLink);
}

//filter to only related books
const getRelatedBooks = {

//     fiveRelatedBooks = fullResult.filter((book,id) => book.id != bookDetailID)
//    displayRelatedBooks(fiveRelatedBooks);

}

//displayed related books 
const displayRelatedBooks = () => {

    for (let i = 0; i < fiveRelatedBooks.length; i++) {
        relatedBookCards[i].setAttribute("id", fiveRelatedBooks[i].id);
        relatedBookCards[i].setAttribute("href", `./details.html?=${fiveRelatedBooks[i].id}`);
        relatedBookImgs[i].setAttribute("src", fiveRelatedBooks[i].volumeInfo.imageLinks.smallThumbnail);
    }

}




export  {bookSearch, bookButton, bookDetailData, bookData, setBookCard, makeBookRequest, getBookDetails, displayBookDetails, getRelatedBooks};
