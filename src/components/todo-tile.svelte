<script lang="ts">
	import { getContext } from "svelte";
	import type { Todo } from "../module/types.ts";

	export let todo: Todo;
	let inputElement: HTMLInputElement;
	let edit = false;
	let showMenu = false;

	async function handleFocus() {
		inputElement.selectionStart = inputElement.selectionEnd =
			inputElement.value.length;
	}

	function setShowMenu(newValue = true) {
		showMenu = newValue;
	}
</script>

<li
	class="w-full rounded-lg hover:bg-white"
	on:mouseenter={() => setShowMenu()}
	on:mouseleave={() => setShowMenu(false)}
>
	<div class="flex items-center gap-4 py-2">
		<input
			type="checkbox"
			bind:checked={todo.checked}
			class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2"
		/>

		<div class="flex-1">{todo.title}</div>
	</div>
</li>
