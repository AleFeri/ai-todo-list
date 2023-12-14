<script lang="ts">
	import type { Todo } from "../module/types";
	export let todo: Todo;
	export let deleteTodo: (value: number) => void;

	let inputElement: HTMLInputElement;
	let edit = false;
	let showOptions = false;

	async function handleFocus() {
		inputElement.selectionStart = inputElement.selectionEnd =
			inputElement.value.length;
	}
</script>

<li
	class="w-full rounded-lg hover:bg-white"
	on:mouseenter={() => (showOptions = true)}
	on:mouseleave={() => (showOptions = false)}
>
	<div class="flex items-center gap-4 py-2">
		<input
			type="checkbox"
			bind:checked={todo.checked}
			class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2"
		/>
		{#if edit}
			<input
				type="text"
				on:focusout={() => (edit = false)}
				on:focus={() => handleFocus()}
				bind:value={todo.title}
				bind:this={inputElement}
				class="flex-1 bg-transparent"
			/>
		{:else}
			<div class="flex-1" on:click={() => (edit = true)}>
				{todo.title}
			</div>
		{/if}

		{#if showOptions}
			<button on:click={() => deleteTodo(todo.id)}>DEL</button>
		{/if}
	</div>
</li>
