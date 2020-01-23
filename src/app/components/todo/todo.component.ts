import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  @Input()
  private title: string;

  @Input()
  private priority: number;

  constructor() { }

  ngOnInit() {
  }

}
