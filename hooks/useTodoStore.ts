import LocalStorage, { TODOS_KEY } from 'service/localStorage';
import Todo from 'types/todo';
import { create } from 'zustand';

type TodoStore = {
  todos: Todo[];
  loadTodos: () => void;
  saveTodo: (todo: Todo) => void;
  deleteTodo: (todoId: string) => void;
};

const useTodoStore = create<TodoStore>((set) => ({
  todos: [],

  loadTodos: async () => {
    const storedTodos = await LocalStorage.get(TODOS_KEY);
    set({ todos: storedTodos ? JSON.parse(storedTodos) : [] });
  },

  saveTodo: (todo) => {
    set((state) => {
      const updatedTodos = [...state.todos, todo];
      LocalStorage.set(TODOS_KEY, JSON.stringify(updatedTodos));
      return { todos: updatedTodos };
    });
  },

  deleteTodo: (todoId) => {
    set((state) => {
      const updatedTodos = state.todos.filter((todo) => todo.id !== todoId);
      LocalStorage.set(TODOS_KEY, JSON.stringify(updatedTodos));
      return { todos: updatedTodos };
    });
  },
}));

export default useTodoStore;
