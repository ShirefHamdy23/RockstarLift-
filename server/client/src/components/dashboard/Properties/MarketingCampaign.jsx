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
import { faCheck, faPencil, faTimes } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";
import CreateMarketCampaign from "./CreateMarketCampaign";
import { useParams } from "react-router-dom";
import { fetchAllCampaigns } from "../../../redux/action/campaignAction";

const MarketingCampaign = (props) => {
  const useId = localStorage.getItem("userId");
  const { campaigns } = props;
  useEffect(() => {
    props.fetchAllCampaigns(useId);
  }, []);
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
      field: "CampaignName",
      headerName: "Campaign Name",
      headerClassName: "super-app-theme--header",
      width: 240,
    },

    {
      field: "campaignDetails",
      headerName: "Campaign Details",
      sortable: false,
      headerClassName: "super-app-theme--header",
      width: 504,
    },

    {
      field: "createdAt",
      headerName: "Received on",
      headerClassName: "super-app-theme--header",
      width: 170,
    },
  ];
  const rows = campaigns.map((campaign, index) => {
    return {
      _id: campaign._id,
      id: index + 1,
      property: campaign.property.title,
      CampaignName: campaign.CampaignName,
      campaignDetails: `
      subject: jksahgdjklasgd text: Lo html: <div> <h1>jksahgdjklasgd</h1> <p>Lo</p> </div>

      `,
      createdAt: moment(campaign.createdAt).format("DD/MM/YYYY"),
    };
  });
  return (
    <div className="container">
      <>
        <ToastContainer />
        <div className="header">
          <h3>Market Campaign</h3>
        </div>
        <div className="main_section">
          <div className="create_buyer text-end mb-3">
            <CreateMarketCampaign />
          </div>
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
  campaigns: state.campaigns.campaigns,
});
export default connect(mapStateToProps, { fetchAllCampaigns })(
  MarketingCampaign
);
