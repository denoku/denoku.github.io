import React, {useEffect, useState} from "react";
import "./App.css";
import {Routes, Route, useLocation} from "react-router-dom";
import TestAndAjaxCall from "./components/TestAndAjax";
import Friends from "./components/friends/Friends";
import Home from "./components/Home";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Jobs from "./components/jobs/Jobs";
import Events from "./components/events/Events";
import SiteNav from "./components/SiteNav";
import Footer from "./components/Footer";
import AddFriend from "./components/friends/AddFriend";
import AddJob from "./components/jobs/AddJob";
import AddTechCo from "./components/techcompanies/AddTechCo";
import usersService from "./components/services/usersService";
import TechCo from "./components/techcompanies/TechCo";

function App() {
  //const {user} = useParams();
  const {state} = useLocation();   
 const [currentUser, setCurrentUser] = useState(
  {
    firstName: "",
    lastName: "",
    email: "",
    avatarUrl: "",
    isLoggedIn: false
 })

 useEffect(() => {
  console.log(state)
    if(state?.type === "CURRENT_USER")
    setCurrentUser ((prevstate) =>{
        return {...prevstate, ...state.payload, isLoggedIn: true};
    });
    else if(state?.type === "LOGGED_OUT")
    setCurrentUser ((prevstate) =>{
      return {...prevstate, ...state.payload};
    })

     else if(currentUser.isLoggedIn === false) usersService.getCurrentUser().then(getCurrentUserSuccess).catch(getCurrentUserError)
 },[currentUser, state]
)
const getCurrentUserSuccess =(data) =>{
  console.log("getCurrentUserSuccess", data.item.id);
  const userId = data.item.id
  usersService.getUserById(userId).then(getUserByIdSuccess).catch(getUserByIdError)
  
}

const getCurrentUserError =(err) =>{
  console.log("getCurrentUserError", err);
}

const getUserByIdSuccess =(data) =>{
  console.log("getUserByIdSuccess", data.item);
  setCurrentUser ((prevstate) =>{
    const userInfo = {...prevstate}
    userInfo.isLoggedIn = data.item.isConfirmed
    userInfo.firstName = data.item.firstName
    userInfo.lastName = data.item.lastName
    userInfo.email = data.item.email
    userInfo.avatarUrl = data.item.avatarUrl
    return userInfo
});
  
}

const getUserByIdError =(err) =>{
  console.log("getUserByIdError", err);
}

  return (
    <React.Fragment>
  <SiteNav user={currentUser} />
      <Routes>
        <Route path="/friends" element={<Friends />}></Route>
        <Route path="/testajax" element={<TestAndAjaxCall />}></Route>
        <Route path="/" element={<Home fn={currentUser.firstName} ln={currentUser.lastName} avatar={currentUser.avatarUrl} />}></Route>
        <Route path="/login" element={<Login user={currentUser} />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/events" element={<Events />}></Route>
        <Route path="/jobs" element={<Jobs />}></Route>
        <Route path="/techCompanies" element={<TechCo />}></Route>
        <Route path="/techCompanies/new" element={<AddTechCo />}></Route>
        <Route path="/friends/new" element={<AddFriend />}></Route>
        <Route path="/friends/:friendId" element={<AddFriend />}></Route>
        <Route path="/jobs/new" element={<AddJob />}></Route>
        <Route path="/jobs/:jobId" element={<AddJob />}></Route>
      </Routes>
      <Footer></Footer>
    </React.Fragment>
  );
}

export default App;
