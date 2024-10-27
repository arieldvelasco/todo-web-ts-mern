import { TodoType } from "../types/todo";

export const loadData = (key: string) => {
    const data =  localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

export const saveData = (key: string, data: TodoType[]) => {
    localStorage.setItem(key, JSON.stringify(data))
}