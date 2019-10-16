import { isNullOrUndefined } from 'util';

import {
    Component, EventEmitter, Input, KeyValueDiffer, KeyValueDiffers, Output
} from '@angular/core';

import { DTOptions, DTPageInfo, DTPagination } from '../../data-table.interface';

@Component({
  selector: 'data-table-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class DataTableFooterComponent {

  private _pageInfo = {};
  private _pagination: DTPagination;
  private _options: DTOptions;
  private _networkException;
  private _differ: KeyValueDiffer<any, any>;

  readonly defaultPageSize = 10;

  totalCount = 0;
  hasPreviousPage = false;
  hasNextPage = false;
  startCursor: string;
  endCursor: string;
  pageSizeOptions: any[];
  pageSize;
  changePageIndex = false;
  currentIndex = 1;
  hideOnSinglePage = true;

  @Input()
  set pageInfo(value: DTPageInfo) {
    if (!isNullOrUndefined(value)) {
      this._pageInfo = value;
      this.hasPreviousPage = value.hasPreviousPage;
      this.hasNextPage = value.hasNextPage;
      this.startCursor = value.startCursor;
      this.endCursor = value.endCursor;

      if (!isNullOrUndefined(this.pagination)) {
        this.triggerTotalCount();
      }
    }
  }
  get pageInfo() {
    return this._pageInfo;
  }

  @Input()
  set pagination(value: DTPagination) {
    if (!isNullOrUndefined(value)) {
      this._pagination = value;
      this.triggerTotalCount();
    }
  }
  get pagination(): DTPagination {
    return this._pagination;
  }

  @Input()
  set reset(value: boolean) {
    if (!isNullOrUndefined(value)) {
      this.currentIndex = 1;
    }
  }

  @Input()
  set networkException(value) {
    this._networkException = value;
  }
  get networkException() {
    return this._networkException;
  }

  // data table data is or not loading
  @Input() isSpinning;

  @Input()
  set options(value: DTOptions) {
    if (!isNullOrUndefined(value)) {
      this._options = value;
      this.pageSize = +value['pageSize'];
      this.pageSizeOptions = value['pageSizeOptions'];
    }
  }
  get options(): DTOptions {
    return this._options;
  }

  constructor(
    private _differs: KeyValueDiffers
  ) {
    this._differ = this._differs.find(this.pageInfo).create();
  }

  // call count update when current page pageInfo object changed， this logic has bug.
  // 当页面过滤时，第一页返回的pageInfo可能不变，但是过滤的数量发生了变化，还是需要重新计算count;
  // ngDoCheck() {
  //   const pageInfoChanges = this._differ.diff(this.pageInfo);

  //   if (pageInfoChanges) {
  //     if (!isNullOrUndefined(this.pagination)) {
  //       this.hideOnSinglePage = true;
  //       this.triggerTotalCount();
  //     }
  //   }
  // }

  triggerTotalCount() {
    this._pagination.totalCountFn()
      .then(resp => {
        this.totalCount = resp;
        this.hideOnSinglePage = false;
        if (this.networkException
          || isNullOrUndefined(this.totalCount)
          || this.totalCount < this.defaultPageSize && this.totalCount < this.pageSize) {
          this.hideOnSinglePage = true;
        }
      });
  }

  showCurrentDataRange() {
    if (this.totalCount === 0) {
      return `0 - 0`;
    }

    const startNum = (this.currentIndex - 1) * this.pageSize + 1;
    const endNum = this.currentIndex * this.pageSize > this.totalCount ?
      this.totalCount : this.currentIndex * this.pageSize;

    return `${startNum} - ${endNum}`;
  }

  onPageSizeChange(pageSize) {
    this.currentIndex = 1;
    this._pagination.pageSizeChangedFn(pageSize);
  }

  jumpPre() {
    this.jumpPage(this.currentIndex - 1);
    this._pagination.jumpPrevChangedFn(this.startCursor, this.pageSize);
  }

  jumpNext() {
    this.jumpPage(this.currentIndex + 1);
    this._pagination.jumpNextChangedFn(this.endCursor, this.pageSize);
  }

  jumpPage(index: number): void {
    if (index === this.currentIndex) {
      return;
    }
    this.currentIndex = index;
    this.changePageIndex = true;

    this.hasPreviousPage = false;
    this.hasNextPage = false;
  }
}
