import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        animate('500ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class AddTodoComponent {
  todoForm: FormGroup;

  @Output() todoAdded = new EventEmitter<{ name: string; date: string; priority: number }>();

  constructor() {
    this.todoForm = new FormGroup({
      newTodo: new FormControl('', Validators.required),
      dueDate: new FormControl('', Validators.required),
      priority: new FormControl(1, Validators.required)
    });
  }

  addTodo() {
    if (this.todoForm.valid) {
      const todo = {
        name: this.todoForm.get('newTodo')?.value,
        date: this.todoForm.get('dueDate')?.value,
        priority: this.todoForm.get('priority')?.value
      };
      console.log('Emitting todo:', todo); // Debugging statement
      this.todoAdded.emit(todo);
      this.todoForm.reset({ priority: 1 });
    } else {
      alert('Ensure all the fields are filled');
    }
  }
}
