import { DTColumn, ValueGetter, DTColumnType } from '../data-table.interface';


function isNullOrUndefined(value): boolean {
  return value === null || value === undefined;
}
/**
 * Sets the column defaults
 */
export function setColumnDefaults(columns: DTColumn[]) {
  if (!columns) {
    return;
  }

  for (const column of columns) {
    if (isNullOrUndefined(column.label) && column.name) {
      column.label = column.name.toUpperCase();
    }

    if (!isNullOrUndefined(column.label) && isNullOrUndefined(column.name)) {
      column.name = column.label.toLowerCase();
    }

    if (!column.$$valueGetter) {
      column.$$valueGetter = getterForName(column.name);
    }

    if (!column.hasOwnProperty('type')) {
      column.type = DTColumnType.text;
    }

    if (!column.hasOwnProperty('disabled')) {
      column.disabled = false;
    }

    if (!column.hasOwnProperty('hidden')) {
      column.hidden = false;
    }
  }
}

export function emptyStringGetter(): string {
  return '';
}

/**
 * column name getter
 * supported 3 rules:
 * 1. name;
 * 2. containing path in name;
 * 3. containing object in name;
 */
export function getterForName(name: string): ValueGetter {
  if (name == null) {
    return emptyStringGetter;
  }

  if (name.indexOf('.') !== -1) {
    return deepValueGetter;
  } else {
    return shallowValueGetter;
  }
}

export function shallowValueGetter(obj: any, name: string): any {
  if (obj === null) {
    return emptyStringGetter();
  }

  if (!obj || !name) {
    return obj;
  }

  const value = obj[name];
  if (value == null) {
    return emptyStringGetter();
  }

  return value;
}

/**
 * Returns a deep object given a string. zoo['animal.type']
 * @param obj object
 * @param path access path
 */
export function deepValueGetter(obj: any, path: string) {
  if (obj === null) {
    return emptyStringGetter();
  }

  if (!obj || !path) {
    return obj;
  }

  // check if path matches a root level field, ex: {"a.b.c": 123}
  let current = obj[path];
  if (current !== undefined) {
    return current;
  }

  current = obj;
  const split = path.split('.');

  if (split.length) {
    for (let i = 0; i < split.length; i++) {
      current = current[split[i]];

      if (isNullOrUndefined(current)) {
        return emptyStringGetter();
      }
    }
  }

  return current;
}

