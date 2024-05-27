document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const list = document.getElementById('todo-list');
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    const saveTodos = () => {
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    const renderTodos = () => {
        list.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.textContent = todo.text;

            if (todo.completed) {
                li.classList.add('completed');
            }

            li.addEventListener('click', () => {
                todos[index].completed = !todos[index].completed;
                saveTodos();
                renderTodos();
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'X';
            deleteButton.style.marginLeft = '10px';
            deleteButton.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent the click event from bubbling up to the li click event
                todos.splice(index, 1);
                saveTodos();
                renderTodos();
            });

            li.appendChild(deleteButton);
            list.appendChild(li);
        });
    };

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const newTodo = {
            text: input.value,
            completed: false
        };
        todos.push(newTodo);
        saveTodos();
        renderTodos();
        input.value = '';
    });

    renderTodos();
});

