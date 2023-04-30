import {menuIcon, openMenu} from "./navigation_module.js";
import { bookSearch, makeBookRequest, bookButton, setBookCard } from "./searching_module.js";

let fullResult = "1234";

// if the user click the search button it will generate a new book search
const bookButtonEvent = bookButton.addEventListener("click", ()=>{
    makeBookRequest(bookSearch);
})



window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    let currentId = urlParams.get("id");
    bookSearch.value = currentId;
    fullResult = makeBookRequest(bookSearch);
    console.log(fullResult);
    // setBookCard(fullResult);
    
};



menuIcon.onclick = openMenu;


export {fullResult};






