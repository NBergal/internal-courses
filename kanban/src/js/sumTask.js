function sumTask() {
    let cards = document.getElementsByClassName('list');
    let firstCard = cards[0].getElementsByClassName('task').length;
    document.getElementsByClassName('tasks-status_active')[0].innerText = `Active tasks: ${firstCard}`;
    let lastCard = cards[cards.length - 1].getElementsByClassName('task ').length;
    document.getElementsByClassName('tasks-status_finished')[0].innerText = `Finished tasks: ${lastCard}`;
}
export let timerId = setInterval(sumTask, 1000);