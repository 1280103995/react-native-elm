//制保留2位小数，如：2，会在2后面补上00.即2.00
export function toDecimal2(x) {
  let ff = parseFloat(x);
  if (isNaN(ff)) {
    return false;
  }
  let f = Math.round(x * 100) / 100;
  let s = f.toString();
  let rs = s.indexOf('.');
  if (rs < 0) {
    rs = s.length;
    s += '.';
  }
  while (s.length <= rs + 2) {
    s += '0';
  }
  return s;
}