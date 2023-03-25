import React, { useEffect, useState } from "react";
import eventsService from "../services/eventsService";
import SingleEvent from "../events/SingleEvent";
//import debug from "sabio-debug"; 
//import {Wrapper, Status} from "@googlemaps/react-wrapper";

//import {useLocation } from "react-router-dom";

function Events() {
  //const location = useLocation();

  const [events, setEvents] = useState({
    arrayOfEvents: [],
    eventComponents: [],
    pageIndex: 0,
    pageSize: 1,
    totalCount: 0

  });
  console.log(events.arrayOfEvents)
  useEffect(() => {

    // eventsService
    //   .getEventFeeds()
    //   .then(getEventsSuccess)
    //   .catch(getEventsError)
    eventsService
      .getPagedEvents(events.pageIndex, events.pageSize)
      .then(getEventsSuccess)
      .catch(getEventsError);
  });

  const getEventsSuccess = (data) => {
    //console.log("getEventsSuccess", data.item['430_Weekday']);
    setEvents((prevState) => {
      const newEvents = { ...prevState };
      newEvents.arrayOfEvents = data.item['430_Weekday'];
      newEvents.pageIndex = data.item.pageIndex;
      newEvents.pageSize = data.item.pageSize;
      newEvents.totalCount = data.item.totalCount;

      return newEvents;
    });
  };

  const getEventsError = (response) => {
    console.log("getEventsError", response);
  };

  const mapEvents = (eventData) => {
    return (<SingleEvent key={"EVENT" + eventData.id} eventProp={eventData} />);
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="row justify-content-center d-flex">
            {events.arrayOfEvents.map(mapEvents)}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Events;
