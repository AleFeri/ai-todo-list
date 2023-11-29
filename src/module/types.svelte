<script lang="ts" context="module">
    export type Todo = {
        title: string,
		checked: boolean
    };

    export type Project = {
        title: string,
		description: string,
		todoList: Todo[]
    };
</script>