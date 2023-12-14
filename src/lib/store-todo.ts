import { writable } from "svelte/store";
import type { Todo } from "../module/types";

export function createTodoStore(initialTodos: Todo[] = []) {
    const todos = writable<Todo[]>(initialTodos);


    const add = (title: string, checked = false, id = 11) => {
        todos.update((existingTodos) => [...existingTodos, { id, title, checked }]);
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