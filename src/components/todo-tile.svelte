<script lang="ts">
	import { getContext } from 'svelte';
	import type { Todo } from "../module/types.svelte";
	
	const { deleteToDo } = getContext('todo');

	export let todo: Todo;
	let inputElement: HTMLInputElement;
	let edit = false;
	let showMenu = false;

	async function handleFocus() {
		inputElement.selectionStart = inputElement.selectionEnd = inputElement.value.length;
	}

	function setShowMenu(newValue = true) {
		showMenu = newValue;
	}
</script>

<li class="w-full rounded-lg hover:bg-white" on:mouseenter={() => setShowMenu()} on:mouseleave={() => setShowMenu(false)}>
	<div class="flex items-center gap-4 py-2">
		<input
			type="checkbox"
			bind:checked={todo.checked}
			class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2"
		/>

		{#if edit}
			<input type="text" on:focusout={() => (edit = false)} on:focus={() => handleFocus()} bind:value={todo.title} bind:this={inputElement} class="flex-1 bg-transparent" autofocus />
		{:else}
			<div class="flex-1" on:click={() => (edit = true)}>{todo.title}</div>
		{/if}

		{#if showMenu}
			<button on:click={() => deleteToDo(todo)}>DEL</button>
		{/if}
	</div>
</li>
