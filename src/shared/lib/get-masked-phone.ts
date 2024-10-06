export const getMaskedPhone = (value: string, prevValue: string) => {
  // при удалении символов возвращаем значение без форматирования
  if (prevValue?.length > value?.length) {
    return value;
  }

  // фильтруем цифры, удаляем 8 и +7 из начала
  const number = value
    .replace(/^\+7/, "")
    .replace(/^8/, "")
    .replace(/[^0-9]/g, "");

  let result = "";
  for (let i = 0; i < number.length; i++) {
    // ограничиваем количество символов
    if (i > 9) break;

    result += number[i];
    // подставляем пробелы после 3, 6 и 8 цифры
    if (i === 2 || i === 5 || i === 7) {
      result += " ";
    }
  }
  return result;
};
