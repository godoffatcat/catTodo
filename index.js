const select =  function(sel) {
    return document.querySelector(sel)
}

const addTodo = function() {
    const todo = select('#inputArea')
    const todoName = todo.value
    const lastTodo = select('.todoListAll')
    const t = addNewTodo(todoName)
    lastTodo.insertAdjacentHTML('beforeend', t)
    todo.value=''
}

const addButton = select('#addTodo')
addButton.addEventListener('click', addTodo)

const addNewTodo = function(todo) {
    const t = `
    <div class="todocell">
    <span>${todo}</span>
    <button class="finishButton">FINISH</button>
    <button class="deleteButton">DELETE</button>
    </div>
    `
    return t
}

const todoList = select('.todoListAll')
todoList.addEventListener('click', function(event) {
    const target = event.target
    console.log(target)
    if(target.classList.contains('deleteButton')) {
        const thisTodo = target.parentElement
        thisTodo.remove()
    } else if(target.classList.contains('finishButton')) {
        const thisTodo = target.parentElement
        thisTodo.classList.add('_finish')
    }
})


// const finishButton = select('.finishButton')
// finishButton.addEventListener('click', function() {
//     const thisTodo = deleteButton.parentElement
//     thisTodo.classList.add('_finish')
// })