export const formatMobile = (num: string) => {
  // Format the string with spaces first, then add leading zero
  const formatted = num.replace(/(\d{3})(?=\d)/g, "$1 ").trim();
  return "0" + formatted;
};