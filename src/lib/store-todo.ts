import { writable } from "svelte/store";
import type { Todo } from "../module/types";

export function createTodoStore(initialTodos: Todo[] = []) {
    const todos = writable<Todo[]>(initialTodos);

    // get biggest id from initialTodos. Id generation will start from maxId+1.
    const maxId = initialTodos.length > 0 ? Math.max(...initialTodos.map((todo) => todo.id || 0)) : 0;
    let nextTodoId = maxId + 1;

    const add = (title: string, checked = false) => {
        const todo: Todo = { id: nextTodoId++, title: title, checked: checked, };
        todos.update((existingTodos) => [todo, ...existingTodos]);
    };

    const updateById = (id: number, title: string, checked: boolean) => {
        todos.update((existingTodos) => {
            const index = existingTodos.findIndex((todo) => todo.id === id);

            if (index !== -1) {
                const updatedTodo = { ...existingTodos[index], title, checked };
                return [
                    ...existingTodos.slice(0, index),
                    updatedTodo,
                    ...existingTodos.slice(index + 1),
                ];
            } else {
                return existingTodos;
            }
        });
    };

    const remove = (id: number) => {
        todos.update((existingTodos) => existingTodos.filter((t) => t.id !== id));
    };

    const sort = (ascending: boolean = true) => {
        todos.update((existingTodos) =>
            [...existingTodos].sort((a, b) => {
                const comparison = a.title.localeCompare(b.title, undefined, { sensitivity: "base" });
                return ascending ? comparison : -comparison;
            })
        );
    };

    return { ...todos, add, remove, sort, updateById };
}