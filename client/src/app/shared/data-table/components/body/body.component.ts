import { NzEmptyService } from 'ng-zorro-antd';

import {
    Component, EventEmitter, Input, Output, TemplateRef, ViewChild, ViewEncapsulation
} from '@angular/core';

import { DTAction, DTColumn, DTOptions, DTPageInfo } from '../../data-table.interface';
import { DTRowSource } from '../../directives/row.directive';
import { setActionsDefault } from '../../utils/action-helper';
import { getterForName, setColumnDefaults } from '../../utils/column-helper';
import {
    getDifferenceInBasicArray, getIntersectionByCheckedProp, isNullOrUndefined
} from '../../utils/utils';

@Component({
  selector: 'data-table-body',
  templateUrl: './body.component.html',
  host: {
    class: 'data-table-body'
  },
  encapsulation: ViewEncapsulation.None
})

export class DataTableBodyComponent {

  private _rows: any[] = [];
  private _isSpinning = true;
  private _networkException = false;
  private _internalRows: any[] = [];
  private _columns: DTColumn[] = [];
  private _internalColumns: any[];
  private _actions: DTAction[] = [];
  private _pageInfo: any;

  private _checkedRows: any[] = [];
  private _disabledRows: any[] = [];
  // apply to checked in pagination
  private _currentPageChecked: any[];
  private _otherPageChecked: any[];

  allChecked = false;
  indeterminate = false;

  @Input() options: DTOptions;

  @Input()
  set rows(value: any[]) {
    this._rows = value;
    // important: get rows is async, and checked row is uploaded before rows
    this.allChecked = false;
    this.indeterminate = false;

    if (this.checked) {
      this.initChecked(this._checkedRows, this.checkedProp);
      this.initDisabled(this._disabledRows, this.checkedProp);
    }
  }
  get rows(): any[] {
    return this._rows;
  }

  @Input()
  set isSpinning(value) {
    this._isSpinning = value;
  }
  get isSpinning() {
    return this._isSpinning;
  }

  @Input()
  set columns(value: DTColumn[]) {
    if (value) {
      this._internalColumns = [...value];
      setColumnDefaults(this._internalColumns);
    }

    this._columns = value;

    // get column's title render template by row id
    this._columns.forEach(column => {
      if (column.renderTitle) {
        column._renderTitle = this._rowSource.getTitle(column.renderTitle);
      }
    });
  }
  get columns(): DTColumn[] {
    return this._columns;
  }

  @Input()
  set actions(value: DTAction[]) {
    this._actions = value;
    setActionsDefault(this._actions);
  }
  get actions() {
    return this._actions;
  }

  @Input()
  set pageInfo(value: DTPageInfo) {
    this._pageInfo = value;
  }
  get pageInfo(): DTPageInfo {
    return this._pageInfo;
  }

  @Input()
  set networkException(value) {
    this._networkException = value;
  }
  get networkException() {
    return this._networkException;
  }

  /**
   * checked row
   */
  @Input() checkedProp;

  @Input()
  set checked(value: any[]) {
    this._checkedRows = value;
    this.initChecked(this._checkedRows, this.checkedProp);
  }
  get checked(): any[] {
    return this._checkedRows;
  }

  @Input()
  set disabled(value: any[]) {
    this._disabledRows = value;
    this.initDisabled(this._disabledRows, this.checkedProp);
  }
  get disabled(): any[] {
    return this._disabledRows;
  }

  @Output() checkedChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private nzEmptyService: NzEmptyService,
    private _rowSource: DTRowSource
  ) { }

  trackByIdentity(index, item) {
    return item.id ? item.id : index;
  }

  checkAll(value: boolean) {
    this.rows.forEach(row => {
      if (isNullOrUndefined(row.$$disabled) || !row.$$disabled) {
        row.checked = value;
      }
    });
    this.refreshStatus();
  }

  refreshStatus(): void {
    const allChecked = this.rows.filter(value => isNullOrUndefined(value.$$disabled) || !value.$$disabled)
      .every(row => row.checked === true);
    const allUnChecked = this.rows.filter(value => isNullOrUndefined(value.$$disabled) || !value.$$disabled)
      .every(row => !row.checked);

    this.allChecked = allChecked;
    this.indeterminate = !allChecked && !allUnChecked;
    if (!isNullOrUndefined(this._checkedRows) && this.checkedProp) {
      this.checkedEventEmitter(this.rows, this._checkedRows, this.checkedProp);
    }
  }

  initChecked(checkedRows: any[] = [], checkedProp: string) {
    if (checkedRows.length > 0 && this.rows.length > 0) {
      this._currentPageChecked = getIntersectionByCheckedProp(checkedRows, this.rows, checkedProp);
      checkedRows.forEach(checked =>
        this.rows.forEach(row => {
          if (getterForName(checkedProp)(row, checkedProp) === checked) {
            row.checked = true;
          }
        }
        ));

      this._otherPageChecked = getDifferenceInBasicArray(checkedRows, this._currentPageChecked);
      this.refreshStatus();
    } else if (checkedRows.length === 0) {
      this.rows.forEach(row => {
        row.checked = false;
      });
      this.allChecked = false;
      this.indeterminate = false;
    }
  }

  initDisabled(disabledRows: any[] = [], disabledProp: string) {

    if (disabledRows.length > 0 && this.rows.length > 0) {
      disabledRows.forEach(disabled => {
        this.rows.forEach(row => {
          if (getterForName(disabledProp)(row, disabledProp) === disabled) {
            row.$$disabled = true;
          }
        });
      });
    }
  }

  checkedEventEmitter(rows, checkedRows, checkedProp) {
    this._otherPageChecked = checkedRows.length > 0 ?
      getDifferenceInBasicArray(checkedRows, this._currentPageChecked) : [];

    // filter checked and without $$disabled in current page
    const currentPageChecked = [];
    rows.map(row => {
      if (row.checked) {
        currentPageChecked.push(getterForName(checkedProp)(row, checkedProp));
      }
    });
    this._currentPageChecked = [...currentPageChecked];
    this.checkedChange.emit([...this._currentPageChecked, ...this._otherPageChecked]);
  }
}
