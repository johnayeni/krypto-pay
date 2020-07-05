export function formatMoneyNoCurrency(amount: number) {
  let options: Intl.NumberFormatOptions = {
    style: "decimal",
    minimumFractionDigits: 2,
  };
  const formatter = new Intl.NumberFormat("en-US", options);
  return formatter.format(amount);
}
