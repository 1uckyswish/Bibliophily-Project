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

//details variable declarations
const bookDetailImg = document.querySelector("#book-detail-img");
const bookDetailAuthor = document.querySelector("#book-detail-author");
const bookDetailTitle = document.querySelector("#book-detail-title");
const bookDetailSummary = document.querySelector("#book-detail-summary");
const sampleButton = document.querySelector(".sample-button");
const purchaseButton = document.querySelector(".purchase-button");
let bookDetailId;
let bookDetailData;

//related sesarch variable declarations
const relatedSearchCard = document.querySelectorAll(".related-search-card");
const relatedSearchContainer = document.querySelector(".related-search-container");
const relatedSearchHeader = document.querySelector(".related-search-header");




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





//function to call the google books API and convert the result to json
const getBookDetails = (bookDetailID) => {
    const url = `https://www.googleapis.com/books/v1/volumes/${bookDetailID}`;
    fetch(url)
    .then(resultD => resultD.json())
    .then(bookDetailData => {
    //once the result is obtained, call the displayBookDetails function with this result as parameter
    displayBookDetails(bookDetailData)
    })
    .catch(error => console.log(error));
}

//second function for actually displaying book detail data retrieved with getBookDetails 
const displayBookDetails = (bookDetailData) => {
let bdAuthor;
let bdTitle;
let bdSummary;

    //insert values into elements
    if (typeof bookDetailData.volumeInfo.authors != "undefined") {
    bdAuthor = `by ${bookDetailData.volumeInfo.authors}`;
    } else {
        bdAuthor = "by Unknown Author"
    }
    bookDetailAuthor.innerHTML = bdAuthor;

    if (typeof bookDetailData.volumeInfo.title != "undefined") {
    bdTitle = bookDetailData.volumeInfo.title;
    } else {
        bdTitle = "Unknown Title";
    }
    bookDetailTitle.innerHTML = bdTitle;
    
    if (typeof bookDetailData.volumeInfo.description != "undefined") {
    bdSummary = bookDetailData.volumeInfo.description;
    } else {
        bdSummary = "No summary available."
    }
    bookDetailSummary.innerHTML = bdSummary;
    

    //create and attach the links as functionality for the buttons
    if (typeof bookDetailData.volumeInfo.previewLink != "undefined") {
    sampleButton.setAttribute("href", bookDetailData.volumeInfo.previewLink);
    } else {
        //turn off sample button
        sampleButton.classList.toggle("hidden");
    }
    if (typeof bookDetailData.saleInfo.buyLink != "undefined") {
    purchaseButton.setAttribute("href", bookDetailData.saleInfo.buyLink);
    } else {
        //turn off purchase button
        purchaseButton.classList.toggle("hidden");
    }

    //discover an available image link, and use default if none exists
    let actualImageLink;
    if (typeof bookDetailData.volumeInfo.imageLinks !== "undefined") {
        //pull all available images array
        let availableImageObj = bookDetailData.volumeInfo.imageLinks;
        //loop through possible images to find one that exists, largest to smallest
        if (availableImageObj.hasOwnProperty("medium")) {
            actualImageLink = bookDetailData.volumeInfo.imageLinks.medium
        } else if (availableImageObj.hasOwnProperty("small")) {
            actualImageLink = bookDetailData.volumeInfo.imageLinks.small
        } else if (availableImageObj.hasOwnProperty("smallThumbnail")) {
            actualImageLink = bookDetailData.volumeInfo.imageLinks.smallThumbnail
        } else {
            //default image assignment for if no image larger than smallThumbnail is available
            actualImageLink = "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg";
        } } else {
            //default image assignment for if imageLinks doesn't exist on the book at all
            actualImageLink = "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg";
        }
    
    //set image source from result of previous code
    
    bookDetailImg.setAttribute("src", actualImageLink);
    

    // additional related-search-terms variable declarations
    const auth = bookDetailData.volumeInfo.authors
    const cats = bookDetailData.volumeInfo.categories
    const title = bookDetailData.volumeInfo.title;
    const publisher = bookDetailData.volumeInfo.publisher;
    const subtitle = bookDetailData.volumeInfo.subtitle;
    const date = bookDetailData.volumeInfo.publishedDate;
    const language = bookDetailData.volumeInfo.language;
    const relPrintType = bookDetailData.volumeInfo.printType;
    
    //create empty array to store search terms
    const relSearchTerms = [];
    
    
        //fill that array with all available search terms
        if (bookDetailData.volumeInfo.hasOwnProperty("authors")) {
            for (let i=0; i < auth.length; i++) {
                relSearchTerms.push(auth[i].replace("&","/"))
                }
            } else {relSearchTerms.push("Unknown Author")}
        if (bookDetailData.volumeInfo.hasOwnProperty("categories"))
            for (let i=0; i < cats.length; i++) {
                relSearchTerms.push(cats[i].replace("&","/"))
            }
            if (title != "undefined") {
                relSearchTerms.push(title.replace("&","/"))
            }
            if (publisher != "undefined" && publisher !== "") {
                relSearchTerms.push(publisher.replace("&","/"))
            }
            if (typeof subtitle != "undefined") {
                relSearchTerms.push(subtitle.replace("&","/"))
            }
            if (date != "undefined") {
                relSearchTerms.push(`Published: ${date.substring(0,4)}`.replace("&","/"))
            }
            if (language != "undefined") {
                relSearchTerms.push(`Language: ${language}`.replace("&","/"))
            }
            if (relPrintType != "undefined") {
                relSearchTerms.push(relPrintType.replace("&","/"))
            }
    //check if at least 1 search term exists for the  book       
    
    if (relSearchTerms.length > 1) {
           
    //loop through the search terms and assign to related search cards
    for (let i=0; i < relSearchTerms.length ;i++) {
        if (relSearchTerms[i] != "undefined") {
        relatedSearchCard[i].setAttribute("href",`./search.html?id=${relSearchTerms[i]}`);
        relatedSearchCard[i].innerHTML = relSearchTerms[i];
        relatedSearchCard[i].setAttribute("id",relSearchTerms[i]);
            } else {alert("Search terms undefined")}
        } 
    } else {
        // toggle classlist to display None if no search terms exist - will hide whole section
        document.querySelector(".related-search-container").classList.toggle("hidden");
        document.querySelector(".related-search-header").classList.toggle("hidden");
    }
}


export  {bookSearch, bookButton, bookDetailData, makeBookRequest, getBookDetails}