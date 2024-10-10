/**
 * @param {string} isoFormattedDate - Дата в формате ISO
 * @returns {string} - Форматированная дата и время
 */
export const dateParser = isoFormattedDate => {
  const parsedDate = new Date(isoFormattedDate);

  const readableDate = parsedDate.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const readableTime = parsedDate.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return `${readableDate.slice(0, -3)} в ${readableTime}`;
};
