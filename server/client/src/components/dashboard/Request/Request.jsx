import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  acceptOffer,
  fetchOffersBySellerId,
  refuseOffer,
} from "../../../redux/action/OfferActions";
import { connect } from "react-redux";
import { useEffect } from "react";
import moment from "moment/moment";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";
import {
  acceptAddress,
  fetchORequestsBySellerId,
  refuseAddress,
} from "../../../redux/action/addressAction";
import { useNavigate } from "react-router-dom";
const Request = (props) => {
  const id = localStorage.getItem("userId");
  const { requests } = props;
  const navigate = useNavigate();
  useEffect(() => {
    props.fetchORequestsBySellerId(id);
  }, [props.fetchORequestsBySellerId, id]);
  const columns = [
    {
      field: "id",
      headerName: "#",
      headerClassName: "super-app-theme--header",
      width: 76,
    },
    {
      field: "property",
      headerName: "Property",
      headerClassName: "super-app-theme--header",
      width: 300,
    },
    {
      field: "buyer",
      headerName: "Buyer ",
      headerClassName: "super-app-theme--header",
      width: 300,
    },

    {
      field: "status",
      headerName: "Status",
      headerClassName: "super-app-theme--header",
      width: 180,
    },

    {
      field: "createdAt",
      headerName: "Received on",
      headerClassName: "super-app-theme--header",
      width: 170,
    },
    {
      field: "Actions",
      headerName: "Actions",
      headerClassName: "super-app-theme--header",
      width: 266,
      wrapText: true,
      renderCell: (params) => (
        <>
          <strong>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => {
                props.refuseAddress(params.row._id, navigate);
              }}
              title="Edit"
            >
              <i>
                <FontAwesomeIcon icon={faTimes} />
              </i>
            </Button>
          </strong>

          <strong>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => {
                props.acceptAddress(params.row._id, navigate);
              }}
              title="Delete"
            >
              <i>
                <FontAwesomeIcon icon={faCheck} />
              </i>
            </Button>
          </strong>
        </>
      ),
    },
  ];

  const rows = requests.map((offer, index) => {
    return {
      _id: offer._id,
      id: index + 1,
      property: offer.property.title,
      buyer: offer.user.firstName + " " + offer.user.lastName,
      amount: offer.amount,
      EMD: offer.EMD,
      status: offer.status,
      createdAt: moment(offer.createdAt).format("DD/MM/YYYY"),
    };
  });
  return (
    <div className="container">
      <>
        <ToastContainer />
        <div className="header">
          <h3>ADDRESS REQUESTS</h3>
        </div>
        <div className="main_section">
          {/* <div className="create_buyer text-end mb-3">
                <CreateOffer />
              </div> */}
          <div className="section_table">
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
                transition: "all 1s",
                background: "white",
              }}
            />
          </div>
        </div>
      </>
    </div>
  );
};
const mapStateToProps = (state) => ({
  requests: state.requests.requests,
});
export default connect(mapStateToProps, {
  fetchORequestsBySellerId,
  acceptAddress,
  refuseAddress,
})(Request);
