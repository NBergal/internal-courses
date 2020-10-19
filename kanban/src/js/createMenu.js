export function createMenu(items) {
    let list = document.createElement("ul");
    list.style.display = "none";

    for (let item of items) {
        let liItem = document.createElement("li");
        liItem.innerHTML = item;
        liItem.setAttribute("class", "itemMenu");
        list.appendChild(liItem);
    }

    return list;
}