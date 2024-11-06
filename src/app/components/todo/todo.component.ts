import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table'; 
import { MatTableDataSource } from '@angular/material/table'; 
import { AddTodoComponent } from './add-todo/add-todo.component';
import { MatSortModule } from '@angular/material/sort'; 
import { MatButtonModule } from '@angular/material/button'; 
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSortModule, MatButtonModule, AddTodoComponent, ReactiveFormsModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  todoForm: FormGroup;
  todos: Todo[] = [];
  displayedColumns: string[] = ['task', 'dueDate', 'priority', 'completed', 'actions'];
  dataSource = new MatTableDataSource<Todo>(this.todos); 
  taskCount: number = 0;
  filterStatus: string = 'all'; 

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.todoForm = new FormGroup({
      newTodo: new FormControl('', Validators.required),
      dueDate: new FormControl('', Validators.required),
      priority: new FormControl(1, Validators.required),
      subtasks: new FormArray([])
    });
  }

  addTodo() {
    if (this.todoForm.valid) {
      const todo = {
        name: this.todoForm.get('newTodo')?.value,
        date: this.todoForm.get('dueDate')?.value,
        priority: this.todoForm.get('priority')?.value,
        subtasks: this.todoForm.get('subtasks')?.value
      };
      this.handleTodoAdded(todo);
      this.todoForm.reset({ priority: 1 });
    } else {
      alert('Ensure all the fields are filled');
    }
  }

  handleTodoAdded(todo: { name: string; date: string; priority: number }): void {
    console.log('Received todo:', todo); // Debugging statement
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
