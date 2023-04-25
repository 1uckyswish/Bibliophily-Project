import { menuIcon, openMenu } from "./navigation_module.js"
import {displayBookDetails,getBookDetails, bookDetailData} from "./searching_module.js"


menuIcon.onclick = openMenu;


//add details specific functionality like onload
window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    let currentId = urlParams.get("id");
    let bookDetailID = currentId;
    getBookDetails(bookDetailID);
    displayBookDetails();
};

