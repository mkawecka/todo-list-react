'use strict';

const categoryIcon = {
	work: 'briefcase',
	home: 'home',
	kids: 'child',
	other: 'tasks',
};

const Todo = ({ id, category, text, isDone, onEdit, onDelete, onComplete }) => {
	return (
		<li className={isDone ? 'completed' : ''}>
			<div className='task'>
				<i className={`category-icon fas fa-${categoryIcon[category]}`} aria-hidden='true'></i> {text}
			</div>
			<div className='tools'>
				<button className='complete' onClick={() => onComplete(id)}>
					<i className='fas fa-check' aria-hidden='true'></i>
				</button>
				<button className='edit' onClick={() => onEdit({ id, category, text })}>
					EDIT
				</button>
				<button className='delete' onClick={() => onDelete(id)}>
					<i className='fas fa-times' aria-hidden='true'></i>
				</button>
			</div>
		</li>
	);
};

const TodoList = ({ onEdit, onDelete, onComplete, todos, setTodos }) => {
	const inputRef = React.useRef();
	const selectRef = React.useRef();
	const [error, setError] = React.useState('');

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
				<select ref={selectRef} className='todo-select' defaultValue='0'>
					<option value='0' className='category-option' disabled>
						-select category-
					</option>
					<option value='work' className='category-option'>
						Work
					</option>
					<option value='home' className='category-option'>
						Home
					</option>
					<option value='kids' className='category-option'>
						Kids
					</option>
					<option value='other' className='category-option'>
						Other
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
						<Todo key={todo.id} {...todo} onEdit={onEdit} onDelete={onDelete} onComplete={onComplete} />
					))}
				</ul>
			</div>
		</div>
	);
};

const Popup = ({ todoToEdit, onEditDecline, onEditConfirm }) => {
	const inputRef = React.useRef();
	const selectRef = React.useRef();
	return (
		<div className='popup'>
			<h3>Edit task:</h3>
			<div className='popup-body'>
				<p className='popup-info'></p>
				<input
					ref={inputRef}
					type='text'
					className='popup-input'
					placeholder='Enter new task name...'
					defaultValue={todoToEdit.text}
				/>
				<select ref={selectRef} className='popup-select' defaultValue={todoToEdit.category}>
					<option value='0' className='category-option' disabled>
						-select category-
					</option>
					<option value='work' className='category-option'>
						Work
					</option>
					<option value='home' className='category-option'>
						Home
					</option>
					<option value='kids' className='category-option'>
						Kids
					</option>
					<option value='other' className='category-option'>
						Other
					</option>
				</select>
				<button
					className='popup-btn accept'
					onClick={() => onEditConfirm(todoToEdit.id, inputRef.current.value, selectRef.current.value)}>
					Confirm
				</button>
				<button className='popup-btn cancel' onClick={onEditDecline}>
					Decline
				</button>
			</div>
		</div>
	);
};

const App = () => {
	const [todos, setTodos] = React.useState([]);
	const [todoToEdit, setTodoToEdit] = React.useState(null);

	const onEditDecline = () => {
		setTodoToEdit(null);
	};

	const onEditConfirm = (id, text, category) => {
		const newTodos = JSON.parse(JSON.stringify(todos));
		const todoOnEdit = newTodos.find(todo => todo.id == id);

		todoOnEdit.text = text;
		todoOnEdit.category = category;
		setTodos(newTodos);
		setTodoToEdit(null);
	};

	const onDelete = id => {
		const newTodos = JSON.parse(JSON.stringify(todos));
		const todoToDelteIndex = newTodos.findIndex(todo => todo.id == id);

		newTodos.splice(todoToDelteIndex, 1);

		setTodos(newTodos);
	};

	const onComplete = id => {
		const newTodos = JSON.parse(JSON.stringify(todos));
		const todoToComplete = newTodos.find(todo => todo.id == id);

		todoToComplete.isDone = !todoToComplete.isDone;

		setTodos(newTodos);
	};

	return (
		<>
			<TodoList onEdit={setTodoToEdit} todos={todos} setTodos={setTodos} onDelete={onDelete} onComplete={onComplete} />
			{todoToEdit ? (
				<Popup todoToEdit={todoToEdit} onEditDecline={onEditDecline} onEditConfirm={onEditConfirm} />
			) : null}
		</>
	);
};

// const LOCALSTORAGE_KEY = 'tasks';
// const TASKS = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) || [];

// const updateStorage = () => {
// 	localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(TASKS));
// };

const rootNode = document.getElementById('root');
const root = ReactDOM.createRoot(rootNode);
root.render(React.createElement(App));
