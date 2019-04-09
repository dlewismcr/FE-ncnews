import Modal from 'react-bootstrap/Modal';
import React, { Component } from 'react';
import "./LoadingModal.css";

class LoadingModal extends Component {
 render() {
    return (
      <>
        <Modal
          size="sm"
          dialogClassName="modal-50w"
          className={"loading-modal"}
          show={true}
        >
          <Modal.Title className={"loading-modal-title"}>
            Loading...
          </Modal.Title>
          <img
            className={"loading-spinner"}
            src="/images/Rolling-1.2s-200px.svg"
            alt="loading spinner"
          />
        </Modal>
      </>
    );
  }
}

export default LoadingModal;