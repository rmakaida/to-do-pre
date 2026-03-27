let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
	const tasks = localStorage.getItem('tasks');
	if(tasks != null) {
		return JSON.parse(tasks);
	}
	else {
		return items;
	}
}

function createItem(item) {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  	const textElement = clone.querySelector(".to-do__item-text");
  	const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  	const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  	const editButton = clone.querySelector(".to-do__item-button_type_edit");

	textElement.textContent = item;
	deleteButton.addEventListener('click', (evt) => {
		clone.remove();
		const items = getTasksFromDOM();
		saveTasks(items);
	});
	return clone;
}

function getTasksFromDOM() {
	const itemsNamesElements = document.querySelectorAll('.to-do__item-text');
	let tasks = [];
	itemsNamesElements.forEach(item => {
		tasks.push(item.textContent);
	});
	return tasks;
}

function saveTasks(tasks) {
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

items = loadTasks();
items.forEach(item => {
	listElement.append(createItem(item));
});

formElement.addEventListener('submit', (evt) => {
	evt.preventDefault();
	const item = inputElement.value;
	listElement.prepend(createItem(item));
	items = getTasksFromDOM();
	saveTasks(items);
	inputElement.value = '';
});