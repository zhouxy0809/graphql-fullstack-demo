import { Component, DoCheck, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

import { DTModel, DTOptions, DTPageInfo } from '../data-table.interface';
import { DTRowSource } from '../directives/row.directive';

declare var $;

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  host: {
    class: 'data-table'
  },
  providers: [
    DTRowSource
  ],
  encapsulation: ViewEncapsulation.None
})
export class DataTableComponent {

  private _rows: any[];
  private _model: DTModel;
  private _isSpinning: boolean;
  private _networkException: boolean;
  private _options: DTOptions = {
    showCheckbox: false,
    showIndex: true,
    showPagination: true,
    showPageSize: true,
    pageSize: 10,
    pageSizeOptions: [10, 20, 50],
    spinningTips: '',
    actionsFrozenRight: false,
    actionsFrozenRightWidth: '200px',
    actionsFrozenScrollRatio: '120%'
  };
  private _checked: any[];
  private _disabled: any[];

  @Input()
  set rows(value: any[]) {
    this._rows = $.extend(true, [], value);
  }
  get rows(): any[] {
    return this._rows;
  }

  @Input()
  set model(value: DTModel) {
    this._model = value;
  }
  get model(): DTModel {
    return this._model;
  }

  @Input()
  set isSpinning (value) {
    this._isSpinning = value;
  }
  get isSpinning() {
    return this._isSpinning;
  }

  @Input()
  set networkException(value) {
    this._networkException = value;
  }
  get networkException() {
    return this._networkException;
  }

  @Input()
  set options(value: DTOptions) {
    this._options = Object.assign({}, this._options, value);
  }
  get options(): DTOptions {
    return this._options;
  }

  @Input()
  set checked(value: any[]) {
    this._checked = value || [];
    this.checkedChange.emit(value);
  }
  get checked(): any[] {
    return this._checked;
  }

  @Input() checkedProp;
  @Output() checkedChange: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  set disabled(value: any[]) {
    this._disabled = value || [];
  }
  get disabled(): any[] {
    return this._disabled;
  }

  @Input() pageInfo: DTPageInfo;
  @Input() reset;
}
