//hamburger menu

const menuIcon = document.querySelector("#menu-icon");

const openMenu = () => {
    const headerNav = document.querySelector(".header-nav");
    headerNav.classList.toggle("mobile-menu");

}

menuIcon.onclick = openMenu;