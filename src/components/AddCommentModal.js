import React, { Component } from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import PropTypes from 'prop-types';

class AddCommentModal extends Component {
  state = {
    commentText: ""
  };
  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add your comment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="newComment.ControlSelectContent">
              <Form.Label>
                Comment{" "}
                {!this.state.commentText && (
                  <span className="required">(Required)</span>
                )}
              </Form.Label>
              <Form.Control
                as="textarea"
                rows="5"
                onChange={this.handleText}
                value={this.state.commentText}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={this.props.onHide}>
            Cancel
          </Button>
          <Button variant="outline-primary" onClick={this.handleSubmit}>
            Submit Comment
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  handleText = event => {
    this.setState({ commentText: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if(this.state.commentText !== ""){
      this.props.addComment(
        this.props.articleId,
        this.state.commentText
      );
      this.setState({ commentText: "" });
      this.props.onHide();
    }
  };
}

AddCommentModal.propTypes = {
  addComment: PropTypes.func,
  articleId: PropTypes.string,
  show: PropTypes.bool,
  onHide: PropTypes.func
};

export default AddCommentModal;