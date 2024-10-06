export const getMaskedDate = (value: string, prevValue: string) => {
  // при удалении символов возвращаем значение без форматирования
  if (prevValue?.length > value?.length) {
    return value;
  }

  // фильтруем только цифры
  const number = value.replace(/[^0-9]/g, "");

  let res = "";
  for (let i = 0; i < number.length; i++) {
    // ограничиванием количество символов
    if (i > 7) break;

    res += number[i];
    // добавляем точку полсе 2 и 4 цифры
    if (i === 1 || i === 3) {
      res += ".";
    }
  }
  return res;
};
