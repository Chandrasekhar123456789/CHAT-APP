export function prettyMoney(n) {
  try {
    return n.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
  } catch {
    return n;
  }
}
