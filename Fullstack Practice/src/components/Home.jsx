import React from "react";

function Home(props) {

  return (
    <React.Fragment>
      <div className="row justify-content-center">
      <h1 className="text-center">Welcome {props.fn + " " + props.ln}</h1>
      <img  src={`${props.avatar}`}
      style={{width:"300px", height:"200px"}}
      className="d-inline-block align-top"
      alt="userAvatar" />
      </div>
    </React.Fragment>
  );
}

export default Home;
