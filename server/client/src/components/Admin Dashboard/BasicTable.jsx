import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { Fragment, useState } from "react";
import { Button } from "react-bootstrap";
import AddModal from "./Modals/AddModal";
import UpdateModal from "./Modals/UpdateModal";
import ViewModal from "./Modals/ViewModal";
import { ToastContainer } from "react-toastify";

const BasicTable = ({
  Header,
  rows,
  height,
  addButtonTitle,
  formTitle,
  formFields,
  form,
  onInputChange,
  onFormSubmit,
  users,
  onChange,
  onUpdateFormSubmit,
  handleDelete,
}) => {
  const [isAddModal, setIsAddModal] = useState(false);
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isViewModal, setIsViewModal] = useState(false);
  const handleButtonClick = (id) => {
    alert(`Button clicked for row ${id}`);
  };
  const columns = [
    {
      field: "id",
      headerName: "#",
      headerClassName: "super-app-theme--header",
      width: 250,
    },
    {
      field: "firstName",
      headerName: "First Name",
      headerClassName: "super-app-theme--header",
      width: 250,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      headerClassName: "super-app-theme--header",
      width: 250,
    },
    {
      field: "email",
      headerName: "Email",
      headerClassName: "super-app-theme--header",
      width: 250,
    },
    {
      field: "role",
      headerName: "Role",
      sortable: false,
      headerClassName: "super-app-theme--header",
      width: 250,
    },
    {
      field: "phone",
      headerName: "Phone",
      sortable: false,
      headerClassName: "super-app-theme--header",
      width: 250,
    },
    {
      field: "age",
      headerName: "Age",
      sortable: false,
      headerClassName: "super-app-theme--header",
      width: 250,
    },
    // {
    //   field: "password",
    //   headerName: "Password",
    //   sortable: false,
    //   headerClassName: "super-app-theme--header",
    //   width: 250,
    // },
    // {
    //   field: "creationDate",
    //   headerName: "Created At",
    //   sortable: false,
    //   headerClassName: "super-app-theme--header",
    //   width: 250,
    // },

    {
      field: "actions",
      headerName: "Actions",
      headerClassName: "super-app-theme--header",
      width: 250,
      renderCell: (params) => (
        <>
          <strong>
            <Button
              variant="contained"
              color="primary"
              size="small"
              style={{ marginLeft: 16, border: "none" }}
              onClick={() => {
                setIsUpdateModal(true);
                setSelectedRow(params.row);
              }}
              title="Edit"
            >
              <i className="bx bx-pencil"></i>
            </Button>
          </strong>
          <strong>
            <Button
              variant="contained"
              color="primary"
              size="small"
              style={{ marginLeft: 16, border: "none" }}
              onClick={() => handleDelete(params.row._id)}
              title="Delete"
            >
              <i className="mdi mdi-close"></i>
            </Button>
          </strong>
        </>
      ),
    },
  ];
  return (
    <Fragment>
      <ToastContainer />
      <div className="admin-tables">
        <div className="headers">{Header}</div>
        <div className="Add_btn">
          <Button onClick={() => setIsAddModal(true)}>{addButtonTitle}</Button>
        </div>
        <div className="table" style={{ height: height, width: "100%" }}>
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
      {isAddModal && (
        <AddModal
          isAddModal={isAddModal}
          setIsAddModal={setIsAddModal}
          onCloseClick={() => setIsAddModal(false)}
          formTitle={formTitle}
          formFields={formFields}
          form={form}
          onInputChange={onInputChange}
          onFormSubmit={onFormSubmit}
        />
      )}
      {isUpdateModal && (
        <UpdateModal
          isUpdateModal={isUpdateModal}
          setIsUpdateModal={setIsUpdateModal}
          onCloseClick={() => setIsUpdateModal(false)}
          formTitle={formTitle}
          formFields={formFields}
          form={form}
          onUpdateFormSubmit={onUpdateFormSubmit}
          users={users}
          selectedRow={selectedRow}
          onChange={onChange}
        />
      )}
      {isViewModal && (
        <ViewModal
          isViewModal={isViewModal}
          setIsViewModal={setIsViewModal}
          onCloseClick={() => setIsViewModal(false)}
          formTitle={formTitle}
          formFields={formFields}
        />
      )}
    </Fragment>
  );
};

export default BasicTable;
