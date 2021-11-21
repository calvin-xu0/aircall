import React, { createContext, useReducer } from "react";

const SET_ARCHIVE_STATUS = "SET_ARCHIVE_STATUS";
const SET_ACTIVITIES = "SET_ACTIVITIES";

export const stateContext = createContext();

export default function StateProvider(props) {
  const [state, dispatch] = useReducer(reducer,
    {
      inbox: {},
      archive: {}
    }
  );

  const setActivities = activities => dispatch({type: SET_ACTIVITIES, value: activities});
  const setArchiveStatus = activity => dispatch({type: SET_ARCHIVE_STATUS, value: activity});

  function reducer(state, action) {
    switch (action.type) {
      case SET_ACTIVITIES:
        const inboxDispatch = {};
        const archiveDispatch = {};
        action.value.map(activity => {
          activity.is_archived === false ? inboxDispatch[activity.id] = activity : archiveDispatch[activity.id] = activity;
        })

        return ({
          ...state,
          inbox: inboxDispatch,
          archive: archiveDispatch
        })
      case SET_ARCHIVE_STATUS:
        const updatedActivity = {...action.value, is_archived: !action.value.is_archived};
        if (state.inbox[action.value.id]) {
          const archivedInbox = {...state.inbox};
          delete archivedInbox[action.value.id];
          return ({
            ...state,
            inbox: archivedInbox,
            archive: {...state.archive, [`${action.value.id}`]: updatedActivity}
          })
        } else {
          const unarchivedArchive = {...state.archive};
          delete unarchivedArchive[action.value.id];
          return ({
            ...state,
            inbox: {...state.inbox, [`${action.value.id}`]: updatedActivity},
            archive: unarchivedArchive
          })
        }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }
  
  const providerData = {
    state,
    setActivities,
    setArchiveStatus
  }

  return (
    <stateContext.Provider value={providerData}>
      {props.children}
    </stateContext.Provider>
  );
}