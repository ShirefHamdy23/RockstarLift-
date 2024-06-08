import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormControl,
  Modal,
  ModalHeader,
  Row,
} from "react-bootstrap";
import { connect } from "react-redux";
import { getAllUsers } from "../../../redux/action/userAction";

const UpdateModal = ({
  isUpdateModal,
  formTitle,
  setIsUpdateModal,
  onCloseClick,
  formFields,
  users,
  selectedRow,
  onChange,
  onUpdateFormSubmit,
}) => {
  useEffect(() => {
    getAllUsers();
  }, []);

  const [formData, setFormData] = useState(selectedRow || {});

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdateFormSubmit(
      {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        role: formData.role,
        email: formData.email,
        age: formData.age,
      },
      selectedRow?._id
    );
    setIsUpdateModal(false);
  };
  // Update form data state when selectedRow changes
  useEffect(() => {
    setFormData(selectedRow);
  }, [selectedRow]);

  // Handle form field changes
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <Modal
      show={isUpdateModal}
      size="xl"
      onHide={() => setIsUpdateModal(false)}
    >
      <div className="modal-header">
        {/* Modal Header Title */}

        <h5 className="modal-title mt-0" id="myModalLabel">
          Update {formTitle}
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
            {formFields?.map((field, index) => (
              <Col md={4} key={`${field.controlId}-${index}`}>
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
                      value={formData[field.name] || ""}
                      rows={field.rows}
                      type={field.type}
                      placeholder={field.placeholder}
                      onChange={handleFieldChange}
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
const mapStateToProps = (state) => ({
  users: state.users,
  loading: state.loading,
  error: state.error,
});
export default connect(mapStateToProps, getAllUsers)(UpdateModal);
