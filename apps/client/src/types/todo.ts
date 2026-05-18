export interface Todo {
  id: number;
  title: string;
  userId?: number | null;
  completed: boolean;
}

export interface CreateTodoDto {
  title: string;
}

export interface UpdateTodoDto {
  title?: string;
  completed?: boolean;
}
