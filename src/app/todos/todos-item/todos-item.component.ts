import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Todo} from '../todo';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {TodosService} from '../todos.service';

@Component({
  selector: 'app-todos-item',
  templateUrl: './todos-item.component.html',
  styleUrls: ['./todos-item.component.scss']
})
export class TodosItemComponent implements OnInit {
  @Input() todo!: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private todosService: TodosService) {
  }

  ngOnInit(): void {
  }

  setClasses(): { [key: string]: any } {
    return {
      'is-complete': this.todo.completed
    };
  }

  onToggle(value: MatCheckboxChange, todo: Todo): void {
    this.todosService.toggleTodo(todo.id, value.checked);
  }

  onDelete(todo: Todo): void {
    this.deleteTodo.emit(todo);
  }

}
