export function addListInView(title, actionAdd, openList) {
    let main = document.getElementById("boards__inner");

    let taskBlock = document.createElement("div");
    taskBlock.setAttribute("class", "tabTask list");
    taskBlock.setAttribute("id", title);

    let header = document.createElement("button");
    header.setAttribute("class", "list__header");
    header.setAttribute("id", title + "Header");

    header.addEventListener("click", openList);

    let other = document.createElement("object");
    other.setAttribute("type", "image/svg+xml");
    other.setAttribute("data", "src/images/container/ellipsis.svg");
    other.setAttribute("class", "other");

    let h = document.createElement("span");
    h.innerHTML = title;

    let content = document.createElement("div");
    content.setAttribute("class", "list__container");

    let button = document.createElement("button");
    button.setAttribute("class", "list__footer");
    button.setAttribute("id", title + "Add");
    button.addEventListener("click", actionAdd);

    let span = document.createElement("span");
    span.innerHTML = "Add card";

    let plus = document.createElement("object");
    plus.setAttribute("type", "image/svg+xml");
    plus.setAttribute("class", "plusCard");
    plus.setAttribute("data", "src/images/container/plus.svg");

    button.append(plus, span);
    header.append(h, other);

    taskBlock.append(header, content, button);
    main.prepend(taskBlock);
}