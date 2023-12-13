import { writable } from "svelte/store";
import type { Todo } from "../module/types";

export function createTodoStore(initialTodos: Todo[] = []) {
    const todos = writable<Todo[]>(initialTodos);

    const addTodo = (todo: Todo) => {
        todos.update((existingTodos) => [...existingTodos, todo]);
    };

    const removeTodo = (todo: Todo) => {
        todos.update((existingTodos) => existingTodos.filter((t) => t !== todo));
    };

    const sortTodos = () => {
        todos.update((existingTodos) =>
            [...existingTodos].sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: "base" }))
        );
    };

    return { ...todos, addTodo, removeTodo, sortTodos };
}