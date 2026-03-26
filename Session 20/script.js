// let todos = [
//     { id: 1, todoName: "Đi học", deadLine: "2026-03-25", status: "To do" },
//     { id: 2, todoName: "Chơi", deadLine: "2026-03-25", status: "Pending" },
//     { id: 3, todoName: "Làm bài tập", deadLine: "2026-03-25", status: "Done" },
// ]

// localStorage.setItem("todos", JSON.stringify(todos));
let todos = JSON.parse(localStorage.getItem("todos")) || [];
let editId = 0;

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
            <td><button onclick="startEditTodo(${todo.id})">Sửa</button> <button onclick="deleteTodo(${todo.id})">Xóa</button></td>
        </tr>`
    })
}

function removeTodoInputErr() {
    const todoErrMsg = document.getElementsByClassName("err-msg")[0];
    const todoInputElement = document.getElementById("todoInput");
    todoErrMsg.style.display = "none";
    todoInputElement.classList.remove("err-input");
}

//Chức năng thêm công việc mới
function addOrEditTodo(e) {
    e.preventDefault();
    const todoInputElement = document.getElementById("todoInput");
    const todoDeadlineElement = document.getElementById("todoDeadline");
    const todoStatusElement = document.getElementById("todoStatus");
    const todoErrMsg = document.getElementsByClassName("err-msg")[0];
    const todoInput = todoInputElement.value;
    const todoDeadline = todoDeadlineElement.value;
    const todoStatus = todoStatusElement.value;
    if (todoInput.trim() === "") {
        todoInputElement.classList.add("err-input");
        todoErrMsg.style.display = "block";
        todoErrMsg.innerText = "Công việc không được trống";
        return;
    }
    if (todoInput.length < 5 || todoInput.length > 15) {
        todoInputElement.classList.add("err-input");
        todoErrMsg.style.display = "block";
        todoErrMsg.innerText = "Độ dài công việc không hợp lệ";
        return;
    }
    if (editId === 0) {
        const newTodo = {
            todoName: todoInput,
            deadLine: todoDeadline,
            status: todoStatus,
            id: todos.length !== 0 ? todos[todos.length - 1].id + 1 : 1
        };
        todos.push(newTodo);
    } else {
        let editIndex = todos.findIndex(todo => todo.id === editId);
        todos[editIndex].todoName = todoInput;
        todos[editIndex].deadLine = todoDeadline;
        todos[editIndex].status = todoStatus;
        editId = 0;
        const formBtn = document.getElementById("formBtn");
        formBtn.innerText = "Thêm công việc";
    }
    todoInputElement.value = "";
    todoDeadlineElement.value = "";
    todoStatusElement.value = "";
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

//Chức năng sửa công việc
//Bắt đầu sửa
function startEditTodo(startEditId) {
    const editTodo = todos.find(todo => todo.id === startEditId);
    const todoInputElement = document.getElementById("todoInput");
    const todoDeadlineElement = document.getElementById("todoDeadline");
    const todoStatusElement = document.getElementById("todoStatus");
    const formBtn = document.getElementById("formBtn");
    todoInputElement.value = editTodo.todoName;
    todoDeadlineElement.value = editTodo.deadLine;
    todoStatusElement.value = editTodo.status;
    formBtn.innerText = "Sửa công việc";
    editId = startEditId;
}

renderTodo(todos);