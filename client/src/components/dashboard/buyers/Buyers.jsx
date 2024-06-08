import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import CreateBuyer from "./CreateBuyer";
import { Button, Container } from "react-bootstrap";
import { connect } from "react-redux";
import { getAllBuyers, deleteBuyer } from "../../../redux/action/buyerAction";
import { useEffect } from "react";
import moment from "moment/moment";
import Loader from "./../../../Loader";
import { useState } from "react";
import UpdateBuyer from "./UpdateBuyer";

const Buyers = (props) => {
  const [load, setLoad] = useState(true);
  const columns = [
    {
      field: "id",
      headerName: "#",
      headerClassName: "super-app-theme--header",
      width: 50,
    },
    {
      field: "name",
      headerName: "Name",
      headerClassName: "super-app-theme--header",
      width: 200,
    },
    {
      field: "email",
      headerName: "Email",
      headerClassName: "super-app-theme--header",
      width: 250,
    },

    {
      field: "phone",
      headerName: "Phone",
      sortable: false,
      headerClassName: "super-app-theme--header",
      width: 150,
    },
    {
      field: "investorType",
      headerName: "Investor Type",
      headerClassName: "super-app-theme--header",
      width: 180,
    },
    {
      field: "max",
      headerName: "Max",
      headerClassName: "super-app-theme--header",
      width: 100,
    },
    {
      field: "min",
      headerName: "Min",
      headerClassName: "super-app-theme--header",
      width: 100,
    },
    {
      field: "createdAt",
      headerName: "  Creation date",
      headerClassName: "super-app-theme--header",
      width: 110,
    },

    {
      field: "Update",
      headerName: "Edit",
      headerClassName: "super-app-theme--header",
      width: 50,
      wrapText: true,
      renderCell: (params) => (
        <>
          <strong>
            <UpdateBuyer buyerObj={params.row} />
          </strong>
        </>
      ),
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
              props.deleteBuyer(params.row._id);
            }}
          >
            <i className="mdi mdi-close"></i>
          </strong>
        </div>
      ),
    },
  ];

  useEffect(() => {
    props.getAllBuyers();
  }, [getAllBuyers]);
  const { buyers, loading } = props;
  if (loading) {
    <Loader load={load} />;
  }
  const rows = buyers.map((buyer, index) => {
    return {
      _id: buyer._id,
      id: index + 1,
      name: buyer.fullName,
      email: buyer.email,
      phone: buyer.phoneNumber,
      investorType: buyer.investorType,
      createdAt: moment(buyer.createdAt).format("YYYY-MM-DD"),
      max: buyer.buyBoxRange.maxPrice,
      min: buyer.buyBoxRange.minPrice,
    };
  });
  return (
    <Container>
      <div className="header">
        <h3>BUYERS LIST</h3>
      </div>
      <div className="main_section">
        <div className="create_buyer text-end mb-3">
          <CreateBuyer />
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
    </Container>
  );
};
const mapStateToProps = (state) => ({
  buyers: state.buyers.buyers,
  loading: state.buyers.loading,
});

export default connect(mapStateToProps, { getAllBuyers, deleteBuyer })(Buyers);
