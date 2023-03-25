import React from "react";

function SingleTechCo(props) {

    const techCompany = props.techProp;

    let mapImage = (image) => {
        return image.url
    }

    const techCoImage = techCompany.images?.map(mapImage)

    const onLocalDeleteClicked = (evt) => {
        evt.preventDefault();
        props.onDeleteCompany(techCompany, evt)

    }
    const onLocalModalClicked = (e) => {
        e.preventDefault();
        props.onModal(techCompany, e)

    }

    const onLocalEditCompany = (evt) => {
        evt.preventDefault();
        props.onEditCompany(techCompany, evt)
    }

    return (

        <React.Fragment>
            <div className="bg-secondary card shadow m-2 border border-5" style={{ width: "18rem" }} >
                <img className="card-img-top mt-2 rounded-top" style={{ width: "100%", height: "12vw" }} src={techCoImage?.toString()} alt="Friend" />
                <h3 className="card-title text-center text-white mt-2" ><strong>{techCompany.name}</strong></h3>
                <div className="card-body">
                    <p className="card-text text-center text-white mt-2" style={{ margin: "0" }}>{techCompany.profile}</p>
                    <button type="button" id="editFriend" data-page={`${techCompany.id}`} className="btn btn-warning" onClick={onLocalEditCompany}>Edit</button>
                    <button type="button" className="btn btn-danger m-2" id="deleteFriend" onClick={onLocalDeleteClicked} >Delete</button>
                    <button type="button" className="btn btn-primary m-2" onClick={onLocalModalClicked} >
                        View more
                    </button>
                </div>
            </div>


        </React.Fragment>


    )
}


export default React.memo(SingleTechCo);