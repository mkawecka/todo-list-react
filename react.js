'use strict';

const categoryIcon = {
	work: 'briefcase',
	home: 'home',
	kids: 'child',
	other: 'tasks',
};

const Todo = ({ category, text, isDone }) => {
	return (
		<li className={isDone ? 'completed' : ''}>
			<div className='task'>
				<i className={`category-icon fas fa-${categoryIcon[category]}`} aria-hidden='true'></i> {text}
			</div>
			<div className='tools'>
				<button className='complete'>
					<i className='fas fa-check' aria-hidden='true'></i>
				</button>
				<button className='edit'>EDIT</button>
				<button className='delete'>
					<i className='fas fa-times' aria-hidden='true'></i>
				</button>
			</div>
		</li>
	);
};

const TodoList = () => {
	const inputRef = React.useRef();
	const selectRef = React.useRef();
	const [error, setError] = React.useState('');
	const [todos, setTodos] = React.useState([]);

	const addTodo = () => {
		setError('');

		if (inputRef.current.value !== '' && selectRef.current.value !== '0') {
			const newTodo = {
				id: crypto.randomUUID(),
				category: selectRef.current.value,
				text: inputRef.current.value,
				isDone: false,
			};

			setTodos([...todos, newTodo]);
			// renderTask(newTask);
			// TASKS.push(newTask);

			// updateStorage();

			inputRef.current.value = '';
			selectRef.current.value = '0';
			setError('');
		} else if (inputRef.current.value !== '' && selectRef.current.value === '0') {
			setError('Select task category!');
		} else if (inputRef.current.value === '' && selectRef.current.value !== '0') {
			setError('Enter task name!');
		} else {
			setError('Enter task name and select task category!');
		}
	};

	return (
		<div className='todo'>
			<div className='header'>
				<h1>
					<i className='fas fa-clipboard-list'></i> ToDo List
				</h1>
				<input ref={inputRef} type='text' className='todo-input' placeholder='Enter task name...' />
				<select ref={selectRef} className='todo-select'>
					<option value='0' className='category-option' selected disabled>
						{' '}
						-select category-{' '}
					</option>
					<option value='work' className='category-option'>
						<i className='fas fa-briefcase'></i> Work
					</option>
					<option value='home' className='category-option'>
						<i className='fas fa-home'></i> Home
					</option>
					<option value='kids' className='category-option'>
						<i className='fas fa-child'></i> Kids
					</option>
					<option value='other' className='category-option'>
						<i className='fas fa-tasks'></i> Other
					</option>
				</select>
				<button className='btn-add' onClick={addTodo}>
					Add
				</button>
			</div>
			<div className='todolist'>
				<p className='error-info'>{error}</p>
				<ul>
					{todos.map(todo => (
						// <Todo text={todo.text} category={todo.category} isDone={todo.isDone} />
						<Todo key={todo.id} {...todo} />
					))}
				</ul>
			</div>
		</div>
	);
};

const Popup = () => {
	return (
		<div className='popup'>
			<h3>Edit task:</h3>
			<div className='popup-body'>
				<p className='popup-info'></p>
				<input type='text' className='popup-input' placeholder='Enter new task name...' />
				<select>
					<option value='0' className='category-option' selected disabled>
						{' '}
						-select category-{' '}
					</option>
					<option value='work' className='category-option'>
						<i className='fas fa-briefcase'></i> Work
					</option>
					<option value='home' className='category-option'>
						<i className='fas fa-home'></i> Home
					</option>
					<option value='kids' className='category-option'>
						<i className='fas fa-child'></i> Kids
					</option>
					<option value='other' className='category-option'>
						<i className='fas fa-tasks'></i> Other
					</option>
				</select>
				<button className='popup-btn accept'>Confirm</button>
				<button className='popup-btn cancel'>Decline</button>
			</div>
		</div>
	);
};

// const LOCALSTORAGE_KEY = 'tasks';
// const TASKS = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) || [];

// const prepareDOMElements = () => {
// 	todoInput = document.querySelector('.todo-input');
// 	errorInfo = document.querySelector('.error-info');
// 	addBtn = document.querySelector('.btn-add');
// 	ulList = document.querySelector('.todolist ul');
// 	popup = document.querySelector('.popup');
// 	popupInfo = document.querySelector('.popup-info');
// 	popupInput = document.querySelector('.popup-input');
// 	popupTaskCategory = document.querySelector('#popup-task-category');
// 	popupAddBtn = document.querySelector('.accept');
// 	popupCloseBtn = document.querySelector('.cancel');
// 	categorySelect = document.querySelector('#task-category');
// 	categoryOptions = document.querySelectorAll('.category-option');
// 	categoryIcons = document.querySelectorAll('.category-icon');
// };

// const prepareDOMEvents = () => {
// 	addBtn.addEventListener('click', addTask);
// 	ulList.addEventListener('click', checkClick);
// 	popupCloseBtn.addEventListener('click', closePopup);
// 	popupAddBtn.addEventListener('click', changeTodoText);
// 	todoInput.addEventListener('keyup', enterKeycheck);
// };

// const updateStorage = () => {
// 	localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(TASKS));
// };

const App = () => {
	return (
		<>
			<TodoList /> <Popup />
		</>
	);
};

const rootNode = document.getElementById('root');
const root = ReactDOM.createRoot(rootNode);
root.render(React.createElement(App));
