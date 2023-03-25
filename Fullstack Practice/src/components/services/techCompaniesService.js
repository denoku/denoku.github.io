import axios from "axios";
import * as helper from "./serviceHelper"

const domain = `https://localhost:50001/api/techcompanies`

let addTechCo = (payload) => {
    console.log("addJob is running", payload);
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
  }

  let updateTechCo = (payload) => {
    console.log("updateTechCo is running", payload);
    const config = {
        method: "PUT",
        url: `${domain}/${payload.id}`,
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
  
    return axios(config)
  }

  let getTechCo = (pageIndex, pageSize) => {
    console.log("getTechCo is running");
    const config = {
        method: "GET",
        url: `${domain}/paginate/?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
  
    return axios(config).then(helper.onGlobalSuccess)
  }

  let deleteTechCoById = (TechId) => {
    console.log("deleteTechCoById is running", TechId);
    const config = {
      method: "DELETE",
      url: `${domain}/${TechId}`,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
  };
  console.log("in the middle");
  return axios(config).then(() =>{
    
      return TechId;
  
   })
  }

  let searchTechCo = (pi, ps, query) => {
    console.log("searchTechCo", query);
    const config = {
        method: "GET",
        url: `${domain}/search?pageIndex=${pi}&pageSize=${ps}&query=${query}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
  
    return axios(config)
  
  };
const techCompaniesService = {addTechCo, updateTechCo, getTechCo, deleteTechCoById, searchTechCo}

export default techCompaniesService