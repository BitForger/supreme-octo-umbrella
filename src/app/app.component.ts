import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'IBM-Challenge';
  placeholderTodos = [
    {
      title: 'test',
      priority: 1,
    },
    {
      title: 'test 2',
      priority: 2,
    },
    {
      title: 'test 3',
      priority: 3,
    },
  ];
}
