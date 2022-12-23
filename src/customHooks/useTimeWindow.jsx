import React, { useEffect, useState } from 'react';

export default function useTimeWindow(urgency) {
  const [timeWindow, setTimeWindow] = useState(6);

  useEffect(() => {
    let theTimeWindow;

    switch (urgency) {
      case 'Economy':
        theTimeWindow = 6;
        break;
      case 'Regular':
        theTimeWindow = 4;
        break;
      case 'Rush':
        theTimeWindow = 2;
        break;
      case 'Direct':
        theTimeWindow = 1.5;
        break;
      default:
        theTimeWindow = 6;
        break;
    }

    setTimeWindow(theTimeWindow);
  }, [urgency]);

  return timeWindow;
}
