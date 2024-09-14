const propNames = new Set(['id', 'className', 'textContent', 'onclick']);

/**
 * Создание элемента со свойствами и вложенными элементами
 * @param name {String} Название HTML тега
 * @param props {Object} Свойства и атрибуты элемента
 * @param children {...Node} Вложенные элементы
 * @returns {HTMLElement}
 */
export function createElement(name, props = {}, ...children) {
  const element = document.createElement(name);

  // Назначение свойств и атрибутов
  for (const name of Object.keys(props)) {
    if (propNames.has(name)) {
      element[name] = props[name];
    } else {
      element.setAttribute(name, props[name]);
    }
  }

  // Вставка вложенных элементов
  for (const child of children) {
    element.append(child);
  }

  return element;
}

export const getPluralizedCount = count => {
  const isInLowRange = count % 10 >= 2 && count % 10 <= 4;
  const isInSpecialRange = count % 100 >= 11 && count % 100 <= 19;

  if (isInLowRange && !isInSpecialRange) {
    return `${count} раза`;
  }

  return `${count} раз`;
};

export const getMaxCode = arr => arr.reduce((max, item) => Math.max(max, item.code) + 1, 0);
