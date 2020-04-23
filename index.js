const select =  function(sel) {
    return document.querySelector(sel)
}

// 新TODO加载到页面
const insertTodo = function(todoName) {
    const lastTodo = select('.todoListAll')
    const t = addNewTodo(todoName)
    lastTodo.insertAdjacentHTML('beforeend', t)
}

// 获取输入框内容并添加
const addTodo = function() {
    const todo = select('#inputArea')
    const todoName = todo.value
    insertTodo(todoName)
    saveTodos()
    todo.value=''
}

// 回车键和添加键的事件反馈
const addButton = select('#addTodo')
addButton.addEventListener('click', addTodo)
document.addEventListener('keydown', (ev) => {
    if(ev.key === 'Enter') {
        addTodo()
    }
})

//todo添加新的div
const addNewTodo = function(todo) {
    const t = `
    <div class="todocell">
    <span class='todoContent'>${todo}</span>
    <button class="finishButton">FINISH</button>
    <button class="deleteButton">DELETE</button>
    </div>
    `
    return t
}

// 完成区的存贮区，需完善
const finishTodos = []

// 完成todo和删除的反馈
const todoList = select('.todoListAll')
todoList.addEventListener('click', function(event) {
    const target = event.target
    console.log(target)
    if(target.classList.contains('deleteButton')) {
        const thisTodo = target.parentElement
        thisTodo.remove()
        saveTodos()
    } else if(target.classList.contains('finishButton')) {
        // 获取父元素，即todo内容和按钮
        const thisTodo = target.parentElement
        // 再选中父元素中的span，添加一个class  产生划线效果
        // 是不是可以用选兄弟元素来选到她呀？
        const thisTodoTitle = thisTodo.querySelector('.todoContent')
        thisTodoTitle.classList.add('_finish')
        finishTodos.push(thisTodoTitle)
        console.log('finish===============',finishTodos)
        saveTodos()
    }
})


// localStorage相关
const save = function(ary) {
    var s = JSON.stringify(ary)
    localStorage.todos = s
}

const load = function() {
    var s = localStorage.todos
    return JSON.parse(s)
}


// todo保存
const saveTodos = function() {
    var todos = []
    var contents = document.querySelectorAll('.todoContent')
    for (let i = 0; i < contents.length; i++) {
        const c = contents[i];
        // $符号用innerHTML?
        var todo = c.innerHTML
        todos.push(todo)
    }
    save(todos)
}

// 拉取todo
const loadTodos = function() {
    const todosAgain = load()
    for (let i = 0; i < todosAgain.length; i++) {
        const againTodo = todosAgain[i];
        insertTodo(againTodo)
    }
}
loadTodos()
