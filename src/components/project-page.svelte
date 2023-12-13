<script lang="ts">
	import TodoTile from "./todo-tile.svelte";
	import { createTodoStore } from "$lib/store-todo";
	import { mockTodoList } from "../mockData/mockTodos";

	const todoStore = createTodoStore(mockTodoList);

	let showAdd = false;
	let showCompleted = true;
	let newTodo = "";
	let inputElement: HTMLInputElement;

	function addNewTodo() {
		todoStore.addTodo({ title: newTodo, checked: true });
		showAdd = false;
		newTodo = "";
	}

	function addByPressingEnter(e: any) {
		const keyCode = e.code || e.key;
		if (keyCode === "Enter") addNewTodo();
	}

	function showCompletedTodos() {
		showCompleted = !showCompleted;
	}

	// Focus on the new input element
	$: {
		if (inputElement) {
			inputElement.focus();
		}
	}
</script>

<div class="right flex-1 h-full rounded-lg p-16">
	<div class="flex flex-col gap-4">
		<h2 class="text-4xl font-extrabold">Project 1</h2>
		<p class="mb-4 text-lg font-normal">Description hard coded</p>

		<div class="flex justify-between">
			<button on:click={() => (showAdd = true)}>Add</button>
			<div class="flex gap-4">
				{#if !showCompleted}
					<button on:click={showCompletedTodos}>Show Completed</button
					>
				{:else}
					<button on:click={showCompletedTodos}>Hide Completed</button
					>
				{/if}
				<button on:click={todoStore.sortTodos}>Sort By</button>
			</div>
		</div>

		<ul class="w-full text-sm font-medium">
			{#if showAdd}
				<li class="w-full rounded-t-lg">
					<div class="flex items-center gap-4 py-2">
						<button class="w-4 h-4" on:click={() => addNewTodo()}
							>+</button
						><input
							bind:value={newTodo}
							bind:this={inputElement}
							type="text"
							name="newTodo"
							id="newTodo"
							on:focusout={() => addNewTodo()}
							on:keypress={(e) => addByPressingEnter(e)}
						/>
					</div>
				</li>
			{/if}
			{#each $todoStore as todo}
				{#if showCompleted || !todo.checked}
					<TodoTile {todo} />
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
