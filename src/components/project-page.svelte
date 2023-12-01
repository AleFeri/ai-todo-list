<script lang="ts">
	import type { Project, Todo } from "../module/types.svelte";
	import TodoTile from "./todo-tile.svelte";

	let showAdd = false;
	let currentAdd = "";

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

	function setShowAdd(newValue = true) {
		showAdd = newValue;
		currentAdd = "";
		console.log(project.todoList);
	}

	function addNewTodo() {
		let newTodo: Todo = { title: currentAdd, checked: false };
		project.todoList = [newTodo, ...project.todoList];
		setShowAdd(false);
	}
</script>

<div class="right flex-1 h-full rounded-lg p-16">
	<div class="flex flex-col gap-4">
		<h2 class="text-4xl font-extrabold">{project.title}</h2>
		<p class="mb-4 text-lg font-normal">
			{project.description}
		</p>
		<div>
			<button on:click={() => setShowAdd()}>Add</button>
			<button on:click={() => setShowAdd(false)}>Close</button>
		</div>

		<ul class="w-full text-sm font-medium">
			{#if showAdd}
				<li class="w-full rounded-t-lg">
					<div class="flex items-center gap-4 py-2">
						<button class="w-4 h-4" on:click={() => addNewTodo()}>+</button><input bind:value={currentAdd} type="text" name="newTodo" id="newTodo" autofocus />
					</div>
				</li>
			{/if}
			{#each project.todoList as todo}
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
