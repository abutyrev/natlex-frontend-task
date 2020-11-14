import { NgModule } from '@angular/core';
import { TodosComponent } from './todos/todos.component';
import {TodosRoutingModule} from './todos-routing.module';
import {SharedModule} from '../shared/shared.module';
import { TodosItemComponent } from './todos-item/todos-item.component';
import {MatListModule} from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';



@NgModule({
  declarations: [TodosComponent, TodosItemComponent],
  imports: [TodosRoutingModule, SharedModule, MatListModule, MatCheckboxModule]
})
export class TodosModule { }
