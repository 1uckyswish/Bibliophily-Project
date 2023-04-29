import {menuIcon, openMenu} from "./navigation_module.js";
import { bookSearch, makeBookRequest, bookButton } from "./searching_module.js";


// if the user click the search button it will generate a new book search
const bookButtonEvent = bookButton.addEventListener("click", ()=>{
    makeBookRequest(bookSearch);
})



window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    let currentId = urlParams.get("id");
    bookSearch.value = currentId;
    makeBookRequest(bookSearch);
    
};



menuIcon.onclick = openMenu;









