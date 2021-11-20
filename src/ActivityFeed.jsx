import React, { useEffect,useState } from "react";
import axios from "axios";
import "./css/feed.css"
import ActivityButton from "./ActivityButton.jsx";

export default function ActivityFeed() {
  const [activities, setActivities] = useState([]);

  useEffect( () => {
    axios.get("https://aircall-job.herokuapp.com/activities")
      .then(res => {
        setActivities(res.data)
      })
  }, [])

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