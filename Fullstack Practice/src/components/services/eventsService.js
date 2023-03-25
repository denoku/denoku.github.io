import axios from "axios";
import * as helper from "./serviceHelper";


const domain = `https://api.remotebootcamp.dev/api/events`

let getPagedEvents = (pageIndex, pageSize) => {
    console.log("getAll is running");
    const config = {
        method: "GET",
        url: `${domain}/feeds?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
  
    return axios(config).then(helper.onGlobalSuccess);
};

let deleteEventsById = (EventId) => {
  console.log("deleteEventsById is running", EventId);
  const config = {
    method: "DELETE",
    url: `${domain}/${EventId}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
};
console.log("in the middle");
return axios(config).then(() =>{
  
    return EventId;

 })
}
let addEvent = (payload) => {
  console.log("addFriend is running", payload);
  const config = {
      method: "POST",
      url: domain,
      data: payload,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
  };

  return axios(config).then((response) => {
    console.log("This is newly created Id", response.data.item)
   
    payload.id =  response.data.item
    return payload 
  
  });

};

let updateEvent = (id, payload) => {
  console.log("update is running", id, payload);
  const config = {
      method: "PUT",
      url: `${domain}/${id}`,
      data: payload,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
  };

  return axios(config)
//   .then(() =>{
//   return payload;

// })

};

let getEventById = (id) => {
  console.log("getById is running", id);
  const config = {
      method: "GET",
      url: `${domain}/${id}`,
      data: id,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
  };

  return axios(config)

};

let getEventFeeds = () => {
  console.log("getEventFeeds is running");
  const config = {
      method: "GET",
      url: `${domain}/feeds`,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
  };

  return axios(config)

};

let searchEvent = (pi, ps, query) => {
    console.log("search event", query);
    const config = {
        method: "GET",
        url: `${domain}/search?pageIndex=${pi}&pageSize=${ps}&query=${query}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
  
    return axios(config)
  
  };

const eventsService = {getPagedEvents, deleteEventsById, addEvent, updateEvent, getEventById, searchEvent, getEventFeeds}

export default eventsService;





