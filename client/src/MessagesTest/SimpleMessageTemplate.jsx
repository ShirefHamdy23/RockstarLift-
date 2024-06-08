import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  ListGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const SimpleMessageTemplate = ({ messages, onSendReply }) => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState("");

  const handleSelectMessage = (message) => {
    setSelectedMessage(message);
    setReplyText("");
  };

  const handleReplyChange = (e) => {
    setReplyText(e.target.value);
  };

  const handleSendReply = () => {
    if (selectedMessage && replyText) {
      onSendReply(selectedMessage.id, replyText);
      setReplyText("");
    }
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col md={4}>
          <Card>
            <Card.Header>Messages</Card.Header>
            <ListGroup variant="flush">
              {messages.map((message) => (
                <ListGroup.Item
                  key={message.id}
                  action
                  onClick={() => handleSelectMessage(message)}
                  active={selectedMessage && selectedMessage.id === message.id}
                >
                  {message.sender} : {message.subject}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
        <Col md={8}>
          {selectedMessage ? (
            <Card>
              <Card.Header>
                From: {selectedMessage.sender}
                <br />
                Mail: {selectedMessage.mail}
                <br />
                Subject: This Message about property{" "}
                <Link
                  to={`/rockstar-lift/admin-dashboard/properties/${selectedMessage._id}`}
                >
                  {selectedMessage.subject}
                </Link>
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  <div>
                    <span>{selectedMessage.sender}</span> :
                    {selectedMessage.body}
                  </div>
                  <span>{selectedMessage.receiver}</span> :
                  {selectedMessage.reply}
                </Card.Text>
                <Form>
                  <Form.Group controlId="formReply">
                    <Form.Label>Reply</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={replyText}
                      onChange={handleReplyChange}
                      placeholder="Write your reply here..."
                    />
                  </Form.Group>
                  <Button
                    className="mt-3"
                    variant="primary"
                    onClick={handleSendReply}
                  >
                    Send Reply
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          ) : (
            <Card>
              <Card.Body>
                <Card.Text>
                  Please select a message to view and reply.
                </Card.Text>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SimpleMessageTemplate;
