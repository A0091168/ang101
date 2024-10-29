import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent {
  newTodo: string = '';
  dueDate: string = '';
  priority: number = 1; 

  @Output() todoAdded = new EventEmitter<{ name: string; date: string; priority: number }>();

  addTodo() {
    if (this.newTodo && this.dueDate) {
      this.todoAdded.emit({ name: this.newTodo, date: this.dueDate, priority: this.priority });
      this.newTodo = '';
      this.dueDate = '';
      this.priority = 1; 
    }
    else {alert('Ensure all the fields are filled')}
    
  }
}
