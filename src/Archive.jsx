import React, { useContext } from "react";
import ActivityFeed from "./ActivityFeed.jsx";
import { stateContext } from "./providers/StateProvider.jsx";

export default function Inbox() {
  const { state } = useContext(stateContext);
  const { archive } = state;
  
  return (
    <ActivityFeed {...archive} />
  )
};