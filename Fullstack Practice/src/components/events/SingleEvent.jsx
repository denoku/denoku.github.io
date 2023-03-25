import React from "react";

function SingleEvent(props) {
  const anEvent = props.eventProp;

  // const onLocalFriendClicked = (evt) => {
  //   evt.preventDefault();
  //   props.onFriendClicked(anEvent, evt);
  // };

  // const onLocalEditClicked = (evt) => {
  //   evt.preventDefault();
  //   props.onEditFriend(anEvent, evt);
  // };

  return (
    <React.Fragment>
      <div
        className="bg-dark card shadow m-2 border border-5" style={{ width: "18rem" }}>
        <h5 className="card-title text-center mt-2" style={{ color: "tomato" }}>{anEvent.title} </h5>
        <div className="card-body">
          <p className="card-text text-center mt-2" style={{ color: "tomato", margin: "0" }}>{anEvent.content}</p>
          <p className="card-text text-center mt-2" style={{ color: "tomato", margin: "0" }}>{anEvent.shortDescription}</p>
        </div>
      </div>
    </React.Fragment>
  );
}

export default React.memo(SingleEvent);
