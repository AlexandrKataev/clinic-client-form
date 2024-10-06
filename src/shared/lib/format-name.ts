export const formatName = (name: string) => {
  return name
    .replace(/[^а-яА-Яa-zA-Z\s]/g, "")
    .replace("  ", " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
