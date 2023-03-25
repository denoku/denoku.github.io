import React from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";

function JobModal (props){

    const job = props.job
    // console.log("aJobModal", job);
 
    return  (
    <Modal isOpen={props.isOpen} toggle={props.toggleModal}>
         <ModalHeader toggle={props.toggleModal}><strong>{job.title}</strong></ModalHeader>
        <ModalBody className="modal-body">
        <div><strong>Job Description:</strong></div>
        <p>{job.description}</p> 
        <div><strong>Job Summary</strong></div> 
        <p>{job.summary}</p>
        <div><strong>Salary</strong></div>
        <p>{job.pay}</p>
       
            <ModalFooter className="d-flex justify-content-center modal-footer">
                {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
            </ModalFooter>
           
       
        </ModalBody>
            
    </Modal>
    
  
    )
 }


export default React.memo(JobModal);