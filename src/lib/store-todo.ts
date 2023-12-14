import { writable } from "svelte/store";
import type { Todo } from "../module/types";

let nextTodoId = 99999;

export function createTodoStore(initialTodos: Todo[] = []) {
    const todos = writable<Todo[]>(initialTodos);

    const add = (title: string, checked = false) => {
        const todo: Todo = { title: title, checked: checked, id: nextTodoId++ };
        todos.update((existingTodos) => [...existingTodos, todo]);
    };

    const remove = (id: number) => {
        todos.update((existingTodos) => existingTodos.filter((t) => t.id !== id));
    };

    const sort = () => {
        todos.update((existingTodos) =>
            [...existingTodos].sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: "base" }))
        );
    };

    return { ...todos, add, remove, sort };
}