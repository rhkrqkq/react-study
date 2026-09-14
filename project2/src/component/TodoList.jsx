import TodoItem from "./TodoItem.jsx";
import "./TodoList.css";

const TodoList = () => {
	return (
		<div className="TodoList">
			<h4>Todo List 🌱</h4>
			<input className="searchBar" placeholder="검색어를 입력하세요" />
			<div className="list_wrapper">
				<TodoItem />
				<TodoItem />
				<TodoItem />
			</div>
		</div>
	);
};

export default TodoList;
