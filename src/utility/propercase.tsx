export const toProperCase = (text: string | null | undefined) => {
  if (!text) return "";
  return text.replace(
    /\w\S*/g,
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
};
