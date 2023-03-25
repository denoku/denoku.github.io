import React from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";

function TechModal (props){

    const techCo = props.company
    // console.log("aJobModal", job);
 
    return  (
    <Modal isOpen={props.isOpen} toggle={props.toggleModal}>
         <ModalHeader className="bg-secondary" toggle={props.toggleModal}><strong>{techCo.name}</strong></ModalHeader>
        <ModalBody className="modal-body bg-secondary">
        <div className="text-white"><strong>Headline</strong></div>
        <p className="text-white">{techCo.headline}</p> 
        <div className="text-white"><strong>Company Summary</strong></div> 
        <p className="text-white">{techCo.summary}</p>
        <div className="text-white"><strong>Contact Information</strong></div>
        <p className="text-white">{techCo.contactInformation}</p>
       
            <ModalFooter className="d-flex justify-content-center modal-footer">
                {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
            </ModalFooter>
           
       
        </ModalBody>
            
    </Modal>
    
  
    )
 }


export default React.memo(TechModal);