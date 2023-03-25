import React from "react";


function ASingleJob (props){

    const aJob = props.aJobProp
    //console.log(aJob)

    let mapImage = (image) =>{
        return image.imageUrl
    }
    
    const jobImage = aJob.techCompany?.images.map(mapImage)
    
    const onLocalModalClicked = (e) =>{
        e.preventDefault();
        props.onModal(aJob, e)
        
    }

    const onLocalEditClicked = (evt) =>{
        evt.preventDefault();
        props.onEditFriend(aJob, evt)
    }


    return  (
    <React.Fragment>
    <div className="bg-white card shadow m-2 border border-5" style={{width:"18rem"}} >
    <img className="card-img-top mt-2 rounded-top" style={{width: "100%", height: "12vw"}} src={jobImage?.toString()} alt="Friend" />
    <h5 className="card-title text-center mt-2" style={{color: "tomato"}} >{aJob.title}</h5>
    <div className="card-body">
        <p className="card-text text-center mt-2" style={{color: "tomato", margin:"0"}}>{`$${aJob.pay}`}</p>
        <button type="button" id="editFriend" data-page={`${aJob.id}`} className="btn btn-warning" onClick={onLocalEditClicked}>Edit</button>
        <button type="button" className="btn btn-primary m-2" onClick={onLocalModalClicked} >
        View more
        </button>
    </div>
    </div>
    
    
    </React.Fragment>
    )
 }


export default React.memo(ASingleJob);