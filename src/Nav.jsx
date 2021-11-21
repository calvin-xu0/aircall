import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

import { stateContext } from "./providers/StateProvider.jsx";
import './css/nav.css';

export default function Inbox() {
  const { setActivities } = useContext(stateContext);

  useEffect( () => {
    axios.get("https://aircall-job.herokuapp.com/activities")
      .then(res => {
        setActivities(res.data)
      })
  }, [])

  const navClass = ({isActive}) => [`nav-link`, isActive ? `nav-active` : ``].join(' ');

  return (
    <nav className="nav-bar">
      <NavLink className={navClass} to="/">Inbox</NavLink>
      <NavLink className={navClass} to="/archive">Archive</NavLink>
    </nav>
  )
}