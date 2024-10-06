export const getFormattedName = (name: string) => {
  return name
    .replace(/[^а-яА-Яa-zA-Z\s]/g, "") // оставляем только буквы и пробелы
    .replace("  ", " ") // удаляем двойные пробелы
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // делаем каждое слово с большой буквы
    .join(" ");
};
