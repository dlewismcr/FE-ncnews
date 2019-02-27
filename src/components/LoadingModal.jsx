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
          className={"loadingModal"}
          show={true}
        >
          <Modal.Title className={"loadingModalTitle"}>
            Loading...
          </Modal.Title>
          <img
            className={"loadingSpinner"}
            src="/images/Spin-1s-200px.svg"
            alt="loading spinner"
          />
        </Modal>
      </>
    );
  }
}

export default LoadingModal;