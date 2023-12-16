<script lang="ts">
	import TodoTile from "./todo-tile.svelte";
	import { createTodoStore } from "$lib/store-todo";
	import { mockTodoList } from "../module/mockTodos";
	import type { Todo } from "../module/types";

	const todoStore = createTodoStore(mockTodoList);

	let showAdd = false;
	let showCompletedTodos = true;
	let newTodo = "";
	let newTodoHtmlInputElement: HTMLInputElement;
	let sortAscending = true;

	function addNewTodo() {
		showAdd = false;
		if (newTodo === "") return;
		todoStore.add(newTodo);
		newTodo = "";
	}

	function addByPressingEnter(e: any) {
		const keyCode = e.code || e.key;
		if (keyCode === "Enter") addNewTodo();
	}

	function deleteTodo(todoId: number) {
		todoStore.remove(todoId);
	}

	function editTodo(todoEdited: Todo) {
		todoStore.updateById(
			todoEdited.id,
			todoEdited.title,
			!todoEdited.checked,
		);
	}

	function sortTodoList() {
		todoStore.sort(sortAscending);
		sortAscending = !sortAscending;
	}

	$: {
		if (newTodoHtmlInputElement) newTodoHtmlInputElement.focus();
	}
</script>

<div class="right flex-1 h-full rounded-lg p-16">
	<div class="flex flex-col gap-4">
		<h2 class="text-4xl font-extrabold">Project 1</h2>
		<p class="mb-4 text-lg font-normal">Description hard coded</p>

		<div class="flex justify-between">
			<button on:click={() => (showAdd = true)}>Add</button>
			<div class="flex gap-4">
				{#if !showCompletedTodos}
					<button on:click={() => (showCompletedTodos = true)}
						>Show Completed</button
					>
				{:else}
					<button on:click={() => (showCompletedTodos = false)}
						>Hide Completed</button
					>
				{/if}
				<button on:click={sortTodoList}>Sort By</button>
			</div>
		</div>

		<ul class="w-full text-sm font-medium">
			{#if showAdd}
				<li class="w-full rounded-t-lg">
					<div class="flex items-center gap-4 py-2">
						<button class="w-4 h-4" on:click={addNewTodo}>+</button
						><input
							bind:value={newTodo}
							bind:this={newTodoHtmlInputElement}
							type="text"
							name="newTodo"
							id="newTodo"
							placeholder="Start typing to create a todo"
							on:focusout={addNewTodo}
							on:keypress={(e) => addByPressingEnter(e)}
						/>
					</div>
				</li>
			{/if}
			{#each $todoStore as todo}
				{#if showCompletedTodos || !todo.checked}
					<TodoTile {todo} {deleteTodo} {editTodo} />
				{/if}
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
