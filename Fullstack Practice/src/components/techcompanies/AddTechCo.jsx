import React, {useState, useEffect} from "react";
import toastr from "toastr";
import techCompaniesService from "../services/techCompaniesService";
import {useLocation, useNavigate, useParams} from "react-router-dom";



function AddTechCo() {
const navigate = useNavigate();
const {techId} = useParams();
const {state} = useLocation();    
const [techCoFrmData, setTechCoFrmData] = useState({

    name: "",
    profile: "",
    summary: "",
    headline: "",
    contactInformation: "",
    slug: "",
    statusId: 0,
    typeId: 0,
    url: "",
    urls: "",
    tags: "",
    friendIds:0
 });

 const mapUrls = (url) =>{
    return url.name
}
const techUrls = state?.payload?.urls?.map(mapUrls)

const mapTags = (tag) =>{
    return tag.name
}
const techTags = state?.payload?.tags?.map(mapTags)

// const mapImageId = (image) =>{
//     return image.typeId
// }
const techImageId = state?.payload?.images[0].typeId

// const mapImageUrl = (image) =>{
//     return image.url
// }
const techImageUrl = state?.payload?.images[0].url

const mapFriendIds = (friendId) =>{
    return friendId.id
}
const techFriendId = state?.payload?.friendIds?.map(mapFriendIds)
console.log(techFriendId);
 useEffect(() => {
    if(state?.type === "MY_TECHCO")
    setTechCoFrmData ((prevstate) =>{
        return {...prevstate, ...state.payload, urls: techUrls.join(",")
    ,tags:techTags.join(","), typeId:techImageId, url: techImageUrl, friendIds: techFriendId?.join(",")};
    });
       
},[techId, state]
)


const onFormFieldChanged = event =>{
    const target = event.target;

    const newUserValue = target.value;

    const nameOfField = target.name

    setTechCoFrmData((prevstate) =>{
    const updatedFormData = {...prevstate};
    updatedFormData[nameOfField] = newUserValue

    return updatedFormData
 
 });
};

 const onAddTechCoClicked = (e) =>{
    e.preventDefault();
    
    const payload = {
        name: techCoFrmData.name,
        profile: techCoFrmData.profile,
        summary: techCoFrmData.summary,
        headline: techCoFrmData.headline,
        contactInformation: techCoFrmData.contactInformation,
        slug: techCoFrmData.slug,
        statusId: techCoFrmData.statusId,
        images:[{
        typeId: techCoFrmData.typeId,
        url: techCoFrmData.url,
        }],
        urls: techCoFrmData.urls.split(","),
        tags: techCoFrmData.tags.split(","),
        friendIds:techCoFrmData.friendIds.split(",").map(id => parseInt(id)),
        id: techCoFrmData.id
    }
console.log(payload.friendIds);
    if(techCoFrmData.id){
        techCompaniesService
        .updateTechCo(payload)
        .then(updateTechCoSuccess)
        .catch(updateTechCoError)
    }
   else{
    techCompaniesService
        .addTechCo(payload)
        .then(addTechCoSuccess)
        .catch(addTechCoError)
   }
 }

 const addTechCoSuccess = (response) =>{
    setTechCoFrmData((prevstate) =>{
        const addId = {...prevstate};
        addId.id = response.id
    
        return addId
     
     });
    console.log("addTechCoSuccess", response.id);
    toastr.success("Tech Company added successfully");
    navigate(`/techcompanies`);
 };

 const addTechCoError = (err) =>{
    console.log("addTechCoError", err);
    toastr.error("Failed to add Tech Company", "Please check fields and try again");
 };

 const updateTechCoSuccess = (response) =>{
    console.log("updateTechCoSuccess", response);
    toastr.success("Tech Company updated successfully");
    navigate(`/techcompanies`);
 }

 const updateTechCoError = (err) =>{
        console.log("updateTechCoError", err);
        toastr.error("Failed to update Tech Company", "Please check fields and try again");
 }
 

    return (
        <React.Fragment>
           <div className="container">
        <div className="row justify-content-center">
            <h2 className="text-center mt-3">{techCoFrmData.id ? "Edit Tech Company" : "Add Tech Company"}</h2>
            <div className="col-6">
                <hr/>
                <form id="addTechCoInput">
                    <div className="form-group mt-2">
                        <label className="form-label" htmlFor="addTechCoName">Tech Company Name</label>
                        <input type="text" id="addTechCoName" className="form-control" name={"name"}
                         value={techCoFrmData.name} onChange={onFormFieldChanged}  placeholder="Ex. Name" />
                    </div>

                    <div className="form-group mt-2">
                        <label className="form-label" htmlFor="techCoProfile">Tech Company Profile</label>
                        <input type="text" id="addTechCoProfile" className="form-control"  name={"profile"}
                         value={techCoFrmData.profile} onChange={onFormFieldChanged} placeholder="Ex. Likes cooking" />
                    </div>

                    <div className="form-group mt-2">
                        <label className="form-label" htmlFor="techCoSummary">Tech Company Summary</label>
                        <input type="text" id="addTechCoSummary" className="form-control" name={"summary"}
                        value={techCoFrmData.summary} onChange={onFormFieldChanged} placeholder="Ex. Want to be a chef" />
                    </div>
                    <div className="form-group mt-2">
                        <label className="form-label" htmlFor="techCoHeadline">Tech Company Headline</label>
                        <input type="text" id="addTechCoHeadline" className="form-control" name={"headline"}
                        value={techCoFrmData.headline} onChange={onFormFieldChanged} placeholder="Ex. Hello" />
                    </div>
                    <div className="form-group mt-2">
                        <label className="form-label" htmlFor="contactInformation">Tech Company Contact Information</label>
                        <input type="text" id="contactInformation" className="form-control" name={"contactInformation"}
                        value={techCoFrmData.contactInformation} onChange={onFormFieldChanged} placeholder="Ex. Hello" />
                    </div>
                    <div className="form-group mt-2">
                        <label className="form-label" htmlFor="techCoSlug">Slug</label>
                        <input type="text" id="addTechCoSlug" className="form-control" name={"slug"}
                         value={techCoFrmData.slug} onChange={onFormFieldChanged} placeholder="Url name" />
                    </div>
                    <div className="form-group mt-2">
                        <label className="form-label" htmlFor="techCoStatusId">Status Id</label>
                        <input type="text" id="addTechCoStatusId" className="form-control" name={"statusId"}
                         value={techCoFrmData.statusId} onChange={onFormFieldChanged} placeholder="Active" />
                    </div>
                    <div className="form-group mt-2">
                        <label className="form-label" htmlFor="imageTypeId">Image Type Id</label>
                        <select id="typeId" className="form-control" name="typeId"
                        value={techCoFrmData.typeId} onChange={onFormFieldChanged}
                        >
                        <option defaultValue={"selected"}>Select your image type</option> 
                        <option value={"1"}>Seo</option>
                        <option value={"2"}>Cover</option>
                        <option value={"3"}>Main</option>
                        <option value={"4"}>Other</option> 
                        <option value={"5"}>Logo</option>
                        </select>
                    </div>
                    <div className="form-group mt-2">
                        <label className="form-label" htmlFor="url">Image Url</label>
                        <input type="text" id="imageUrl" className="form-control" name="url"
                        value={techCoFrmData.url} onChange={onFormFieldChanged} />
                    </div>
                    <div className="form-group mt-2">
                        <label className="form-label" htmlFor="urls">Urls</label>
                        <input type="text" id="urls" className="form-control" name="urls"
                        value={techCoFrmData.urls} onChange={onFormFieldChanged} />
                    </div>
                    <div className="form-group mt-2">
                        <label className="form-label" htmlFor="tags">Tags</label>
                        <input type="text" id="tags" className="form-control" name="tags"
                        value={techCoFrmData.tags} onChange={onFormFieldChanged} />
                    </div>
                    <div className="form-group mt-2">
                        <label className="form-label" htmlFor="friendIds">Friend Id's</label>
                        <input type="text" id="friendIds" className="form-control" name="friendIds"
                        value={techCoFrmData.friendIds} onChange={onFormFieldChanged} />
                    </div>
                   
                   
                    <button type="submit" className=" btn btn-primary mt-3" id="cmdSubmit" onClick={onAddTechCoClicked}>{techCoFrmData.id ? "Edit Tech Company" : "Add Tech Company"}</button>


                </form>
            </div>
        </div>
    </div>
        </React.Fragment>
    )
}

export default AddTechCo;