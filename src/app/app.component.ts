import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'To Do List';
  todos = [
    {
      label: 'Send Files',
      done: false, 
      priority: 3
    },
    {
      label: 'Pull Github',
      done: true, 
      priority: 1
    },
    {
      label: 'Push Github',
      done: false, 
      priority: 4
    },
    {
      label: 'Commit to Master',
      done: false, 
      priority: 5
    }
  ];

  addTodo(newTodoLabel) {
    var newTodo ={
      label: newTodoLabel,
      priority: 1,
      done: false
    };
    this.todos.push(newTodo);
  }

  deleteTodo(todo) {
    this.todos = this.todos.filter( t => t.label !== todo.label );
  }
}

