export function parseToMoney(number, prefix = "RD$") {
  const val = Math.round(parseFloat(number) * 100) / 100;
  const parts = val.toString().split(".");
  return `${prefix}${parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")}${
    parts[1] ? `.${parts[1].padEnd(2, "0")}` : ".00"
  }`;
}
///
