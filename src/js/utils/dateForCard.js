export default function formatDate(date) {
  const time = new Date(date);
  const months = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июня',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];
  let month = time.getMonth();
  month = months[month];
  return `${time.getDate()} ${month} ${time.getFullYear()}`;
}
