import React, { useState, useEffect } from "react";
import friendsService from "../services/friendsService";
import toastr from "toastr";
import { useLocation, useNavigate, useParams } from "react-router-dom";


function AddFriend() {
    const navigate = useNavigate();
    const { friendId } = useParams();
    const { state } = useLocation();
    const [friendFrmData, setRegisterFrmData] = useState({

        title: "",
        bio: "",
        summary: "",
        headline: "",
        slug: "",
        statusId: "",
        imageTypeId: "",
        imageUrl: "",
        skills: ""


    });
    console.log({ friendId, friendFrmData, state });

    const mapskills = (skill) => {
        return skill.name
    }
    const friendSkills = state?.payload?.skills?.map(mapskills)

    useEffect(() => {
        if (state?.type === "MY_FRIEND")
            setRegisterFrmData((prevstate) => {
                return {
                    ...prevstate, ...state.payload, imageUrl: state.payload.primaryImage.url,
                    imageTypeId: state.payload.primaryImage.typeId, skills: friendSkills?.join(",")
                };
            });

    }, [friendId, state]
    )

    const onFormFieldChanged = event => {
        const target = event.target;

        const newUserValue = target.value;

        const nameOfField = target.name

        setRegisterFrmData((prevstate) => {
            const updatedFormData = { ...prevstate };
            updatedFormData[nameOfField] = newUserValue

            return updatedFormData

        });
    };

    const onAddFriendClicked = (e) => {
        e.preventDefault();

        const payload = {
            title: friendFrmData.title,
            bio: friendFrmData.bio,
            summary: friendFrmData.summary,
            headline: friendFrmData.headline,
            slug: friendFrmData.slug,
            statusId: friendFrmData.statusId,
            imageTypeId: friendFrmData.imageTypeId,
            imageUrl: friendFrmData.imageUrl,
            skills: friendFrmData.skills.split(","),
            id: friendFrmData.id
        }

        if (friendFrmData.id) {
            friendsService
                .updateFriend(friendFrmData.id, payload)
                .then(updateFriendSuccess)
                .catch(updateFriendError)
        }
        else {
            friendsService
                .addFriend(payload)
                .then(addFriendSuccess)
                .catch(addFriendError)
        }
    }

    const addFriendSuccess = (response) => {
        setRegisterFrmData((prevstate) => {
            const addId = { ...prevstate };
            addId.id = response.id

            return addId

        });
        console.log("addFriendSuccess", response.id);
        toastr.success("Add friend successful");
        navigate(`/friends`)
    };

    const addFriendError = (err) => {
        console.log("addFriendError", err);
        toastr.error("Failed to add friend", "Please check fields and try again");
    };

    const updateFriendSuccess = (response) => {
        console.log("updateFriendSuccess", response);
        toastr.success("Update friend success");
        navigate(`/friends`)
    }

    const updateFriendError = (err) => {
        console.log("updateFriendError", err);
        toastr.error("Failed to update friend", "Please check fields and try again");
    }


    return (
        <React.Fragment>
            <div className="container">
                <div className="row justify-content-center">
                    <h2 className="text-center mt-3">{friendFrmData.id ? "Edit Friend" : "Add Friend"}</h2>
                    <div className="col-6">
                        <form id="addFriendInput" className="card p-2 bg-light mt-5">

                            <div className="form-group mt-2">
                                <label className="form-label" htmlFor="addFriendTitle">Title</label>
                                <input type="text" id="addFriendTitle" className="form-control" name={"title"}
                                    value={friendFrmData.title} onChange={onFormFieldChanged} placeholder="Ex. Name" />
                            </div>

                            <div className="form-group mt-2">
                                <label className="form-label" htmlFor="addFriendBio">Bio</label>
                                <input type="text" id="addFriendBio" className="form-control" name={"bio"}
                                    value={friendFrmData.bio} onChange={onFormFieldChanged} placeholder="Ex. Likes cooking" />
                            </div>

                            <div className="form-group mt-2">
                                <label className="form-label" htmlFor="addFriendSummary">Summary</label>
                                <input type="text" id="addFriendSummary" className="form-control" name={"summary"}
                                    value={friendFrmData.summary} onChange={onFormFieldChanged} placeholder="Ex. Want to be a chef" />
                            </div>
                            <div className="form-group mt-2">
                                <label className="form-label" htmlFor="addFriendHeadline">Headline</label>
                                <input type="text" id="addFriendHeadline" className="form-control" name={"headline"}
                                    value={friendFrmData.headline} onChange={onFormFieldChanged} placeholder="Ex. Hello" />
                            </div>
                            <div className="form-group mt-2">
                                <label className="form-label" htmlFor="addFriendSlug">Slug</label>
                                <input type="text" id="addFriendSlug" className="form-control" name={"slug"}
                                    value={friendFrmData.slug} onChange={onFormFieldChanged} placeholder="Url name" />
                            </div>
                            {/* <div className="form-group mt-2">
                        <label className="form-label" htmlFor="addFriendStatusId">Status Id</label>
                        <input type="text" id="addFriendStatusId" className="form-control" name={"statusId"}
                         value={friendFrmData.statusId} onChange={onFormFieldChanged} placeholder="Active" />
                    </div> */}
                            <div className="form-group mt-2">
                                <label className="form-label" htmlFor="addFriendStatusId">Status Id</label>
                                <select type="text" id="addFriendStatusId" className="form-control" name={"statusId"}
                                    value={friendFrmData.statusId} onChange={onFormFieldChanged} placeholder="Active"
                                >
                                    <option defaultValue={"selected"}>Set Status</option>
                                    <option value={"0"}>Not Set</option>
                                    <option value={"1"}>Active</option>
                                    <option value={"3"}>Deleted</option>
                                    <option value={"4"}>Flagged</option>
                                </select>
                            </div>
                            <div className="form-group mt-2">
                                <label className="form-label" htmlFor="addFriendImageTypeId">Image Type</label>
                                <select type="text" id="addFriendImageTypeId" className="form-control" name={"imageTypeId"}
                                    value={friendFrmData.imageTypeId} onChange={onFormFieldChanged} placeholder="Active"
                                >
                                    <option defaultValue={"selected"}>Set Image Type</option>
                                    <option value={"1"}>Seo</option>
                                    <option value={"2"}>Cover</option>
                                    <option value={"3"}>Main</option>
                                    <option value={"4"}>Other</option>
                                    <option value={"5"}>Logo</option>
                                </select>
                            </div>
                            <div className="form-group mt-2">
                                <label className="form-label" htmlFor="addFriendImageUrl">Image Url</label>
                                <input type="text" id="addFriendImageUrl" className="form-control" name={"imageUrl"}
                                    value={friendFrmData.imageUrl} onChange={onFormFieldChanged} />
                            </div>
                            <div className="form-group mt-2">
                                <label className="form-label" htmlFor="addFriendSkills">Skills</label>
                                <div id="addFriendSkills" className="form-text">Please, separate skills with a comma.</div>
                                <input type="text" id="addSkills" className="form-control" name={"skills"}
                                    value={friendFrmData.skills} onChange={onFormFieldChanged} />
                            </div>
                            <button type="submit" className=" col btn btn-primary mt-3 m-md-2" id="cmdSubmit" onClick={onAddFriendClicked}>{friendFrmData.id ? "Edit Friend" : "Add Friend"}</button>


                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default AddFriend;