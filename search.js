import {menuIcon, openMenu} from "./navigation_module.js";
import {bookSearch, makeBookRequest} from "./searching_module.js";



window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    let currentId = urlParams.get("id");
    bookSearch.value = currentId;
    makeBookRequest();
};

// if the user click the search button it will generate a new book search
bookButton.addEventListener("click", ()=>{
    makeBookRequest();
    // setBookCard();
})

menuIcon.onclick = openMenu;



