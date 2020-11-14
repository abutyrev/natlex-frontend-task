import { NgModule } from '@angular/core';
import { TodosComponent } from './todos/todos.component';
import {TodosRoutingModule} from './todos-routing.module';



@NgModule({
  declarations: [TodosComponent],
  imports: [TodosRoutingModule]
})
export class TodosModule { }
