import { from } from 'rxjs';
import { isNullOrUndefined } from 'util';

import { Component, Input, ViewEncapsulation } from '@angular/core';

import { DTAction } from '../../data-table.interface';
import { isFunction, isObject } from '../../utils/utils';

declare var $;

@Component({
  selector: 'data-table-body-action',
  templateUrl: './body-action.component.html',
  encapsulation: ViewEncapsulation.None
})

export class DataTableBodyActionComponent {

  private _row: any;
  private _actions: any[];

  @Input()
  set row(value: any) {
    this._row = value;
  }
  get row() {
    return this._row;
  }

  @Input()
  set actions(value: DTAction[]) {
    this._actions = this.getCanShowActions(value);
  }
  get actions(): DTAction[] {
    return this._actions;
  }

  constructor() {}

  getCanShowActions(actions: DTAction[]): DTAction[] {
    if (actions.length > 0) {
      const defaultCanShowActions = actions.filter(action => !this.isDefinedFunc(action.canShowFn));
      // async value is true
      const canShowFnActions = [];
      for (let i = 0; i < actions.length; i++) {
        if (typeof actions[i].canShowFn === 'function') {
          from(actions[i].canShowFn(this.row))
            .subscribe(resp => {
              if (resp) {
                canShowFnActions.push(actions[i]);
              }
            });
        }
      }

      return [...defaultCanShowActions, ...canShowFnActions];
    }
  }

  isDefinedObj(obj): boolean {
    return isObject(obj);
  }

  isDefinedFunc(func): boolean {
    return isFunction(func);
  }

  isDisabled(action: DTAction, item) {
    return this.isDefinedFunc(action.disabledFn) && action.disabledFn(item);
  }

  disabledClick = () => {};
}
