import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatSelectChange} from '@angular/material';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  @Input()
  private todo;

  @Input()
  private onPriorityChange: ($event: MatSelectChange, id: any) => void;

  constructor() { }

  ngOnInit() {
  }
}
