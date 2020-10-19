import { createMenu } from './createMenu.js';

let account = document.getElementById("button_open-menu");
let pic = document.getElementById("user-svg");
let items = ["Account", "Settings", "Good action", "Nice one", "Log out"];
let menu = createMenu(items);
let arrow = document.getElementById("arrow-svg");

function displayAccountMenu() {
    if (document.getElementById("accountMenu").style.display === "none") {
        menu.style.display = "block";
        arrow.style.transform = "rotate(180deg)";
    } else {
        menu.style.display = "none";
        arrow.style.transform = "rotate(360deg)";
    }
}

export function addAccountMenu() {
    menu.setAttribute("id", "accountMenu");
    account.addEventListener("click", displayAccountMenu);
    pic.addEventListener("click", displayAccountMenu);
    account.appendChild(menu);
}