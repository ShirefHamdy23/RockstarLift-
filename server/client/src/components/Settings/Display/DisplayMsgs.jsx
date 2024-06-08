import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import moment from "moment/moment";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { fetchMsgsByUser } from "../../../redux/action/messageAction";
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
    field: "reply",
    headerName: "Reply",
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

const DisplayMsgs = (props) => {
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    props.fetchMsgsByUser(userId);
  }, [props.fetchMsgsByUser, userId]);
  const { messages } = props;

  const rows = messages.map((msg, index) => {
    return {
      id: index + 1,
      title: msg.property.title,
      streetAddress:
        msg.status !== "Approved" ? "Hidden" : msg.property.streetAddress,
      content: msg.content,
      reply: msg.reply,
      email: msg?.property?.user?.email,
      name:
        msg?.property?.user?.firstName + " " + msg?.property?.user?.lastName,
      phone: msg?.property?.user?.phone,
      createdAt: moment(msg.createdAt).format("YYYY-MM-DD"),
    };
  });

  return (
    <div>
      <div className="settings_display">
        <Container>
          <h1>Messages</h1>
          <p>These are all the messages that you sent.</p>
          <Link to="/rockstar-lift/user/profile">
            <p>
              <FontAwesomeIcon icon={faArrowAltCircleLeft} /> Back To Profile
            </p>
          </Link>
          <DataGrid
            autoHeight
            rows={rows}
            columns={columns}
            rowsPerPageOptions={[10, 15]}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 8 },
              },
              filter: {
                filterModel: {
                  items: [],
                  quickFilterValues: [""],
                },
              },
            }}
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
              },
            }}
            sx={{
              boxShadow: 1,
              border: 1,
              borderColor: "#ccc",
              "& .MuiDataGrid-cell:hover": {
                color: "primary.main",
              },
            }}
          />
        </Container>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  messages: state.message.messages,
});

export default connect(mapStateToProps, { fetchMsgsByUser })(DisplayMsgs);
