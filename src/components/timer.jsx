import React, { useState, useEffect, useRef } from "react";
import styles from "./timer.module.scss";
const remote = window.require("electron").remote;

const Timer = ({ endDate, resetTimer }) => {
  // initialize timeLeft with the seconds prop
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const setProgress = value => {
    win.setProgressBar(value);
  };

  let originalDiff = useRef(0);
  function calculateCountdown(endDate) {
    let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date())) / 1000;
    if (originalDiff.current === 0) {
      originalDiff.current = diff;
    }

    var calcDiff = 1 - diff / originalDiff.current;
    setProgress(calcDiff);

    // clear countdown when date is reached
    if (diff <= 0) return false;

    const timeLeft = {
      years: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
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
      timeLeft.minutes = Math.floor(diff / 60);
      diff -= timeLeft.minutes * 60;
    }
    timeLeft.seconds = diff;

    return timeLeft;
  }

  function addLeadingZeros(value) {
    value = String(value);
    while (value.length < 2) {
      value = "0" + value;
    }
    return value;
  }

  useEffect(() => {
    console.log("use effect");

    if (timeLeft !== false) {
      setTimeout(() => {
        const date = calculateCountdown(endDate);
        setTimeLeft(date);
        if (date === false) {
          console.log("notification");
          new Notification("Stretch time!!", {
            body: "Time to stretch boy!"
          });
          resetTimer();
          setProgress(10);
          setTimeout(() => {
            setProgress(-1);
          }, 5000);
        }
      }, 1000);
    }
  }, [timeLeft, endDate, resetTimer]);

  const win = remote.getCurrentWindow();

  return (
    <div className={styles.countdown}>
      <span className={styles.countdownCol}>
        <span className={styles.countdownColElement}>
          <strong>
            {timeLeft.hours ? addLeadingZeros(timeLeft.hours) : "00"}
          </strong>
          <span>Hours</span>
        </span>
      </span>

      <span className={styles.countdownCol}>
        <span className={styles.countdownColElement}>
          <strong>
            {timeLeft.minutes ? addLeadingZeros(timeLeft.minutes) : "00"}
          </strong>
          <span>Min</span>
        </span>
      </span>

      <span className={styles.countdownCol}>
        <span className={styles.countdownColElement}>
          <strong>
            {timeLeft.seconds ? addLeadingZeros(timeLeft.seconds) : "00"}
          </strong>
          <span>Sec</span>
        </span>
      </span>
    </div>
  );
};

export default Timer;
