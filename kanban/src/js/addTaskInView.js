export function addTaskInView(title, task, openTask, dragAndDrop) {
    let taskBlock = document.createElement("div");
    taskBlock.setAttribute("class", `task ${task}Task`);
    taskBlock.setAttribute("draggable", "true");

    taskBlock.setAttribute("onclick", "window.location.href='#modalWindow2'");
    taskBlock.addEventListener("click", openTask);

    let p = document.createElement("p").innerHTML = task;
    taskBlock.append(p);

    document.getElementById(title).children[1].append(taskBlock);
}