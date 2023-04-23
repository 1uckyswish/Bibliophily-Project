import { menuIcon, openMenu } from "./navigation_module.js";
import { bookTitle, bookAuthor, bookDate, bookPublish, bookImg, bookButton, apiKey, setBookCard, makeBookRequest} from "./searching_module.js";

menuIcon.onclick = openMenu;

const bookSearch = document.querySelector(".bookSearch");
const searchText = document.querySelector(".searchText");

searchText.addEventListener("input", (event)=>{
    bookSearch.href = `search.html?id=${event.target.value}`;
})
