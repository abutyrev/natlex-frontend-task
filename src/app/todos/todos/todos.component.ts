import {Component, OnInit} from '@angular/core';
import {Todo} from '../todo';
import {TodosService} from '../todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  addTodoTitle = '';

  constructor(private todosService: TodosService) {
  }

  get todos(): Todo[] {
    return this.todosService.todos;
  }

  ngOnInit(): void {
    if (this.todos.length === 0) {
      this.todosService.getTodos();
    }
  }

  trackByTodos(index: number, todo: Todo): number | string {
    return todo.id;
  }

  deleteTodo(todo: Todo): void {
    this.todosService.deleteTodo(todo.id);
  }

  onAddTodo(title: string): void {
    this.todosService.addTodo(title);
    this.addTodoTitle = '';
  }
}
