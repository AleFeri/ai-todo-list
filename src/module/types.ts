
export type Todo = {
    id: number,
    title: string,
    checked: boolean
};

export type Project = {
    title: string,
    description: string,
    todoList: Todo[]
};
