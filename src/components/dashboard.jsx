import React, { useState } from "react";
import styles from "./dashboard.module.css";
import Timer from "./timer";

const Dashboard = () => {
  Date.prototype.addHours = function(h) {
    this.setTime(this.getTime() + h * 60 * 60 * 1000);
    return this;
  };

  const [showTimer, setShowTimer] = useState(false);

  return (
    <div className={styles.root}>
      {!showTimer && (
        <button onClick={() => setShowTimer(true)}>Start session</button>
      )}
      {showTimer && <Timer endDate={new Date().addHours(1)} />}
    </div>
  );
};

export default Dashboard;
