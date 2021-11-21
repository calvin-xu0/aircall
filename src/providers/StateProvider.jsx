import React, { createContext, useReducer } from "react";

const CHANGE_ARCHIVE_STATUS = "CHANGE_ARCHIVE_STATUS";
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
  const changeArchiveStatus = activity => dispatch({type: CHANGE_ARCHIVE_STATUS, value: activity});

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
      case CHANGE_ARCHIVE_STATUS:
        if (inbox[action.value.id]) {
          const archivedInbox = {...state.inbox};
          delete archivedInbox[action.value.id];
          return ({
            ...state,
            inbox: {archivedInbox},
            archive: {...state.archive, [`${action.value.id}`]: action.value}
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
    changeArchiveStatus
  }

  return (
    <stateContext.Provider value={providerData}>
      {props.children}
    </stateContext.Provider>
  );
}