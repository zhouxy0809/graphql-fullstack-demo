import { Observable } from 'rxjs/index';

import { PipeTransform, TemplateRef } from '@angular/core';

/*******************/
/* DT              */
/*******************/
export interface DT {
  rows: any[];
  model: DTModel;
  pageInfo?: DTPageInfo;
  checked?: any[];
  checkedProp?: string;
  disabled?: any[];
  isSpinning?: boolean;
  options: DTOptions;
  networkException?: boolean;
}

/*******************/
/* DTModel         */
/*******************/
export interface DTModel {
  columns?: DTColumn[];
  actions?: DTAction[];
  pagination?: DTPagination;
}

/*******************/
/* DTColumn        */
/*******************/
export interface DTColumn {
  /**
   * Internal for setColumnDefaults
   */
  $$valueGetter?: ValueGetter;
  /**
   * Column name
   */
  name?: string;
  /**
   * Column label
   */
  label?: string;
  /**
   * Column type
   */
  type?: DTColumnType;
  /**
   * Router link callback in link type
   */
  routerLinkFn?: ((data: any) => void);
  /**
   * Disabled callback in input type
   */
  inputDisabledFn?: ((data: any) => boolean);
  /**
   * Options in select type
   */
  selectTypeOptions?: DTColumnSelectTypeOptions;
  /**
   * Tag color callback in tag type.
   */
  tagColorFn?: ((data: any) => string);
  /**
   * Column width, the defalut width of the column in pixels
   */
  width?: string;
  /**
   * Determines if the column is frozen to the left
   */
  frozenLeft?: boolean;
  /**
   * Determines if the column is frozen to the right
   */
  frozenRight?: boolean;
  /**
   * Column value is or not disabled, apply to input, select or boolean;
   */
  disabled?: boolean;
  /**
   * Column hidden
   */
  hidden?: boolean;
  /**
   * Custom pipe transform
   */
  pipe?: PipeTransform;
  /**
   * Custom pipe transform args
   */
  pipeTransformArgs?: any;
  /**
   * click table header callback
   */
  headerFn?: ((data: any) => void);
  /**
   * badge
   */
  badge?: DTColumnBadge;
  /**
   * custom column's render
   */
  render?: string;
  /**
   * just for custom column's render's clone
   */
  _render?: string;
  /**
   * custom column's title render
   */
  renderTitle?: string;
  /**
   * just for custom column's title render's clone
   */
  _renderTitle?: any;

  [key: string]: any;
}

export enum DTColumnType {
  index = 'index',
  link = 'link',
  boolean = 'boolean',
  text = 'text',
  input = 'input',
  // 下拉单选
  singleSelect = 'singleSelect',
  // 下拉多选
  multiSelect = 'multiSelect',
  tag = 'tag',
  badge = 'badge',
  time = 'time'
}

export interface DTColumnSelectTypeOptions {
  options: any[];
  label: string;
  value: string;
}

export interface DTColumnBadge {
  [key: number]: DTColumnBadgeValue;
  [key: string]: DTColumnBadgeValue;
}

export interface DTColumnBadgeValue {
  /**
   * 文本
   */
  text?: string;
  /**
   * 徽标颜色值
   */
  color?: string;
}

export type ValueGetter = (obj: any, name: string) => any;


/*******************/
/* DTAction        */
/*******************/
export interface DTAction {
  label?: string;
  type?: DTActionType;
  typeFn?: ((data: any) => DTActionType);
  iconType?: DTActionIcon;
  canShowFn?: ((data: any) => Observable<boolean> | Promise<boolean>);
  disabledFn?: ((data: any) => boolean);
  clickFn?: ((data: any) => void);
  popOptions?: DTPopOptions;
}

export enum DTActionType {
  text = 'text',
  icon = 'icon',
  pop = 'pop'
}

export enum DTActionIcon {
  up = 'up-circle',
  down = 'down-circle',
  plus = 'plus-circle',
  minus = 'minus-circle'
}

export interface DTPopOptions {
  title?: string;
  okText?: string;
  cancelText?: string;
  getTitleFn?: ((row) => String | TemplateRef<void>);
  confirmFn?: ((row) => void);
  cancelFn?: ((row) => void);
}

/*******************/
/* DTPagination    */
/*******************/
export interface DTPagination {
  totalCountFn?: (() => Promise<any>);
  pageSizeChangedFn?: ((...data) => void);
  jumpPrevChangedFn?: ((...data) => void);
  jumpNextChangedFn?: ((...data) => void);
}

/*******************/
/* DTPageInfo      */
/*******************/
export interface DTPageInfo {
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
  startCursor?: string;
  endCursor?: string;
}

/*******************/
/* DTOptions      */
/*******************/
export interface DTOptions {
  showFilter?: boolean;
  showCheckbox?: boolean;
  showIndex?: boolean;
  showPagination?: boolean;
  showPageSize?: boolean;
  pageSize?: number;
  pageSizeOptions?: Array<number>;
  spinningTips?: string;
  actionsWidth?: string;
  actionsFrozenRight?: boolean;
  actionsFrozenRightWidth?: string;
  actionsFrozenScrollRatio?: string;
}
