import React from "react"
import {
  Button,
  Col,
  Form,
  FormControl,
  Modal,
  ModalHeader,
  Row,
} from "react-bootstrap"

const ViewModal = ({
  isViewModal,
  formTitle,
  setIsViewModal,
  onCloseClick,
  formFields,
}) => {
  return (
    <Modal show={isViewModal} size="xl" onHide={() => setIsViewModal(false)}>
      <div className="modal-header">
        {/* Modal Header Title */}

        <h5 className="modal-title mt-0" id="myModalLabel">
          View {formTitle}
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
            {formFields?.map((field) => (
              <Col md={4} key={field.controlId}>
                <Form.Group className="mb-3" controlId={field.controlId}>
                  <Form.Label>{field.label}</Form.Label>
                  {field.as === "textarea" ? (
                    <Form.Control
                      as="textarea"
                      rows={field.rows}
                      placeholder={field.placeholder}
                      disabled={true}
                    />
                  ) : (
                    <Form.Control
                      type={field.type}
                      placeholder={field.placeholder}
                      disabled={true}
                    />
                  )}
                </Form.Group>
              </Col>
            ))}
          </Row>
        </Form>
      </div>
      {/* <div className="modal-footer">
        <Button>Close</Button>
      </div> */}
    </Modal>
  )
}

export default ViewModal
