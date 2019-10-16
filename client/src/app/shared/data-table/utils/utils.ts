import { getterForName } from './column-helper';

export function isNullOrUndefined(value): boolean {
  return value === null || value === undefined;
}

export function isString(value): boolean {
  return typeof value === 'string';
}

export function isObject(value): boolean {
  return typeof value === 'object';
}

export function isFunction(value): boolean {
  return typeof value === 'function';
}

/**
 * 在对象数组中，根据checkedProp属性找出和基本类型数组array相交的数组；
 * @param array： basic array
 * @param objArray
 * @param checkedProp
 */
export function getIntersectionByCheckedProp(array: any[], objArray: any[], checkedProp: string): Array<any> {
  if (array.length === 0) {
    return [];
  }

  if (objArray.length === 0) {
    return array;
  }

  return array.filter(ele => {
    for (const obj of objArray) {
      if (getterForName(checkedProp)(obj, checkedProp) === ele.toString()) {
        return true;
      }
    }
    return false;
  });
}

/**
 * get difference in basic array
 * @param bigArray
 * @param smallArray
 */
export function getDifferenceInBasicArray(bigArray: any[] = [], smallArray: any[] = []) {
  if (bigArray.length === 0) {
    return [];
  }

  if (smallArray.length === 0) {
    return bigArray;
  }

  return bigArray.filter(x => !smallArray.includes(x));
}
