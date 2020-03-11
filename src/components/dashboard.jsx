import React, { useState } from "react";
import styles from "./dashboard.module.scss";
import Timer from "./timer";

const Dashboard = () => {
  // eslint-disable-next-line
  Date.prototype.addHours = function(h) {
    this.setTime(this.getTime() + h * 60 * 60 * 1000);
    return this;
  };
  // eslint-disable-next-line
  Date.prototype.addMinutes = function(m) {
    this.setTime(this.getTime() + m * 60 * 1000);
    return this;
  };
  // eslint-disable-next-line
  Date.prototype.addSeconds = function(s) {
    this.setTime(this.getTime() + s * 1000);
    return this;
  };

  const [showTimer, setShowTimer] = useState(false);

  return (
    <div className={styles.center}>
      <div className={styles.frostedGlass}>
        <div className={`${styles.center} ${styles.container}`}>
          {!showTimer && (
            <button
              className={styles.button}
              onClick={() => setShowTimer(true)}
            >
              Start session
            </button>
          )}
          {showTimer && (
            <Timer
              endDate={new Date().addMinutes(1)}
              resetTimer={() => setShowTimer(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
