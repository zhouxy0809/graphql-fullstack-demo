import {
    ChangeDetectorRef, Component, Input, PipeTransform, ViewEncapsulation
} from '@angular/core';

import { DTColumn } from '../../data-table.interface';
import { DTRowSource } from '../../directives/row.directive';
import { isFunction, isNullOrUndefined } from '../../utils/utils';

@Component({
  selector: 'data-table-body-cell',
  templateUrl: './body-cell.component.html',
  encapsulation: ViewEncapsulation.None
})

export class DataTableBodyCellComponent {

  private _row;
  private _rowIndex;
  private _column;
  private _renderTpl;

  value;

  @Input()
  set row(value) {
    this._row = value;
    this.checkValueUpdates();
    this._cdr.markForCheck();
  }
  get row() {
    return this._row;
  }

  @Input()
  set rowIndex(value: number) {
    this._rowIndex = value;
    this._cdr.markForCheck();
  }
  get rowIndex(): number {
    return this._rowIndex;
  }

  @Input()
  set column(value: DTColumn) {
    this._column = value;

    // get render template by row id
    if (this._column.render) {
      this._column._render = this._rowSource.getRow(this._column.render);
    }
    this.checkValueUpdates();
    this._cdr.markForCheck();
  }
  get column(): DTColumn {
    return this._column;
  }

  constructor(
    private _cdr: ChangeDetectorRef,
    // private _datePipe: DatePipe,
    private _rowSource: DTRowSource
  ) { }

  isNullOrUndefined = val => isNullOrUndefined(val);

  checkValueUpdates(): void {
    let value = '';

    if (!this.row || !this.column) {
      value = '';
    } else {
      const val = this.column.$$valueGetter(this.row, this.column.name);
      // custom pipe
      const userPipe: PipeTransform = this.column.pipe;
      const args: any = this.column.pipeTransformArgs;

      if (userPipe && args) {
        value = userPipe.transform(val, args);
      } else if (userPipe) {
        value = userPipe.transform(val);
      } else if (value !== undefined) {
        value = val;
      }
    }
    if (this.value !== value) {
      this.value = value;
      this._cdr.markForCheck();
    }
  }

  isDefinedFunction(value) {
    return isFunction(value);
  }

  // dateFormatted(date) {
  //   return this._datePipe.transform(date, 'yyyy-MM-dd HH:mm');
  // }
}
