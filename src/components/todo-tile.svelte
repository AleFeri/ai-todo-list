<script lang="ts">
	import type { Todo } from "../module/types.svelte";

	export let todo: Todo;
	let inputElement: HTMLInputElement;
	let edit = false;

	async function handleFocus() {
		inputElement.selectionStart = inputElement.selectionEnd = inputElement.value.length;
	}
</script>

<li class="w-full rounded-t-lg">
	<div class="flex items-center">
		<input
			type="checkbox"
			checked={todo.checked}
			class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2"
		/>
		{#if edit}
			<input
				type="text"
				on:focusout={() => (edit = false)}
				on:focus={() => handleFocus()}
				bind:value={todo.title}
				bind:this={inputElement}
				class="w-full py-3 m s-2 text-sm font-medium"
				autofocus
			/>
		{:else}
			<div on:click={() => (edit = true)}>{todo.title}</div>
		{/if}
	</div>
</li>
