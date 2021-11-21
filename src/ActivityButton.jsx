import React from "react";
import { NavLink } from "react-router-dom";
import "./css/activityButton.css";

export default function ActivityButton(props) {
  const {id, created_at, direction, from, to, call_type} = props;

  const dateObj = new Date(created_at);
  const [hour, minute] = [dateObj.getUTCHours(), dateObj.getMinutes()];

  const activityClass = () => {
    const output = ["activity-direction"];
    output.push(`activity-${call_type}`)
    console.log(output)
    return output.join(' ');
  }

  return (
    <NavLink to={`/activity/${id}`} className="activity-button">
      <div className={activityClass()}>
        {direction === "outbound" && "📞→" || direction === "inbound" && "📞←"}
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
    </NavLink>
  )
};