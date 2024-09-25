import { translateLibrary } from './translate';
/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

/**
 * Функция для получения перевода по ключу, включая вложенные ключи.
 * @param {string} lang - Язык (например, 'ru' или 'en')
 * @param {string} label - Ключ для перевода (например, 'title.main' или 'label')
 * @returns {string} - Переведенная строка
 */
export const translate = (lang, label) => {
  const keys = label.split('.');
  let translation = translateLibrary[lang];

  for (const key of keys) {
    if (translation[key] === undefined) {
      return label;
    }
    translation = translation[key];
  }

  return translation;
};

/**
 * Функция для создания страниц пагинации с многоточием.
 * @param {Array} pages - Массив для хранения объектов страниц
 * @param {number} pagesCount - Общее количество страниц
 * @param {number} currentPage - Текущая страница
 */
export function createPages(pages, pagesCount, currentPage) {
  const addPage = (id, number, disabled = false) => pages.push({ id, number, disabled });
  const addEllipsis = () => addPage(Math.random(), '…', true);

  if (pagesCount <= 1) return;

  if (currentPage > 3 && currentPage < pagesCount) {
    addPage(1, 1);
    addEllipsis();

    for (let i = currentPage - 1; i <= currentPage + 1 && i <= pagesCount; i++) {
      addPage(i, i);
    }

    if (currentPage + 1 < pagesCount) {
      addEllipsis();
      addPage(pagesCount, pagesCount);
    }
  } else if (currentPage === pagesCount) {
    addPage(1, 1);
    addEllipsis();

    for (let i = currentPage - 2; i <= currentPage; i++) {
      addPage(i, i);
    }
  } else if (currentPage === 3) {
    addPage(1, 1);
    for (let i = 2; i <= Math.min(4, pagesCount); i++) {
      addPage(i, i);
    }

    if (pagesCount > 4) {
      addEllipsis();
      addPage(pagesCount, pagesCount);
    }
  } else {
    for (let i = 1; i <= Math.min(3, pagesCount); i++) {
      addPage(i, i);
    }

    if (pagesCount > 3) {
      addEllipsis();
      addPage(pagesCount, pagesCount);
    }
  }
}
