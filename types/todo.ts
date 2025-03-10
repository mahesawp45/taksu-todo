interface Todo {
  id: string;

  title: string;
  dueDate: Date;
  user: string;
  status: 'open' | 'done' | 'overdue';
}

export default Todo;
