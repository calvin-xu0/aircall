import React from "react";
import "./css/activityButton.css";

export default function ActivityButton(props) {
  const {created_at, direction, from, to} = props;

  const dateObj = new Date(created_at);
  const [hour, minute] = [dateObj.getUTCHours(), dateObj.getMinutes()];

  return (
    <div className="activity-button">
      <div className="activity-direction">
        {direction === "outbound" && "O" || direction === "inbound" && "I"}
      </div>
      <div className="activity-summary">
        <div className="activity-from">
          {from}
        </div>
        <div>
          tried to call on {to}
        </div>
      </div>
      <div className="activity-time">
        {(hour > 12 ? `${hour - 12}` : `${hour}`) + `:${minute}`}
        <span className="time-suffix">
          {hour > 12 ? "PM" : "AM"}
        </span>
      </div>
    </div>
  )
};