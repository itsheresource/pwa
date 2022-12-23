import useTimeWindow from 'customHooks/useTimeWindow';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

export const timeWindow = (startTime, urgencyName) => {
  const timeWindow = useTimeWindow(urgencyName);
  return `${startTime}
               -
               ${dayjs(startTime, 'hh:mm')
                 .add(timeWindow, 'hours')
                 .format('HH:mm')}`;
};

timeWindow.propTypes = {
  startTime: PropTypes.string,
  urgencyName: PropTypes.string,
};
