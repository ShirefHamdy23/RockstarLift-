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
import { useNavigate } from "react-router-dom";

const Users = (props) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    age: "",
    password: "",
    role: "",
  });
  useEffect(() => {
    props.getAllUsers();
  }, []);
  const { users, selectedRow } = props;

  const rows =
    users && users.users?.data?.length > 0
      ? users?.users?.data?.map((user, index) => {
          return {
            _id: user._id,
            id: index + 1,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            phone: user.phone,
            age: user.age,
          };
        })
      : [];
  // const ro
  // const rows = []

  const fields = [
    {
      controlId: "firstName",
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
      controlId: "lastName",
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
      controlId: "phone",
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
      controlId: "email",
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
      controlId: "age",
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
      controlId: "password",
      label: "Password",
      type: "password",
      placeholder: "xxxxxx",
      as: "input",
      rows: 1,
      name: "password",
      value: form.password,
      onChange: (e) => setForm({ ...form, password: e.target.value }),
    },
    {
      controlId: "role",
      label: "Role",
      type: "text",
      placeholder: "Role",
      as: "input",
      rows: 1,
      name: "role",
      value: form.role,
      onChange: (e) => setForm({ ...form, role: e.target.value }),
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
  // const onFormSubmit = (event) => {
  //   event.preventDefault()
  //   props.addNewUser(form)
  // }
  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      email: form.email,
      firstName: form.firstName,
      lastName: form.lastName,
      age: form.age,
      phone: form.phone,
      password: form.password,
      role: form.role,
    };

    props.addNewUser(payload);
    // props.addNewUser(form)
  };
  const handleUpdateSubmit = (payload, _id) => {
    console.log(form, payload);
    props.updateUser({ ...payload }, _id, navigate);
  };
  const handleupdatevaluesChange = (fieldValue, value) => {
    setForm({ ...form, [fieldValue]: value });
  };
  const [userss, setUsers] = useState([]);

  useEffect(() => {
    if (props.s && props.users.users && props.users.users.data) {
      const filteredUsers = props.users.users.data.filter(
        (item) => item.role === "Buyer"
      );
      setUsers(filteredUsers);
    }
  }, [props.users]);

  const handleDelete = (id) => {
    setUsers(userss.filter((buyer) => buyer.id !== id));
    props.deleteUser(id);
  };
  return (
    <BasicTable
      Header="Users"
      rows={rows}
      height="600px"
      addButtonTitle="Add User"
      formTitle="User"
      formFields={fields}
      form={form}
      onFormSubmit={handleSubmit}
      handleDelete={handleDelete}
      onChange={handleupdatevaluesChange}
      onUpdateFormSubmit={handleUpdateSubmit}
      selectedRow={selectedRow}
      // onInputChange={onInputChange}
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
})(Users);
