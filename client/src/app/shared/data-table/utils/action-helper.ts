import { DTAction, DTActionType } from './../data-table.interface';
import { isNullOrUndefined } from './utils';

/**
 * Set the default value of action
 */
export function setActionsDefault(actions: DTAction[]) {
  if (!actions) {
    return;
  }

  for (const action of actions) {

    if (!action.hasOwnProperty('type')) {
      action.type = DTActionType.text;
    }

    if (!action.hasOwnProperty('popOptions')) {
      action.popOptions = {
        title: '确认删除？',
        okText: '确定',
        cancelText: '取消'
      };
    }
  }
}
