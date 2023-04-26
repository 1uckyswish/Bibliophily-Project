import {menuIcon, openMenu} from "./navigation_module.js";
import {bookSearch, makeBookRequest} from "./searching_module.js";



window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    let currentId = urlParams.get("id");
    bookSearch.value = currentId;
    makeBookRequest();
};

menuIcon.onclick = openMenu;





