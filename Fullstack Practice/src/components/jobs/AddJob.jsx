import React, {useState, useEffect} from "react";
import jobsService from "../services/jobsService";
import toastr from "toastr";
import { useLocation, useParams } from "react-router-dom";


function AddJob() {
 const {jobId} = useParams();
 const {state} = useLocation();   
 const [jobFrmData, setJobFrmData] = useState({

    title: "",
    description: "",
    summary: "",
    pay: "",
    slug: "",
    statusId: "",
    techCompanyId: 0,
    skills: ""


 });
//console.log({jobId, jobFrmData, state});

  const mapskills = (skill) =>{
        return skill.name
    }
  const jobSkills = state?.payload?.skills?.map(mapskills)
    //console.log(jobSkills);
 useEffect(() => {
    if(state?.type === "MY_JOB")
    setJobFrmData ((prevstate) =>{
        return {...prevstate, ...state.payload, skills: jobSkills.join(" , "), techCompanyId: state.payload.techCompany.id};
    });
       
},[jobId, state]
)

const onFormFieldChanged = event =>{
    const target = event.target;

    const newUserValue = target.value;

    const nameOfField = target.name

 setJobFrmData((prevstate) =>{
    const updatedFormData = {...prevstate};
    updatedFormData[nameOfField] = newUserValue

    return updatedFormData
 
 });
};

 const onAddJobClicked = (e) =>{
    e.preventDefault();
  
    const payload = {
        title: jobFrmData.title,
        description: jobFrmData.description,
        summary: jobFrmData.summary,
        pay: jobFrmData.pay,
        slug: jobFrmData.slug,
        statusId: jobFrmData.statusId,
        techCompanyId: jobFrmData.techCompanyId,
        skills: [jobFrmData.skills],
        id: jobFrmData.id
    }
    if(jobFrmData.id){
        jobsService
        .updateJob(payload)
        .then(updateJobSuccess)
        .catch(updateJobError)
    }
   else{    
   
    jobsService
        .addJob(jobFrmData)
        .then(addJobSuccess)
        .catch(addJobError)
   }
 }

 const addJobSuccess = (response) =>{
    setJobFrmData((prevstate) =>{
        const addId = {...prevstate};
        addId.id = response.id
    
        return addId
     
     });
    console.log("addJobSuccess", response.id);
    toastr.success("Job added successfully");
 };

 const addJobError = (err) =>{
    console.log("addJobError", err);
    toastr.error("Failed to add job", "Please check fields and try again");
 };

 const updateJobSuccess = (response) =>{
    console.log("updateJobSuccess", response);
    toastr.success("Job updated successfully");
 }

 const updateJobError = (err) =>{
        console.log("updateJobError", err);
        toastr.error("Failed to update job", "Please check fields and try again");
 }
 

    return (
        <React.Fragment>
           <div className="container">
        <div className="row justify-content-center">
            <h2 className="text-center mt-3">{jobFrmData.id ? "Edit Job" : "Add Job"}</h2>
            <div className="col-6">
                <hr/>
                <form id="addJobInput">
                    <div className="form-group mt-2">
                        <label className="form-label" htmlFor="addJobTitle">Role</label>
                        <input type="text" id="addJobTitle" className="form-control" name={"title"}
                         value={jobFrmData.title} onChange={onFormFieldChanged}  placeholder="Ex. Developer" />
                    </div>

                    <div className="form-group mt-2">
                        <label className="form-label" htmlFor="addJobDescription"> Job Description</label>
                        <input type="text" id="addJobDescription" className="form-control"  name={"description"}
                         value={jobFrmData.description} onChange={onFormFieldChanged} placeholder="Ex. Likes cooking" />
                    </div>

                    <div className="form-group mt-2">
                        <label className="form-label" htmlFor="addJobSummary">Job Summary</label>
                        <input type="text" id="addJobSummary" className="form-control" name={"summary"}
                        value={jobFrmData.summary} onChange={onFormFieldChanged} placeholder="Ex. Want to be a chef" />
                    </div>
                    <div className="form-group mt-2">
                        <label className="form-label" htmlFor="addJobPay">Pay</label>
                        <input type="text" id="addJobPay" className="form-control" name={"pay"}
                        value={jobFrmData.pay} onChange={onFormFieldChanged} placeholder="Ex. Hello" />
                    </div>
                    <div className="form-group mt-2">
                        <label className="form-label" htmlFor="addJobSlug">Slug</label>
                        <input type="text" id="addJobSlug" className="form-control" name={"slug"}
                         value={jobFrmData.slug} onChange={onFormFieldChanged} placeholder="Url name" />
                    </div>
                    <div className="form-group mt-2">
                        <label className="form-label" htmlFor="addJobStatusId">Status Id</label>
                        <input type="text" id="addJobStatusId" className="form-control" name={"statusId"}
                         value={jobFrmData.statusId} onChange={onFormFieldChanged} placeholder="Active" />
                    </div>
                    <div className="form-group p-2">
                        <label className="form-label" htmlFor="addTechCompanyId">Tech Company</label>
                        <select aria-label="Default select example"id="addTechCompanyId" className="form-select" name="techCompanyId"
                        value={jobFrmData.techCompanyId} onChange={onFormFieldChanged} 
                        >
                        <option defaultValue={"selected"}>Choose Tech Company</option> 
                        <option value={"54421"}>Beta</option>
                        <option value={"54419"}>Lemon</option>
                        <option value={"54417"}>Nozoma</option>
                        <option value={"54411"}>Joogle</option> 
                        <option value={"54412"}>Macro</option>
                        </select>
                    </div>
                    <div className="form-group mt-2">
                        <label className="form-label" htmlFor="addSkills">Skills</label>
                        <div id="skillsHelp" className="form-text">Please, separate skills with a comma.</div>
                        <input type="text" id="addSkills" className="form-control" name={"skills"}
                        value={jobFrmData.skills} onChange={onFormFieldChanged} />
                    </div>
                   
                    <button type="submit" className=" col-3 btn btn-primary mt-3 m-md-2" id="cmdSubmit" onClick={onAddJobClicked}>{jobFrmData.id ? "Edit job" : "Add Job"}</button>


                </form>
            </div>
        </div>
    </div>
        </React.Fragment>
    )
}

export default AddJob;