export const getMaskedPhone = (value: string, prevValue?: string) => {
  // при удалении символов возвращаем значение без форматирования
  if (prevValue && prevValue?.length > value?.length) {
    return value;
  }

  // фильтруем цифры
  const number = value.replace(/[^0-9]/g, "");

  // удаляем 8 и +7 из начала
  const formattedNumber = number
    .replace(/^\+7/, "")
    .replace(/^77/, "")
    .replace(/^7/, "")
    .replace(/^8/, "");

  let result = "";
  for (let i = 0; i < formattedNumber.length; i++) {
    // ограничиваем количество символов
    if (i > 9) break;

    result += formattedNumber[i];
    // подставляем пробелы после 3, 6 и 8 цифры
    if (i === 2 || i === 5 || i === 7) {
      result += " ";
    }
  }
  return "+7 " + result;
};
