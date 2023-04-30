import { menuIcon, openMenu } from "./navigation_module.js"
import { getBookDetails, getRelatedBooks, bookSearch } from "./searching_module.js"
import {fullResult} from "./search.js"

let bookDetailID;


menuIcon.onclick = openMenu;



//add details specific functionality like onload
window.onload = function () {
        const urlParams = new URLSearchParams(window.location.search);
    let currentId = urlParams.get("id");
    bookDetailID = currentId;
    console.log(fullResult);
    // getBookDetails(bookDetailID);
    // getRelatedBooks(fullResult, bookDetailID);



};

export {bookDetailID};


