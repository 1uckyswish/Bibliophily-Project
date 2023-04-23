//hamburger menu

const menuIcon = document.querySelector("#menu-icon");

const openMenu = () => {
    const headerNav = document.querySelector(".header-nav");
    headerNav.classList.toggle("mobile-menu");

}



// add events for non-search navigation like About us, contact, linkedin, and github

export {menuIcon, openMenu}