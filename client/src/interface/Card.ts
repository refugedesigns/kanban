export interface Card {
  id: string;
  columnId: string;
  name: string;
  tag?: string;
  dueDate?: Date;
  description?: string;
  createdAt?: Date;
}
