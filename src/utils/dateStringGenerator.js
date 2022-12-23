import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';

export const dateStringGenerator = (date) => {
  dayjs.extend(relativeTime);
  const end = dayjs(date);
  const dateFromNow = dayjs(end).fromNow();
  if (dateFromNow.indexOf('hours ago') !== -1) return dateFromNow;
  if (dateFromNow === 'a day ago') return 'Yesterday';
  return dayjs(end).format('MMM DD');
};
