import React from "react";

interface TimeLeft {
  minutes: number;
  seconds: number;
}

export default function useCountdown(date: Date) {
  const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft(date));

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(date));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [date]);

  return timeLeft;
}

const calculateTimeLeft = (date: Date) => {
  let timeLeft: TimeLeft = {
    minutes: 0,
    seconds: 0,
  };
  const currentDate = new Date().getTime();
  const endDate = date.getTime();

  if (endDate > currentDate) {
    const difference = endDate - currentDate;
    timeLeft = {
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};
