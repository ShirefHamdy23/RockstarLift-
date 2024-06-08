import React from "react";
import {
  Button,
  Col,
  Form,
  FormControl,
  Modal,
  ModalHeader,
  Row,
} from "react-bootstrap";

const AddModal = ({
  isAddModal,
  formTitle,
  setIsAddModal,
  onCloseClick,
  formFields,
  form,
  onFormSubmit,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onFormSubmit(event);
    setIsAddModal(false);
  };
  return (
    <Modal
      show={isAddModal}
      size="lg"
      onHide={() => setIsAddModal(false)}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <div className="modal-header">
        {/* Modal Header Title */}

        <h5 className="modal-title mt-0" id="myModalLabel">
          Add {formTitle}
        </h5>

        <button
          type="button"
          onClick={onCloseClick}
          className="btn-close position-absolute end-0 top-0 m-3"
        ></button>
      </div>
      <div className="modal-body">
        <Form>
          <Row>
            {formFields?.map((field, options) => (
              <Col md={4} key={field.controlId}>
                <Form.Group className="mb-3" controlId={field.controlId}>
                  <Form.Label>{field.label}</Form.Label>
                  {field.as === "textarea" ? (
                    <Form.Control
                      name={field.name}
                      value={field.value}
                      rows={field.rows}
                      type={field.type}
                      placeholder={field.placeholder}
                      onChange={field.onChange}
                    />
                  ) : field.as === "input" ? (
                    <Form.Control
                      name={field.name}
                      value={field.value}
                      rows={field.rows}
                      type={field.type}
                      placeholder={field.placeholder}
                      onChange={field.onChange}
                    />
                  ) : (
                    <Form.Select value={field.value} onChange={field.onChange}>
                      <option value="">Select {field.label}</option>
                      {field.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Form.Select>
                  )}
                </Form.Group>
              </Col>
            ))}
          </Row>
        </Form>
      </div>
      <div className="modal-footer">
        <Button type="submit" onClick={handleSubmit}>
          Save
        </Button>
      </div>
    </Modal>
  );
};

export default AddModal;
