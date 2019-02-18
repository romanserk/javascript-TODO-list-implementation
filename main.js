var todoList = {
    todos: [],

    addTodo: function (todoText) {

        this.todos.push({
            todoText: todoText,
            completed: false,
            position: this.todos.length
        });
    },

    changeTodo: function (position, todoText) {
        this.todos[position] = {
            todoText: todoText,
            completed: false
        };
    },

    deleteTodo: function (position) {
        this.todos.splice(position, 1);
        this.updadePossitions();
    },

    toggleCompleted: function (position) {
        var todo = this.todos[position];
        todo.completed = !todo.completed;
    },

    toggleAll: function () {
        var totalTodos = this.todos.length;
        var numberOfCompleted = 0;

        this.todos.forEach(function (todo) {
            if (todo.completed) {
                numberOfCompleted++;
            }
        });

        this.todos.forEach(function (todo) {
            if (numberOfCompleted === totalTodos) {
                todo.completed = false;
            } else {
                todo.completed = true;
            }
        });
    },

    clearAllTodos: function () {
        this.todos.splice(0, this.todos.length);
    },

    clearAllCompletedTodos: function(){

        for (var i = 0; i < this.todos.length; i++){
            if (this.todos[i].completed){
                this.deleteTodo(i);
                --i;
            }
        }
    },
    updadePossitions: function () {
        this.todos.forEach(function(todo , index){
            todo.position = index;
        });
    },
};

var handlers = {

    addTodo: function () {
        var todoTextInput = document.getElementById("todoTextInput");
        todoList.addTodo(todoTextInput.value);
        todoTextInput.value = '';
        view.displayTodos();
    },

    clearAllTodos: function () {
        todoList.clearAllTodos();
        view.displayTodos();
    },
    clearAllCompletedTodos: function () {
        todoList.clearAllCompletedTodos();
        view.displayTodos();
    },

    displayTodos: function () {
        todoList.displayTodos();
        view.displayTodos();
    },

    changeTodo: function (position, textToChange) {
        todoList.changeTodo(position, textToChange);
        view.displayTodos();
    },

    deleteTodo: function (position) {
        todoList.deleteTodo(position);
        view.displayTodos();
    },

    toggleCompleted: function (position) {
        todoList.toggleCompleted(position);
        view.displayTodos();
    },

    toggleAll: function () {
        todoList.toggleAll();
        view.displayTodos();
    },

};

var view = {

    displayTodos: function () {
        var todosUl = document.getElementById('todosListElement');
        todosUl.innerHTML = '';
        todoList.todos.forEach(function (todo, position) {
            var todoLi = document.createElement('li');

            todoLi.id = position;
            todoLi.class = 'singleTodoItem';
            todoLi.appendChild(this.creatCompletedCheckBox(todo.completed));
            todoLi.appendChild(this.creatTodoHolder(todo.todoText));
            todoLi.appendChild(this.createDeleteButton());
            todosUl.appendChild(todoLi);
        }, this);
    },

    createDeleteButton: function () {
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.className = 'deletButton';
        return deleteButton;
    },

    creatTodoHolder: function (text) {
        var todoHolder = document.createElement('input');
        todoHolder.type = 'text';
        todoHolder.className = 'todoTextHolder';
        todoHolder.value = text;
        return todoHolder;
    },

    creatCompletedCheckBox: function (isCompleted) {
        var checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.className = 'completedCheckBox';
        if (isCompleted) {
            checkBox.checked = true;
        } else {
            checkBox.checked = false;
        }
        return checkBox;
    },

    setupEventListeners: function () {
        var todosUl = document.getElementById('todosListElement');
        var addTodo = document.getElementById('todoTextInput');

        todosUl.addEventListener('click', function (event) {

            var elementClicked = event.target;

            if (elementClicked.className === 'deletButton') {
                handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
            } else if (elementClicked.className === 'completedCheckBox') {

                handlers.toggleCompleted(parseInt(elementClicked.parentNode.id));
            }
        });

        todosUl.addEventListener('keypress', function (event) {
            var elementPressed = event.target;

            if (event.key === 'Enter') {

                handlers.changeTodo(elementPressed.parentNode.id, elementPressed.value);
            }
        });

        addTodo.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {
                handlers.addTodo();
            }
        });
        
    },

};

view.setupEventListeners();