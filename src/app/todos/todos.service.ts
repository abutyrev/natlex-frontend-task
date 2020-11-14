import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Todo} from './todo';
import {UtilityService} from '../shared/utility.service';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  todos: Todo[] = [];
  todosUrl = 'https://jsonplaceholder.typicode.com/todos';
  todosLimit = 10;

  constructor(private http: HttpClient, private utilityService: UtilityService) {
  }

  getTodos(): void {
    this.http.get<Todo[]>(this.todosUrl, {
      params: new HttpParams().set('_limit', `${this.todosLimit}`)
    }).subscribe(data => {
      this.todos = data;
    });
  }

  toggleTodo(id: number | string, value: boolean): void {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = value;
    }
  }

  deleteTodo(id: number | string): void {
    this.todos = this.todos.filter(t => t.id !== id);
  }

  addTodo(title: string): void {
    this.todos = [...this.todos, {
      id: this.utilityService.genId(),
      title,
      completed: false
    }];
  }
}
