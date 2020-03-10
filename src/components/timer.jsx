import React, { useState, useEffect } from "react";
import styles from "./timer.module.css";

const Timer = ({ endDate }) => {
  // initialize timeLeft with the seconds prop
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  let interval;

  function calculateCountdown(endDate) {
    let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date())) / 1000;

    // clear countdown when date is reached
    if (diff <= 0) return false;

    const timeLeft = {
      years: 0,
      days: 0,
      hours: 0,
      min: 0,
      sec: 0
    };

    // calculate time difference between now and expected date
    if (diff >= 365.25 * 86400) {
      // 365.25 * 24 * 60 * 60
      timeLeft.years = Math.floor(diff / (365.25 * 86400));
      diff -= timeLeft.years * 365.25 * 86400;
    }
    if (diff >= 86400) {
      // 24 * 60 * 60
      timeLeft.days = Math.floor(diff / 86400);
      diff -= timeLeft.days * 86400;
    }
    if (diff >= 3600) {
      // 60 * 60
      timeLeft.hours = Math.floor(diff / 3600);
      diff -= timeLeft.hours * 3600;
    }
    if (diff >= 60) {
      timeLeft.min = Math.floor(diff / 60);
      diff -= timeLeft.min * 60;
    }
    timeLeft.sec = diff;

    return timeLeft;
  }

  const stopInternval = () => {
    clearInterval(interval);
  };

  function addLeadingZeros(value) {
    value = String(value);
    while (value.length < 2) {
      value = "0" + value;
    }
    return value;
  }

  useEffect(() => {
    interval = setInterval(() => {
      const date = calculateCountdown(endDate);
      if (date) {
        setTimeLeft(date);
      } else {
        stopInternval();
      }
    }, 1000);
  }, [timeLeft]);

  return (
    <div className={styles.countdown}>
      <span className={styles.countdownCol}>
        <span className={styles.countdownColElement}>
          <strong>{addLeadingZeros(timeLeft.hours)}</strong>
          <span>Hours</span>
        </span>
      </span>

      <span className={styles.countdownCol}>
        <span className={styles.countdownColElement}>
          <strong>{addLeadingZeros(timeLeft.min)}</strong>
          <span>Min</span>
        </span>
      </span>

      <span className={styles.countdownCol}>
        <span className={styles.countdownColElement}>
          <strong>{addLeadingZeros(timeLeft.sec)}</strong>
          <span>Sec</span>
        </span>
      </span>
    </div>
  );
};

export default Timer;
