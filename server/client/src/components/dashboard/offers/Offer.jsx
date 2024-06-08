import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import CreateOffer from "./CreateOffer";
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

const Offer = (props) => {
  const id = localStorage.getItem("userId");
  useEffect(() => {
    props.fetchOffersBySellerId(id);
  }, [fetchOffersBySellerId, id]);
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
      width: 120,
    },
    {
      field: "amount",
      headerName: "Amount",
      headerClassName: "super-app-theme--header",
      width: 120,
    },

    {
      field: "EMD",
      headerName: "EMD",
      sortable: false,
      headerClassName: "super-app-theme--header",
      width: 120,
    },
    {
      field: "status",
      headerName: "Status",
      headerClassName: "super-app-theme--header",
      width: 120,
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
                props.refuseOffer(params.row._id);
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
                props.acceptOffer(params.row._id);
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
  const rows = props.offers.map((offer, index) => {
    return {
      _id: offer._id,
      id: index + 1,
      property: offer.property.title,
      buyer: offer.buyer.firstName + " " + offer.buyer.lastName,
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
          <h3>OFFERS</h3>
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
  loading: state.offers.loading,
  offers: state.offers.offers,
  acceptOffer: state.offers.acceptedOffer,
  refuseOffer: state.offers.refusedOffer,
});
export default connect(mapStateToProps, {
  fetchOffersBySellerId,
  acceptOffer,
  refuseOffer,
})(Offer);
