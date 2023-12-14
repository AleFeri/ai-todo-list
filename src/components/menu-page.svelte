<script>
	let isOpen = true;
	let searchText = "";

	function toggleOpen() {
		isOpen = !isOpen;
	}

	function close() {
		isOpen = false;
	}
</script>

<div class="flex flex-col {isOpen? "gap-8" : "justify-between"} h-full p-8">
	<div on:click={() => toggleOpen()}>{isOpen ? "X" : "="}</div>

	{#if isOpen}
		<div class="p-8">
			<div class="flex gap-8">
				<div class="flex-1">
					<div class="text-5xl font-bold">
						Hi <a class="bg-gradient-to-r from-cyan-400 to-gray-900 bg-clip-text text-transparent">Mario</a>
					</div>
					<div>Welcome back to your work space. We missed you.</div>
				</div>
				<div class="flex flex-col justify-center">
					<div>S</div>
				</div>
			</div>
			<div class="bg-white text-gray-900 border-2 border-cyan-400 p-4 rounded-2xl flex my-8">
				<input class="flex-1 outline-none" placeholder="Search Project..." bind:value={searchText} />
				<div>O\</div>
			</div>

			<div class="flex flex-col gap-4">
				<div>Projects (1)</div>
				<div>+ Create New Project</div>
				<div>Projects List</div>
			</div>
		</div>
	{:else}
		<div>S</div>
	{/if}
</div>
