//hamburger menu

const menuIcon = document.querySelector("#menu-icon");

const openMenu = () => {
    const headerNav = document.querySelector(".header-nav");
    headerNav.classList.toggle("mobile-menu");

}

menuIcon.onclick = openMenu;

const bookSearch = document.querySelector(".bookSearch");
const searchText = document.querySelector(".searchText");

searchText.addEventListener("input", (event)=>{
    bookSearch.href = `search.html?id=${event.target.value}`;
})