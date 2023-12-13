<script lang="ts">
	import { setContext } from "svelte";
	import type { Project, Todo } from "../module/types.svelte";
	import TodoTile from "./todo-tile.svelte";

	setContext("todo", { deleteToDo });

	let showAdd = false;
	let currentAdd = "";

	let showCompleted = true;

	let project: Project = {
		title: "Project 1",
		description: "Here go a small description of your project. Let’s make it 2 line to have it cooler.",
		todoList: [
			{ title: "1hfehfhfiefhiefhmms", checked: false },
			{ title: "2hfehfhfiefhiefhmms", checked: false },
			{ title: "3hfehfhfiefhiefhmms", checked: false },
			{ title: "4hfehfhfiefhiefhmms", checked: false },
			{ title: "5hfehfhfiefhiefhmms", checked: true },
			{ title: "6hfehfhfiefhiefhmms", checked: true },
		],
	};

	let todoList = [...project.todoList];

	function getFilteredAndSortedList() {
		return project.todoList.filter((todo) => (!showCompleted ? todo.checked == false : true)).sort();
	}

	function setShowAdd(newValue = true) {
		showAdd = newValue;
		currentAdd = "";
	}

	function setShowCompleted(newValue = true) {
		showCompleted = newValue;
		todoList = [...getFilteredAndSortedList()];
	}

	function addNewTodo() {
		if (currentAdd == "") {
			setShowAdd(false);
			return;
		}
		let newTodo: Todo = { title: currentAdd, checked: false };
		project.todoList = [newTodo, ...project.todoList];
		todoList = [...getFilteredAndSortedList()];
		setShowAdd(false);
	}

	function onInputKeyPress(e: any) {
		if (!e) e = window.event;
		let keyCode = e.code || e.key;
		if (keyCode == "Enter") {
			addNewTodo();
		}
	}

	function deleteToDo(toDo: Todo) {
		const toDoIndex = project.todoList.indexOf(toDo);

		if (toDoIndex !== -1) {
			project.todoList.splice(toDoIndex, 1);
			project.todoList = project.todoList;
			todoList = [...getFilteredAndSortedList()];
		}
	}
</script>

<div class="right flex-1 h-full rounded-lg p-16">
	<div class="flex flex-col gap-4">
		<h2 class="text-4xl font-extrabold">{project.title}</h2>
		<p class="mb-4 text-lg font-normal">
			{project.description}
		</p>
		<div class="flex justify-between">
			<button on:click={() => setShowAdd()}>Add</button>
			<div class="flex gap-4">
				{#if !showCompleted}
					<button on:click={() => setShowCompleted()}>Show Completed</button>
				{:else}
					<button on:click={() => setShowCompleted(false)}>Hide Completed</button>
				{/if}
				<button>Sort By</button>
			</div>
		</div>

		<ul class="w-full text-sm font-medium">
			{#if showAdd}
				<li class="w-full rounded-t-lg">
					<div class="flex items-center gap-4 py-2">
						<button class="w-4 h-4" on:click={() => addNewTodo()}>+</button><input
							bind:value={currentAdd}
							type="text"
							name="newTodo"
							id="newTodo"
							on:focusout={() => addNewTodo()}
							on:keypress={(e) => onInputKeyPress(e)}
							autofocus
						/>
					</div>
				</li>
			{/if}
			{#each todoList as todo}
				<TodoTile {todo} />
			{/each}
		</ul>
	</div>
</div>

<style>
	.right {
		background-color: var(--text-color);
		color: var(--background-color);
	}
</style>
