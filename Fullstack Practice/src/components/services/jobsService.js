import axios from "axios";
import * as helper from "./serviceHelper";

let getAllJobs = (pageIndex, pageSize) => {
    console.log("getAllJobs is running");
    const config = {
        method: "GET",
        url: `https://api.remotebootcamp.dev/api/jobs?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
  
    return axios(config).then(helper.onGlobalSuccess);
};

let deleteJobById = (jobId) => {
  console.log("deleteJobById is running", jobId);
  const config = {
    method: "DELETE",
    url: `https://api.remotebootcamp.dev/api/jobs/${jobId}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
};
console.log("in the middle");
return axios(config).then(() =>{
  
    return jobId;

 })
}
let addJob = (payload) => {
  console.log("addJob is running", payload);
  const config = {
      method: "POST",
      url: `https://api.remotebootcamp.dev/api/jobs/`,
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

let updateJob = (payload) => {
  console.log("updateJob is running", payload);
  const config = {
      method: "PUT",
      url: `https://api.remotebootcamp.dev/api/jobs/${payload.id}`,
      data: payload,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
  };

  return axios(config)
//   .then(() =>{
//   return payload;

// })

};

let getJobById = (id) => {
  console.log("getJobById is running", id);
  const config = {
      method: "GET",
      url: `https://api.remotebootcamp.dev/api/jobs/${id}`,
      data: id,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
  };

  return axios(config)

};

let searchJob = (pi, ps, query) => {
    console.log("searchJob", query);
    const config = {
        method: "GET",
        url: `https://api.remotebootcamp.dev/api/jobs/search?pageIndex=${pi}&pageSize=${ps}&searchTerm=${query}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
  
    return axios(config).then(helper.onGlobalSuccess);
  
  };

const jobsService = {getAllJobs, deleteJobById, addJob, updateJob, getJobById, searchJob}

export default jobsService;

