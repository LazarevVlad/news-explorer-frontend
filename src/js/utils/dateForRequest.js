export default function dateForm() {
  const date = new Date();
  const dateFrom = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;
  date.setDate(date.getDate() - 7);
  const dateTo = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;
  return { dateFrom, dateTo };
}
