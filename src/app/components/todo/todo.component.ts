import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table'; 
import { MatTableDataSource } from '@angular/material/table'; 
import { AddTodoComponent } from './add-todo/add-todo.component';
import { MatSortModule } from '@angular/material/sort'; 
import { MatButtonModule } from '@angular/material/button'; 

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSortModule, MatButtonModule, AddTodoComponent],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  todos: Todo[] = [];
  displayedColumns: string[] = ['task', 'dueDate', 'priority', 'completed', 'actions'];
  dataSource = new MatTableDataSource<Todo>(this.todos); 
  taskCount: number = 0;
  filterStatus: string = 'all'; 

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

 
  handleTodoAdded(todo: { name: string; date: string; priority: number }): void {
    this.todos.push({
      id: this.todos.length + 1,
      task: todo.name,
      dueDate: todo.date,
      completed: false,
      priority: todo.priority
    });
    this.taskCount = this.todos.length;

   
    this.updateDataSource();
  }

  
  toggleCompletion(todo: Todo): void {
    todo.completed = !todo.completed;
    this.updateDataSource(); 
  }

 
  deleteTodo(todoId: number): void {
    this.todos = this.todos.filter(todo => todo.id !== todoId);
    this.taskCount = this.todos.length;

    
    this.updateDataSource();
  }

  
  filterTasks(status: string): void {
    this.filterStatus = status; 
    this.updateDataSource(); 
  }

 
  updateDataSource(): void {
    if (this.filterStatus === 'completed') {
      this.dataSource.data = this.todos.filter(todo => todo.completed);
    } else if (this.filterStatus === 'active') {
      this.dataSource.data = this.todos.filter(todo => !todo.completed);
    } else {
      this.dataSource.data = this.todos; 
    }
    this.changeDetectorRef.detectChanges(); 
  }
}

interface Todo {
  id: number;
  task: string;
  dueDate: string;
  completed: boolean;
  priority: number;
}
