import React from "react";
import PropTypes from "prop-types";

function ASingleFriend(props) {

    const aFriend = props.aFriendProp


    const onLocalFriendClicked = (evt) => {
        evt.preventDefault();
        props.onFriendClicked(aFriend, evt)

    }

    const onLocalEditClicked = (evt) => {
        evt.preventDefault();
        props.onEditFriend(aFriend, evt)
    }


    return (
        <React.Fragment>
            <div className="bg-dark card shadow m-2 border border-5" style={{ width: "18rem" }} >
                <img className="card-img-top mt-2 rounded-top" style={{ width: "100%", height: "12vw" }} src={aFriend.primaryImage.url} alt="Friend" />
                <h5 className="card-title text-center mt-2" style={{ color: "tomato" }} >{aFriend.title}</h5>
                <div className="card-body">
                    <p className="card-text text-center mt-2" style={{ color: "tomato", margin: "0" }}>{aFriend.headline}</p>
                    <p className="card-text text-center mt-2" style={{ color: "tomato", margin: "0" }}>{aFriend.summary}</p>
                    <button type="button" id="editFriend" data-page={`${aFriend.id}`} className="btn btn-warning" onClick={onLocalEditClicked}>Edit</button>
                    <button type="button" className="btn btn-danger m-2" id="deleteFriend" onClick={onLocalFriendClicked} >Delete</button>
                </div>
            </div>
        </React.Fragment>
    )
}

ASingleFriend.propTypes = {
    friend: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        headline: PropTypes.string.isRequired,
        summary: PropTypes.string.isRequired

    })
};

export default React.memo(ASingleFriend);