import React, {useCallback, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom"
import jobsService from "../services/jobsService";
import ASingleJob from "./ASingleJob";
import Pagination from "rc-pagination";
import 'rc-pagination/assets/index.css';
import locale from "rc-pagination/lib/locale/en_US";
import JobModal from "./jobModal";

function Jobs() {
const navigate = useNavigate();
const [jobs, setJobs] = useState({
    arrayOfJobs: [],
    jobComponents: [],
    pageSize:4,
    pageIndex:0,
    totalCount:8,
});
const [showModal, setShowModal] = useState(false);
const [jobViewed, setJobViewed] = useState({})
const [searchJob, setSearchJob] = useState({
    query:"",

 });

const toggleModal = ()=>{
  setShowModal(!showModal)
}

 const onFormFieldChanged = event =>{
    const target = event.target;

    const newUserValue = target.value;

    const nameOfField = target.name

    setSearchJob((prevstate) =>{
    const updatedFormData = {...prevstate};
    updatedFormData[nameOfField] = newUserValue

    return updatedFormData
 
 });
};

    useEffect(() => {
     
        jobsService
        .getAllJobs(jobs.pageIndex, jobs.pageSize )
        .then(getAllJobsSuccess)
        .catch(getAllJobsError)
    },[jobs.pageIndex]
    )
    
    const onEditClicked = useCallback((myJob, eObj) =>{
        console.log(myJob.id,{myJob, eObj });
        const jobTransport = {type: "MY_JOB", payload: myJob}
        navigate(`/jobs/${myJob.id}`, {state: jobTransport})
    }, []);   

        
    const onModalClicked = (job) =>{
      //console.log("onModalClicked", job);
      setJobViewed(job)
      toggleModal()
    }


    const onJobSearch = (e) =>{
        e.preventDefault();
       var pageIndex = 0;
       var pageSize = 1;

       jobsService
        .searchJob(pageIndex, pageSize, searchJob.query)
        .then(searchJobSuccess)
        .catch(searchJobError)
    }

    const getAllJobsSuccess = (data) =>{
        console.log("getAllJobsSuccess", data);
        setJobs((prevState) =>{
            const newJobs = {...prevState};
            newJobs.arrayOfJobs =  data.item.pagedItems;
            //console.log( newJobs.arrayOfJobs);
            newJobs.pageIndex = data.item.pageIndex;
            newJobs.pageSize = data.item.pageSize;
            newJobs.totalCount = data.item.totalCount;
           
            return newJobs
    })
    
    }

    const getAllJobsError = (err) =>{
     console.log("getAllJobsError", err);
     }

    const searchJobSuccess = (data) =>{
        console.log("searchJobSuccess", data);
     
        setJobs((prevState) =>{
        const newJobs = {...prevState};
        newJobs.arrayOfJobs =  data.item.pagedItems;

    return newJobs
})
    } 
   
    const searchJobError = (err) =>{
        console.log("searchJobError", err);
       }
     
    const mapJobs = aJobData =>{
    return   <ASingleJob key={"myJobs" + aJobData.id} aJobProp={aJobData}
     onEditFriend={onEditClicked} onModal={onModalClicked} />
    }

    const onPageChange = (e) => {
        console.log("pagechange", e);
        const pageClicked = e
     setJobs((prevstate) =>{
            const pd = {...prevstate}
            pd.pageIndex = pageClicked -1
            return pd
    })
  }

 
  
return (
    <React.Fragment>
       
              <JobModal isOpen={showModal} job={jobViewed} toggleModal={toggleModal}/>
         <div className="container characters">
         
        <div className="row justify-content-center"> 
            <div className="container"> 
            <Link className="btn btn-success col-2 m-2" to={"new"} href="#" role="button">Job +</Link>
            <form className="form-inline col-3 m-2">
              <input className="form-control m-2" type="search" value={searchJob.query} onChange={onFormFieldChanged} name={"query"}
                placeholder="Search" aria-label="Search" />
              <button className="btn btn-primary m-2" onClick={onJobSearch} type="submit">Search</button>
                </form>
                <div className="row justify-content-center"> 
                  
                <Pagination
                    className="d-flex justify-content-center rc-pagination"
                    total={jobs.totalCount}
                    pageSize={jobs.pageSize}
                    onChange={onPageChange}
                    currentPage={jobs.pageIndex+1}
                    locale={locale} />
                  {jobs.arrayOfJobs.map(mapJobs)}
                  </div>
                  <Pagination
                    className="d-flex justify-content-center rc-pagination"
                    total={jobs.totalCount}
                    pageSize={jobs.pageSize}
                    onChange={onPageChange}
                    currentPage={jobs.pageIndex+1}
                    locale={locale} />
                </div>
            </div>
        </div>
  
     
    </React.Fragment>
  );
}

export default Jobs;