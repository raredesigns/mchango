export const currencyNumber = (
  value: number,
  options?: Intl.NumberFormatOptions
) => {
  if (
    typeof Intl == "object" &&
    Intl &&
    typeof Intl.NumberFormat == "function"
  ) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "TZS",
      ...options,
    }).format(value);
  }

  return value.toString();
};

export const thousandSeparator = (
  value: number,
  options?: Intl.NumberFormatOptions
) => {
  if (
    typeof Intl == "object" &&
    Intl &&
    typeof Intl.NumberFormat == "function"
  ) {
    return new Intl.NumberFormat("en-US", {
      useGrouping: true, // Enable thousand separator
      ...options,
    }).format(value);
  }

  return value.toString();
};
