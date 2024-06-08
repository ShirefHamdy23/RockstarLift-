import { styled } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { color, wrap } from "framer-motion";
import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import { fetchOffersByUser } from "../../../redux/action/OfferActions";
import moment from "moment/moment";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleLeft,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { deleteOffer } from "../../../redux/action/OfferActions";
const DisplayOffers = (props) => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const columns = [
    {
      field: "id",
      headerName: "#",
      headerClassName: "super-app-theme--header",
      width: 20,
    },
    {
      field: "title",
      headerName: "Title",
      headerClassName: "super-app-theme--header",
      width: 200,
      wrapText: true,
      renderCell: (params) => {
        return (
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
          >
            <Link to={`/rockstar-lift/properties/${params.row.property}`}>
              <p>{params.row.title}</p>
            </Link>
          </div>
        );
      },
    },
    {
      field: "streetAddress",
      headerName: "Street Address",
      headerClassName: "super-app-theme--header",
      width: 200,
    },
    {
      field: "amount",
      headerName: "Amount",
      headerClassName: "super-app-theme--header",
      width: 100,
    },
    {
      field: "email",
      headerName: "Seller Email",
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
      field: "status",
      headerName: "Status",
      headerClassName: "super-app-theme--header text-center",
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
              props.deleteOffer(params.row._id, navigate);
            }}
          >
            <i className="mdi mdi-close"></i>
          </strong>
        </div>
      ),
    },
  ];
  useEffect(() => {
    props.fetchOffersByUser(userId);
  }, [props.fetchOffersByUser, userId]);
  const { offers } = props;
  // const rows = [
  //   {
  //     listNum: 1,
  //     id: "1238916398139128",
  //     title: "Beautiful Apartment",
  //     streetAddress: "123 Main St",
  //     amount: 100000,
  //     email: "user1@example.com",
  //     name: "John Doe",
  //     status: "pending",
  //     createdAt: moment("2023-05-01T10:00:00Z").format("YYYY-MM-DD"),
  //   },
  //   {
  //     listNum: 2,
  //     id: "2347284639812746",
  //     title: "Cozy Cottage",
  //     streetAddress: "456 Maple Ave",
  //     amount: 150000,
  //     email: "user2@example.com",
  //     name: "Jane Smith",
  //     status: "accepted",
  //     createdAt: moment("2023-04-21T12:00:00Z").format("YYYY-MM-DD"),
  //   },
  //   {
  //     listNum: 3,
  //     id: "3495871938471923",
  //     title: "Modern Condo",
  //     streetAddress: "789 Oak Dr",
  //     amount: 200000,
  //     email: "user3@example.com",
  //     name: "Bob Johnson",
  //     status: "rejected",
  //     createdAt: moment("2023-03-15T14:30:00Z").format("YYYY-MM-DD"),
  //   },
  //   {
  //     listNum: 4,
  //     id: "4589719348271934",
  //     title: "Spacious House",
  //     streetAddress: "101 Pine Rd",
  //     amount: 250000,
  //     email: "user4@example.com",
  //     name: "Alice Williams",
  //     status: "pending",
  //     createdAt: moment("2023-02-28T16:45:00Z").format("YYYY-MM-DD"),
  //   },
  //   {
  //     listNum: 5,
  //     id: "5671829471839284",
  //     title: "Luxury Villa",
  //     streetAddress: "202 Cedar Ln",
  //     amount: 500000,
  //     email: "user5@example.com",
  //     name: "Charlie Brown",
  //     status: "pending",
  //     createdAt: moment("2023-01-20T09:00:00Z").format("YYYY-MM-DD"),
  //   },
  //   {
  //     listNum: 6,
  //     id: "6781928471938392",
  //     title: "Urban Loft",
  //     streetAddress: "303 Birch Blvd",
  //     amount: 300000,
  //     email: "user6@example.com",
  //     name: "David Miller",
  //     status: "accepted",
  //     createdAt: moment("2022-12-10T08:00:00Z").format("YYYY-MM-DD"),
  //   },
  //   {
  //     listNum: 7,
  //     id: "7892837461928374",
  //     title: "Charming Bungalow",
  //     streetAddress: "404 Walnut Way",
  //     amount: 180000,
  //     email: "user7@example.com",
  //     name: "Eve Taylor",
  //     status: "rejected",
  //     createdAt: moment("2022-11-05T11:00:00Z").format("YYYY-MM-DD"),
  //   },
  //   {
  //     listNum: 8,
  //     id: "8928471239182738",
  //     title: "Seaside Cottage",
  //     streetAddress: "505 Ocean Dr",
  //     amount: 220000,
  //     email: "user8@example.com",
  //     name: "Frank Wilson",
  //     status: "pending",
  //     createdAt: moment("2022-10-01T15:00:00Z").format("YYYY-MM-DD"),
  //   },
  //   {
  //     listNum: 9,
  //     id: "9018273482937182",
  //     title: "Mountain Cabin",
  //     streetAddress: "606 Pine Mountain Rd",
  //     amount: 320000,
  //     email: "user9@example.com",
  //     name: "Grace Lee",
  //     status: "accepted",
  //     createdAt: moment("2022-09-15T09:30:00Z").format("YYYY-MM-DD"),
  //   },
  //   {
  //     listNum: 10,
  //     id: "1928374618293746",
  //     title: "Riverside House",
  //     streetAddress: "707 River St",
  //     amount: 400000,
  //     email: "user10@example.com",
  //     name: "Henry Kim",
  //     status: "rejected",
  //     createdAt: moment("2022-08-20T14:15:00Z").format("YYYY-MM-DD"),
  //   },
  // ];
  const rows = offers.map((offer, index) => {
    return {
      _id: offer._id,
      property: offer.property._id,
      id: index + 1,
      title: offer.property.title,
      streetAddress:
        offer.status !== "Approved" ? "Hidden" : offer.property.streetAddress,
      amount: offer.amount,
      email: offer?.property?.user?.email,
      name:
        offer?.property?.user?.firstName +
        " " +
        offer?.property?.user?.lastName,
      status: offer.status,
      createdAt: moment(offer.createdAt).format("YYYY-MM-DD"),
    };
  });

  return (
    <div>
      <div className="settings_display">
        <Container>
          <h1>Offers</h1>
          <p>These are all the offers that you sent.</p>
          <Link to="/rockstar-lift/user/profile">
            <p>
              <FontAwesomeIcon icon={faArrowAltCircleLeft} /> Back To Dashboard
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
  offers: state.offers.offers,
});

export default connect(mapStateToProps, { fetchOffersByUser, deleteOffer })(
  DisplayOffers
);
