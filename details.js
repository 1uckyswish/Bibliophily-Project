import { menuIcon, openMenu } from "./navigation_module.js"
import { getBookDetails, getRelatedBooks, bookSearchTerm } from "./searching_module.js"
let bookDetailID;


menuIcon.onclick = openMenu;



//add details specific functionality like onload
window.onload = function () {
        const urlParams = new URLSearchParams(window.location.search);
    let currentId = urlParams.get("id");
    bookDetailID = currentId;
    getBookDetails(bookDetailID);
    getRelatedBooks(bookSearchTerm, bookDetailID);



};

export {bookDetailID};


