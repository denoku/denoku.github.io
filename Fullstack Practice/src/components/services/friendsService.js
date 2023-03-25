import axios from "axios";
import * as helper from "./serviceHelper";


const domain = `https://localhost:50001/api/v3/friends`

let getAllFriends = (pageIndex, pageSize) => {
    console.log("getAll is running");
    const config = {
        method: "GET",
        url: `${domain}/paginate/?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
  
    return axios(config).then(helper.onGlobalSuccess);
};

let deleteFriendById = (FriendId) => {
  console.log("deleteFriendById is running", FriendId);
  const config = {
    method: "DELETE",
    url: `${domain}/${FriendId}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
};
console.log("in the middle");
return axios(config).then(() =>{
  
    return FriendId;

 })
}
let addFriend = (payload) => {
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

let updateFriend = (id, payload) => {
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

let getFriendById = (id) => {
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

let searchFrd = (pi, ps, query) => {
    console.log("search friend", query);
    const config = {
        method: "GET",
        url: `${domain}/search?pageIndex=${pi}&pageSize=${ps}&query=${query}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
  
    return axios(config)
  
  };

const friendsService = {getAllFriends, deleteFriendById, addFriend, updateFriend, getFriendById, searchFrd}

export default friendsService;





