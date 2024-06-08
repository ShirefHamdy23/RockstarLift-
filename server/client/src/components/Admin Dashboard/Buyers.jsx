import React, { Fragment, useEffect, useState } from "react";
import BasicTable from "./BasicTable";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import moment from "moment/moment";
import {
  addNewUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from "../../redux/action/userAction";
import { getAllBuyers } from "../../redux/action/buyerAction";

const AdminBuyers = (props) => {
  const { selectedRow } = props;
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    age: "",
    password: "",
    role: "Buyer",
  });
  useEffect(() => {
    props.getAllUsers();
  }, []);
  const { users } = props;

  const rows =
    users && users.users?.data?.length > 0
      ? users?.users?.data
          ?.filter((item) => item.role === "Buyer")
          ?.map((buyer, index) => {
            return {
              _id: buyer._id,
              id: index + 1,
              firstName: buyer.firstName,
              lastName: buyer.lastName,
              email: buyer.email,
              phone: buyer.phone,
              role: buyer.role,
              age: buyer.age,
            };
          })
      : [];

  const fields = [
    {
      controlId: "formInput",
      label: "First Name",
      type: "",
      placeholder: "Enter Your First Name",
      as: "input",
      rows: 3,
      name: "firstName",
      value: form.firstName,
      onChange: (e) => setForm({ ...form, firstName: e.target.value }),
    },
    {
      controlId: "formInput",
      label: "Last Name",
      type: "",
      placeholder: "Enter Your Last Name",
      as: "input",
      rows: 3,
      name: "lastName",
      value: form.lastName,
      onChange: (e) => setForm({ ...form, lastName: e.target.value }),
    },
    {
      controlId: "formInput",
      label: "Phone",
      type: "",
      placeholder: "xxxxxxxx",
      as: "input",
      rows: 3,
      name: "phone",
      value: form.phone,
      onChange: (e) => setForm({ ...form, phone: e.target.value }),
    },
    {
      controlId: "formEmail",
      label: "Email address",
      type: "email",
      placeholder: "name@example.com",
      as: "input",
      rows: 1,
      name: "email",
      value: form.email,
      onChange: (e) => setForm({ ...form, email: e.target.value }),
    },
    {
      controlId: "formInput",
      label: "Age",
      type: "text",
      placeholder: "xx",
      as: "input",
      rows: 1,
      name: "age",
      value: form.age,
      onChange: (e) => setForm({ ...form, age: e.target.value }),
    },
    {
      controlId: "formInput",
      label: "Password",
      type: "password",
      placeholder: "xxxxxx",
      as: "input",
      rows: 1,
      name: "password",
      value: form.password,
      onChange: (e) => setForm({ ...form, password: e.target.value }),
    },
    // {
    //   controlId: "formdropdown",
    //   label: "Investor Type",
    //   as: "select",
    //   options: [
    //     "Buy and Hold Investor",
    //     "Fix and Flip Investor",
    //     "Wholesaler",
    //     "Real Estate Developer",
    //     "Realtor",
    //     "Other",
    //   ],
    //   name: "investorType",
    //   value: form.investorType,
    //   onChange: (e) => setForm({ ...form, investorType: e.target.value }),
    // },
  ];

  // const userTypes = [
  //   "Buy and Hold Investor",
  //   "Fix and Flip Investor",
  //   "Wholesaler",
  //   "Real Estate Developer",
  //   "Realtor",
  //   "Other",
  // ]

  //add buyer
  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      email: form.email,
      firstName: form.firstName,
      lastName: form.lastName,
      age: form.age,
      phone: form.phone,
      password: form.password,
      role: "Buyer",
    };

    props.addNewUser(payload);
    // props.addNewUser(form)
  };
  // update buyer
  const handleUpdateSubmit = (payload, id) => {
    props.updateUser({ ...payload, role: "Buyer" }, id);
  };
  const handleupdatevaluesChange = (fieldValue, value) => {
    setForm({ ...form, [fieldValue]: value });
  };
  const [buyers, setBuyers] = useState([]);

  useEffect(() => {
    if (props.users && props.users.users && props.users.users.data) {
      const filteredBuyers = props.users.users.data.filter(
        (item) => item.role === "Buyer"
      );
      setBuyers(filteredBuyers);
    }
  }, [props.users]);

  const handleDelete = (id) => {
    setBuyers(buyers.filter((buyer) => buyer.id !== id));
    props.deleteUser(id);
  };

  return (
    <BasicTable
      Header="Buyers"
      rows={rows}
      height="600px"
      addButtonTitle="Add Buyer"
      formTitle="Buyer"
      formFields={fields}
      form={form}
      onFormSubmit={handleSubmit}
      users={users}
      onChange={handleupdatevaluesChange}
      onUpdateFormSubmit={handleUpdateSubmit}
      selectedRow={selectedRow}
      handleDelete={handleDelete}
    />
  );
};
const mapStateToProps = (state) => ({
  users: state.users,
  loading: state.loading,
  error: state.error,
});

export default connect(mapStateToProps, {
  addNewUser,
  getAllUsers,
  updateUser,
  deleteUser,
})(AdminBuyers);
