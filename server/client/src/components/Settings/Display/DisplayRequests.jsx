import { styled } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { color, wrap } from "framer-motion";
import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import moment from "moment/moment";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { fetchAddressByUser } from "../../../redux/action/addressAction";
import { deleteAddress } from "../../../redux/action/addressAction";
import { ToastContainer } from "react-toastify";

const DisplayRequests = (props) => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
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
      wrapText: true,
    },
    {
      field: "streetAddress",
      headerName: "Street Address",
      headerClassName: "super-app-theme--header",
      width: 200,
    },
    {
      field: "city",
      headerName: "City",
      headerClassName: "super-app-theme--header",
      width: 100,
    },
    {
      field: "state",
      headerName: "State",
      sortable: false,
      headerClassName: "super-app-theme--header",
      width: 200,
    },
    {
      field: "email",
      headerName: "Seller Email",
      headerClassName: "super-app-theme--header text-center",
      width: 150,
    },
    {
      field: "status",
      headerName: "Status",
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
    {
      field: "Delete",
      headerName: "Delete",
      headerClassName: "super-app-theme--header",
      width: 100,
      wrapText: true,
      renderCell: (params) => (
        <div>
          <strong
            style={{
              cursor: "pointer",
              color: "red",
              fontSize: "16px",
            }}
            onClick={() => {
              props.deleteAddress(params.row._id, navigate);
            }}
          >
            <i className="mdi mdi-close"></i>
          </strong>
        </div>
      ),
    },
  ];
  useEffect(() => {
    props.fetchAddressByUser(userId);
  }, [props.fetchAddressByUser, userId]);
  const { requests } = props;
  const rows = requests.map((request, index) => {
    return {
      _id: request._id,
      id: index + 1,
      title: request.property.title,
      streetAddress:
        request.status !== "Approved"
          ? "Hidden"
          : request.property.streetAddress,
      city: request.property.city,
      email: request?.property.user.email,
      state: request.property.state,
      status: request.status,
      createdAt: moment(request.createdAt).format("YYYY-MM-DD"),
    };
  });

  return (
    <div>
      <ToastContainer />
      <div className="settings_display">
        <Container>
          <h1>Requests</h1>
          <p>These are all the address requests that you sent.</p>
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
  requests: state.requests.requests,
});

export default connect(mapStateToProps, { fetchAddressByUser, deleteAddress })(
  DisplayRequests
);
