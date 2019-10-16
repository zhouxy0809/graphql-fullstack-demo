import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'data-table-header',
  templateUrl: './header.component.html'
})

export class DataTableHeaderComponent {

  private _columns: any[];
  private _actions: any[];

  @Input()
  set columns(value) {
    this._columns = value;
  }
  get columns(): any[] {
    return this._columns;
  }

  @Input()
  set actions(value) {
    this._actions = value;
  }
  get actions() {
    return this._actions;
  }

  @Input() options;

  @Output() allChecked: EventEmitter<any> = new EventEmitter<any>();

  constructor(
  ) {}
}
