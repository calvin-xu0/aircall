import React from "react";
import "./css/feed.css"
import ActivityButton from "./ActivityButton.jsx";

export default function ActivityFeed(props) {
  const [...activities] = props;

  // Separate activities by calendar day
  const activitiesByDay = {};
  activities.map( activity => {
    const dateString = (new Date(activity.created_at)).toDateString();
    if (activitiesByDay[`${dateString}`]) {
      activitiesByDay[`${dateString}`].push(activity);
    } else {
      activitiesByDay[`${dateString}`] = [activity];
    }
  });

  const parsedDays = Object.entries(activitiesByDay).map(([day, dayActivities]) => {
    const parsedDayActivities = dayActivities.map(activity => {
      // Exclude archived activities from feed
      if (activity.archived === true) {
        return;
      }
      return (
        <ActivityButton
          key={activity.id}
          {...activity}
        />
      )
    })

    return (
      <div className="day-container">
        <div className="day-date">
          {day}
        </div>
        {parsedDayActivities}
      </div>
    )
  })

  return (
    <div className="container-view">
      {parsedDays}
    </div>
  )
}