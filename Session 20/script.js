// let todos = [
//     { id: 1, todoName: "Đi học", deadLine: "25/3", status: "To do" },
//     { id: 2, todoName: "Chơi", deadLine: "25/3", status: "Pending" },
//     { id: 3, todoName: "Làm bài tập", deadLine: "25/3", status: "Done" },
// ]

// localStorage.setItem("todos", JSON.stringify(todos));
let todos = JSON.parse(localStorage.getItem("todos")) || [];


//Chức năng hiển thị dữ liệu ra giao diện
function renderTodo(todos) {
    let todoListElement = document.getElementById("todoList");
    todoListElement.innerHTML = "";
    todos.forEach(todo => {
        todoListElement.innerHTML += `<tr>
            <td>${todo.id}</td>
            <td>${todo.todoName}</td>
            <td>${todo.deadLine}</td>
            <td>${todo.status}</td>
            <td><button>Sửa</button> <button onclick="deleteTodo(${todo.id})">Xóa</button></td>
        </tr>`
    })
}

//Chức năng thêm công việc mới
function addTodo(e) {
    e.preventDefault();
    const todoInputElement = document.getElementById("todoInput");
    const todoDeadlineElement = document.getElementById("todoDeadline");
    const todoStatusElement = document.getElementById("todoStatus");
    const todoInput = todoInputElement.value;
    const todoDeadline = todoDeadlineElement.value;
    const todoStatus = todoStatusElement.value;
    const newTodo = {
        todoName: todoInput,
        deadLine: todoDeadline,
        status: todoStatus,
        id: todos.length !== 0 ? todos[todos.length - 1].id + 1 : 1
    };
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodo(todos);
}

//Chức năng xóa công việc
function deleteTodo(todoId) {
    todos = todos.filter(todo => todo.id !== todoId);
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodo(todos);
}

//Chức năng tìm kiếm
function findTodoByName() {
    const findTodoInputElement = document.getElementById("findTodo");
    const findTodo = findTodoInputElement.value;
    const findTodos = todos.filter(todo => todo.todoName.includes(findTodo));
    renderTodo(findTodos);
}

//Chức năng lọc theo status
function filterTodoByStatus() {
    const filterTodoElement = document.getElementById("filterTodo");
    const filterStatus = filterTodoElement.value;
    const filterTodos = todos.filter(todo => todo.status === filterStatus);
    renderTodo(filterTodos);
}

//Chức năng sắp xếp theo tên
function sortTodoByName() {
    todos.sort((a, b) => a.todoName.localeCompare(b.todoName));
    renderTodo(todos);
}

renderTodo(todos);