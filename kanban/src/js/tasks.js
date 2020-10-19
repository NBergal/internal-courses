import Issue from './issue.js';
import { addListInView } from './addListInView.js';
import { addTaskInView } from './addTaskInView.js';
import { createMenu } from './createMenu.js';

let dataMock = [{
        title: 'backlog',
        issues: [{
            id: 'task1',
            name: 'Sprint bugfix (Drag & Drop this)'
        }]
    },
    {
        title: 'ready',
        issues: []
    },
    {
        title: 'progress',
        issues: []
    },
    {
        title: 'finished',
        issues: []
    }
];

function openList() {
    let items = ["delete"];
    let menu = createMenu(items);
    menu.style.display = "block";
    let bodyMenu = this.querySelector('ul');
    bodyMenu.style.display = "block";
    bodyMenu.style.position = "absolute";
    bodyMenu.style.top = "10px";
    bodyMenu.style.right = "-24px";
    let item = bodyMenu.querySelector("li");
    item.addEventListener("click", () => {this.parentElement.remove();});
}

function openTask() {
    let sdf = this.parentElement.parentElement.cloneNode(true);
    if (sdf) {
        modalBody3.innerHTML = '';
    }
    sdf.querySelector('span').innerText = this.innerText;
    sdf.querySelector('.list__container').innerHTML = `
        <label for="inputTask">
            <textarea name="inputTask" rows="10" id="inputTask" placeholder="Describe your task..."></textarea>
        </label>
    `;
    document.getElementById('modalBody3').appendChild(sdf);
}

let buttonsAdd = document.getElementsByClassName("list__footer");

function addNewIssue(name) {
    dataMock[0].issues.push(new Issue(dataMock[0].issues.length + 1, name));
}

function addIssue(title, name) {
    let index = getIndex(title);
    let issue = getIssue(index - 1, name);
    removeIssue(index - 1, name);
    dataMock[index].issues.push(issue);
}

function getIndex(title) {
    return dataMock.findIndex((elem, index) => {
        return elem.title == title;
    });
}

function getIssue(index, name) {
    let findIndex = dataMock[index].issues.findIndex((elem) => {
        return elem.name === name;
    });
    return dataMock[index].issues[findIndex];
}

function removeIssue(index, name) {
    let removeIndex = dataMock[index].issues.findIndex((elem) => {
        return elem.name === name;
    });
    dataMock[index].issues.splice(removeIndex, 1);
    document.getElementById(dataMock[index].title).getElementsByClassName("list__container")[0].getElementsByClassName("task")[removeIndex].remove();
}

function actionAdd() {
    if (document.getElementById("newTaskInput"))
        return;
    setButtonDisabled(true);
    let title = this.parentElement.id;
    let index = getIndex(title);

    let taskBlock = document.createElement("div");
    taskBlock.setAttribute("class", "task");

    let inputText = document.createElement("input");
    inputText.setAttribute("type", "text");
    inputText.setAttribute("id", "newTaskInput");

    taskBlock.appendChild(inputText);

    if (index > 0) {
        let datalist = getDataList(index - 1);
        datalist.setAttribute("id", "list");
        inputText.appendChild(datalist);
        inputText.setAttribute("list", "list");
    }

    inputText.addEventListener("blur", handlerInput);
    inputText.addEventListener("keypress", function (event) {
        if (event.keyCode == 13) {
            inputText.blur();
        }
    });

    let contents = document.getElementsByClassName("list__container");
    contents[index].append(taskBlock);
}

function getDataList(index) {
    let datalist = document.createElement("datalist");

    for (let issue of dataMock[index].issues) {
        let option = document.createElement("option");
        option.setAttribute("value", issue.name);
        datalist.appendChild(option);
    }

    return datalist;
}

function handlerInput() {
    let title = this.parentElement.parentElement.parentElement.id;

    if (this.value === "") {
        this.parentElement.remove();
        setButtonDisabled(false);
        return;
    } else if (getIndex(title) > 0) {
        if (getIssue(getIndex(title) - 1, this.value) == undefined) {
            this.parentElement.remove();
            setButtonDisabled(false);
            return;
        }
    }

    if (title === dataMock[0].title) {
        addNewIssue(this.value);
    } else {
        addIssue(title, this.value);
    }

    let p = document.createElement("p");
    p.innerHTML = this.value;
    setButtonDisabled(false);
    this.replaceWith(p);
    updateLocalStorage();
}

function setButtonDisabled(state) {
    for (let button of buttonsAdd) {
        button.disabled = state;
    }
}

function updateLocalStorage(dm = dataMock) {
    localStorage.setItem('datamock', JSON.stringify(dm));
}

function recoveryData() {
    if (localStorage.datamock !== undefined) {
        dataMock = JSON.parse(localStorage.datamock);
    }
    loadView();
}

const dragAndDrop = () => {
    const task = document.querySelector('.task');
    const cards = document.querySelectorAll('.list__container');
    const dragStart = function () {
        setTimeout(() => {
            this.classList.add('hide');
        }, 1);
    };
    const dragEnd = function () {
        this.classList.remove('hide');
    };
    const dragOver = function (evt) {
        evt.preventDefault();
    };
    const dragEnter = function () {
        this.parentElement.classList.add('hovered');
    };
    const dragLeave = function () {
        this.parentElement.classList.remove('hovered');
    };
    const dragDrop = function () {
        this.append(task);
        for (let i in JSON.parse(localStorage.datamock)) {
            if (JSON.parse(localStorage.datamock)[i].title == this.parentElement.id && (i > 0)) {
                let a = JSON.parse(localStorage.datamock);
                a[i].issues.push({
                    id: `task${a[i].issues.length + 1}`,
                    name: task.innerText
                });
                for (let j in a[i].issues) {
                    if (a[i].issues[j].name == task.innerText) {
                        a[i - 1].issues.splice(a[i - 1].issues[j], 1);
                    }
                }
                localStorage.setItem('datamock', JSON.stringify(a));
                updateLocalStorage(a);
            }
        }
    };
    cards.forEach((card) => {
        card.addEventListener('dragover', dragOver);
        card.addEventListener('dragenter', dragEnter);
        card.addEventListener('dragleave', dragLeave);
        card.addEventListener('drop', dragDrop);
    });
    task.addEventListener('dragstart', dragStart);
    task.addEventListener('dragend', dragEnd);
};

function loadView() {
    let blockIndex = dataMock.length;

    while (blockIndex !== 0) {
        addListInView(dataMock[blockIndex - 1].title, actionAdd, openList);
        blockIndex--;
    }

    for (let key in dataMock) {
        if (dataMock[key].issues.length > 0) {
            dataMock[key].issues.forEach((element) => {
                addTaskInView(dataMock[key].title, element.name, openTask);
            });
        }
    }
}

function createNewList() {
    let buttonAddList = document.getElementById("create");
    buttonAddList.onclick = actionAddList;
}

function actionAddList() {
    let inputTitle = document.querySelector("#titleList");
    let title = inputTitle.value;
    if (title !== "") {
        let title = inputTitle.value;
        dataMock.unshift(getNewList(title));
        window.location.href = '#';
        inputTitle.value = "";
        updateLocalStorage();
        addListInView(title, actionAdd, openList);
    }
}

function getNewList(title) {
    return {
        title: title,
        issues: []
    };
}

function createPopup() {
    let items = ["delete"];
    let others = document.getElementsByClassName("other");
    console.log(others);
    for (let i of others) {
        let menu = createMenu(items);
        menu.style.listStyle = "none";
        i.after(menu);
    }
}

export function actionsAboutTasks() {
    recoveryData();
    for (let button of buttonsAdd) {
        button.onclick = actionAdd;
    }
    createNewList();
    createPopup();
    dragAndDrop();
}