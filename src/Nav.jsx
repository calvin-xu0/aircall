import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { stateContext } from "./providers/StateProvider.jsx";

export default function Inbox() {
  const { setActivities } = useContext(stateContext);

  useEffect( () => {
    axios.get("https://aircall-job.herokuapp.com/activities")
      .then(res => {
        setActivities(res.data)
      })
  }, [])

  return (
    <nav>
      <Link to="/">Inbox</Link>
      <Link to="/archive">Archive</Link>
    </nav>
  )
}