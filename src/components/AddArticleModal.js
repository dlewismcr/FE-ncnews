import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";

class AddArticleModal extends Component {
  state = {
    categoryText: "Coding",
    titleText: "",
    contentText: ""
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
            Submit an article
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="newArticle.ControlSelectTopic">
              <Form.Label>Category</Form.Label>
              <Form.Control as="select" onChange={this.handleCategory}>
                <option>Coding</option>
                <option>Cooking</option>
                <option>Football</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="newArticle.ControlSelectTitle">
              <Form.Label>
                Title{" "}
                {!this.state.titleText && (
                  <span className="required">(Required)</span>
                )}
              </Form.Label>
              <Form.Control
                as="textarea"
                rows="1"
                onChange={this.handleTitle}
                value={this.state.titleText}
              />
            </Form.Group>
            <Form.Group controlId="newArticle.ControlSelectContent">
              <Form.Label>
                Content{" "}
                {!this.state.contentText && (
                  <span className="required">(Required)</span>
                )}
              </Form.Label>
              <Form.Control
                as="textarea"
                rows="5"
                onChange={this.handleText}
                value={this.state.contentText}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={this.props.onHide}>
            Cancel
          </Button>
          <Button variant="outline-primary" onClick={this.handleSubmit}>
            Submit Article
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  handleCategory = event => {
    this.setState({
      categoryText: event.target.value
    });
  };

  handleTitle = event => {
    this.setState({
      titleText: event.target.value
    });
  };

  handleText = event => {
    this.setState({
      contentText: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    if(this.state.titleText !== "" && this.state.contentText !== ""){
      this.props.addArticle(
        this.state.categoryText.toLowerCase(),
        this.state.titleText,
        this.state.contentText
      );
    this.setState({ titleText: "", contentText: "" });
    this.props.onHide();
    };
  };
}

AddArticleModal.propTypes = {
  addArticle: PropTypes.func,
  show: PropTypes.bool,
  onHide: PropTypes.func
};

export default AddArticleModal;
