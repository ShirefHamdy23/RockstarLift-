import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import moment from "moment/moment";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import {
  fetchMsgsByUser,
  sendReply,
} from "../../../redux/action/messageAction";
import SimpleMessageTemplate from "../../../MessagesTest/SimpleMessageTemplate";
const columns = [
  {
    field: "id",
    headerName: "#",
    headerClassName: "super-app-theme--header",
    width: 76,
    wrapText: true,
  },
  {
    field: "title",
    headerName: "Title",
    headerClassName: "super-app-theme--header",
    width: 200,
  },
  {
    field: "streetAddress",
    headerName: "Street Address",
    headerClassName: "super-app-theme--header",
    width: 200,
  },
  {
    field: "content",
    headerName: "Content",
    headerClassName: "super-app-theme--header",
    width: 200,
  },
  {
    field: "email",
    headerName: "Receiver Email",
    sortable: false,
    headerClassName: "super-app-theme--header",
    width: 200,
  },
  {
    field: "name",
    headerName: "Seller Name",
    headerClassName: "super-app-theme--header text-center",
    width: 150,
  },
  {
    field: "phone",
    headerName: "Phone",
    headerClassName: "super-app-theme--header text-center",
    color: "red",
    width: 100,
  },
  {
    field: "createdAt",
    headerName: "createdAt",
    headerClassName: "super-app-theme--header",
    width: 100,
  },
];

const Message = (props) => {
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    props.fetchMsgsByUser(userId);
  }, [props.fetchMsgsByUser, userId]);
  const { messages } = props;
  const rows = messages.map((msg, index) => {
    return {
      id: index + 1,
      title: msg.property.title,
      streetAddress: msg.property.streetAddress,
      content: msg.content,
      email: msg?.property?.user?.email,
      name:
        msg?.property?.user?.firstName + " " + msg?.property?.user?.lastName,
      phone: msg?.property?.user?.phone,
      createdAt: moment(msg.createdAt).format("YYYY-MM-DD"),
    };
  });
  console.log(messages);
  const [messagess, setMessages] = useState([
    {
      id: 1,
      sender: "user1@example.com",
      subject: "Hello",
      body: "Hello, I have a question.",
    },
    {
      id: 2,
      sender: "user2@example.com",
      subject: "Help",
      body: "I need help with my order.",
    },
    {
      id: 3,
      sender: "user3@example.com",
      subject: "Feedback",
      body: "I have some feedback for you.",
    },
  ]);
  const allMsg = messages.map((msg) => {
    return {
      id: msg._id,
      sender: msg.sender.firstName + " " + msg.sender.lastName,
      mail: msg.property.user.email,
      subject: msg.property.title,
      body: msg.content,
      _id: msg.property._id,
      receiver: msg.receiver.firstName + " " + msg.receiver.lastName,
      reply: msg.reply,
    };
  });
  const handleSendReply = (messageId, replay) => {
    console.log(messageId, replay);
    props.sendReply(messageId, replay);
    // Add your API call or message sending logic here
  };
  return (
    <div>
      <div className="settings_display">
        <Container>
          <h1>Messages</h1>
          <p>These are all the messages that you received.</p>
          <SimpleMessageTemplate
            messages={allMsg}
            onSendReply={handleSendReply}
          />
        </Container>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  messages: state.message.messages,
});

export default connect(mapStateToProps, { fetchMsgsByUser, sendReply })(
  Message
);
