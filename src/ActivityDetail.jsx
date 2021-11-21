import React, { useContext } from "react";
import { useParams } from "react-router";
import { stateContext } from "./providers/StateProvider.jsx";

export default function ActivityDetail() {
  const { state } = useContext(stateContext);
  const { inbox, archive } = state;
  const { id } = useParams();

  const activity = inbox[id] || archive[id];
  if (activity === undefined) {
    return (
      <h2>Invalid call</h2>
    )
  }

  const {created_at, direction, from, to, via, duration, is_archived, call_type} = activity;
  const timestamp = (new Date(created_at)).toString();

  return (
    <div className="activity-detail">
      <h2>Call Details</h2>
      <table>
        <tr>
          <td>Timestamp:</td>
          <td>{timestamp}</td>
        </tr>
        <tr>
          <td>Direction:</td>
          <td>{direction}</td>
        </tr>
        <tr>
          <td>From:</td>
          <td>{from}</td>
        </tr>
        <tr>
          <td>To:</td>
          <td>{to}</td>
        </tr>
        <tr>
          <td>Via:</td>
          <td>{via}</td>
        </tr>
        <tr>
          <td>Duration:</td>
          <td>{duration} seconds</td>
        </tr>
        <tr>
          <td>Call Type:</td>
          <td>{call_type}</td>
        </tr>
      </table>
      
    </div>
  )
}