import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import "../pages/Home.css";
import modalBg from "../images/modal-bg.png";
import deleteIcon from "../images/delete-icon.png";
import userImg from "../images/user-img.png";
import { addCustomer, deleteCustomer, editCustomer } from "../redux/Customers"; 
import sortIcon from "../images/sort-icon-3.png";
import sortUp from "../images/sort-up-2.png";
import editIcon from "../images/edit-green-icon-4.png";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [apiData, setApiData] = useState([]);
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customers.customers);
  const [allCustomers, setAllCustomers] = useState([]);
  const [customerToDelete, setCustomerToDelete] = useState(null); 
  const [customerToEdit, setCustomerToEdit] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc"); 

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const savedCustomersJSON = localStorage.getItem("newCustomers");
    console.log(savedCustomersJSON, "ssss");
    if (savedCustomersJSON) {
      const savedCustomers = JSON.parse(savedCustomersJSON);
      setAllCustomers([...apiData, ...customers, ...savedCustomers]);
    } else {
      setAllCustomers([...apiData, ...customers]);
    }
  }, [apiData, customers]);


  const onFinish = (values) => {
    const newId = allCustomers.length + 1;

    const newCustomer = {
      id: newId,
      first_name: values.username,
      last_name: "",
      email: values.Email,
      avatar: userImg,
    };

    const savedCustomersJSON = localStorage.getItem("newCustomers");
    let savedCustomers = [];

    if (savedCustomersJSON) {
      savedCustomers = JSON.parse(savedCustomersJSON);
    }
    savedCustomers.push(newCustomer);
    localStorage.setItem("newCustomers", JSON.stringify(savedCustomers));

    dispatch(addCustomer(newCustomer));
    setIsModalOpen(false);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("https://reqres.in/api/users?page=1");
      const newData = response.data.data;
      setApiData(newData);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  {/* Sorting Function  */}

  const sortedCustomers = allCustomers.slice().sort((a, b) => {
    if (sortOrder === "asc") {
      return a.id - b.id;
    } else {
      return b.id - a.id;
    }
  });

  const deleteOpen = (id) => {
    setCustomerToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const deleteOk = () => {
    if (customerToDelete) {
      const savedCustomersJSON = localStorage.getItem("newCustomers");
      if (savedCustomersJSON) {
        let savedCustomers = JSON.parse(savedCustomersJSON);
        savedCustomers = savedCustomers.filter(
          (customer) => customer.id !== customerToDelete
        );
        localStorage.setItem("newCustomers", JSON.stringify(savedCustomers));
      }

      dispatch(deleteCustomer(customerToDelete));
      setIsDeleteModalOpen(false);
    }
  };

  const deleteItem = (id) => {
    deleteOpen(id);
  };

  const deleteCancle = () => {
    setIsDeleteModalOpen(false);
  };

  const editOpen = (customer) => {
    setCustomerToEdit(customer);
    setIsEditModalOpen(true);
  };

  const onEditFinish = (values) => {
    if (customerToEdit) {
      const editedCustomer = {
        id: customerToEdit.id,
        first_name: values.username,
        email: values.Email,
      };

      setAllCustomers((prevCustomers) =>
        prevCustomers.map((customer) =>
          customer.id === editedCustomer.id ? editedCustomer : customer
        )
      );

      const savedCustomersJSON = localStorage.getItem("newCustomers");
      if (savedCustomersJSON) {
        let savedCustomers = JSON.parse(savedCustomersJSON);
        savedCustomers = savedCustomers.map((customer) =>
          customer.id === editedCustomer.id ? editedCustomer : customer
        );
        localStorage.setItem("newCustomers", JSON.stringify(savedCustomers));
      }

      setIsEditModalOpen(false);
    }
  };

  return (
    <div className="home-container md:mx-14 md:my-6">
      <div className="hidden md:block">
        <Button
          onClick={() => setIsModalOpen(true)}
          className="customer-btn-width md:flex gap-2 md:justify-center  md:items-center text-white md:h-10"
          style={{
            background: `linear-gradient(135deg, #57BC90, #004B40)`,
          }}
        >
          <PlusOutlined />
          <span className="">ADD NEW CUSTOMER</span>
        </Button>
      </div>

      <div className="md:hidden flex justify-between mx-3 my-3 ">
        <h2 className="text-xl font-bold">CUSTOMERS</h2>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="md:flex gap-2 md:justify-center text-xs md:items-center text-white md:h-10"
          style={{
            background: `linear-gradient(135deg, #57BC90, #004B40)`,
          }}
        >
          {/* <PlusOutlined /> */}
          <span className=""> + Add New Customer</span>
        </Button>
      </div>

      {/* Modal for Adding a Customer */}
      <Modal
        className="custom-modal"
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        closeIcon={false}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        width={330}
      >
        <div className="mt-5 relative flex justify-center items-center">
          <img src={modalBg} className="absolute w-12/12" />
          <p className="relative text-white text-2xl top-4">Add New Customer</p>
        </div>
        <div className="mt-16 ml-5">
          <Form
            name="basic"
            style={{
              maxWidth: 292,
            }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please enter Customer Name",
                },
              ]}
            >
              <Input placeholder="Customer Name" />
            </Form.Item>

            <Form.Item
              name="Email"
              rules={[
                {
                  required: true,
                  message: "Please enter Email",
                },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <span className="text-[#57BC90] underline">Upload Photos</span>

            <Form.Item>
              <Button
                className="submit-custom-width text-white text-xs h-9 mt-9"
                htmlType="submit"
                style={{
                  background: `linear-gradient(135deg, #57BC90, #004B40)`,
                }}
              >
                ADD CUSTOMER
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>

      {/* Modal for Deleting a Customer */}
      <Modal
        className="custom-modal"
        visible={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        closeIcon={false}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        width={320}
      >
        <div>
          <div className="flex justify-center pt-16">
            <div className="text-center">
              <img src={deleteIcon} className="mx-auto w-16" />
              <p className="font-bold text-xl my-3">Are you sure?</p>
              <div className="leading-5 font-semibold">
                <p>Do you really want to delete this customer?</p>
                <p>This process can not be undone.</p>
              </div>
              <div className="mt-8 flex gap-3 justify-evenly ">
                <Button
                  onClick={deleteCancle}
                  className="bg-gray-400 h-9 w-7/12 text-white"
                >
                  Cancle
                </Button>
                <Button
                  onClick={deleteOk}
                  className="bg-red-600 h-9 w-7/12 text-white"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Modal for Editing a Customer */}
      <Modal
        className="custom-modal"
        visible={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        closeIcon={false}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        width={330}
      >
        <div className="mt-5 relative flex justify-center items-center">
          <img src={modalBg} className="absolute w-12/12" />
          <p className="relative text-white text-2xl top-4">Edit Customer</p>
        </div>
        <div className="mt-16 ml-5">
          <Form
            name="basic"
            style={{
              maxWidth: 292,
            }}
            onFinish={onEditFinish}
            autoComplete="off"
            initialValues={{
              username: customerToEdit ? customerToEdit.first_name : "",
              Email: customerToEdit ? customerToEdit.email : "",
            }}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please enter Customer Name",
                },
              ]}
            >
              <Input placeholder="Customer Name" />
            </Form.Item>

            <Form.Item
              name="Email"
              rules={[
                {
                  required: true,
                  message: "Please enter Email",
                },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <span className="text-[#57BC90] underline">Upload Photos</span>

            <Form.Item>
              <Button
                className="submit-custom-width text-white text-xs mt-9"
                htmlType="submit"
                style={{
                  background: `linear-gradient(135deg, #57BC90, #004B40)`,
                }}
              >
                EDIT CUSTOMER
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>

      <div
        onClick={() => {
          setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        }}
        style={{ cursor: "pointer" }}
      >
        <div className="bg-[#c5e3d5] rounded-lg">
          <div className="md:custom-width-class list-none flex  md:text-base  text-xs items-center md:mt-10 h-10 text-green-700 font-bold">
            <div className="md:w-56 flex items-center gap-1 md:pl-0 pl-2  md:justify-end">
              <div className="md:block hidden">Customer ID</div>
              <div className="md:hidden block pl-10"> ID</div>
              <div>
                <img src={sortUp} className="w-2 h-1 mt-1" />
                <img src={sortIcon} className="w-2 h-1 mt-1" />
              </div>
            </div>
            <div className="flex gap-16 md:w-80 w-56 md:justify-end justify-center">
              <div className="flex items-center gap-1">
                <div>
                  <div className="md:block hidden">Customer Name</div>
                  <div className="md:hidden block"> Name</div>
                </div>
                <div>
                  <img src={sortUp} className="w-2 h-1 mt-1" />
                  <img src={sortIcon} className="w-2 h-1 mt-1" />
                </div>
              </div>
              <div className="flex items-center gap-1 md:pr-0 pr-2">
                <div>
                  <p className="">Email</p>
                </div>
                <div>
                  <img src={sortUp} className="w-2 h-1 mt-1" />
                  <img src={sortIcon} className="w-2 h-1 mt-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {sortedCustomers.map((customer) => (
        <div
          key={customer.id}
          className="bg-white mt-5 px-2 py-2 rounded-lg flex justify-between items-center shadow-md"
        >
          <div>
            <img
              src={customer.avatar}
              className="md:w-16 w-10 rounded-md"
              alt=""
            />
          </div>

          <div className="md:w-16 text-[#5A5F65] ">
            <p>{customer.id}</p>
          </div>

          <div
            style={{
              width: " 100px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
            className="md:text-sm text-xs md:text-left text-center"
          >
            <p className="cursor-pointer text-[#57BC90] underline">
              {customer.first_name} {customer.last_name}
            </p>
          </div>

          <div className="md:w-24 md:text-sm text-xs text-[#5A5F65]">
            <p>{customer.email}</p>
          </div>

          <div className="flex  gap-4 mr-2 ">
            <Button
              onClick={() => editOpen(customer)}
              className="md:w-24 md:h-7 bg-[#b0e1b7] text-[#198f29] hidden md:flex items-center justify-center"
            >
              Edit
            </Button>
            <div className="md:hidden flex gap-2">
              <div>
                <img
                  src={deleteIcon}
                  className=" w-3"
                  onClick={() => deleteItem(customer.id)}
                />
              </div>
              <div>
                <img
                  src={editIcon}
                  onClick={() => editOpen(customer)}
                  className=" w-3"
                />
              </div>
            </div>
            <Button
              className="md:w-24 md:h-7 bg-[#ef9999] text-[#e13838] hidden md:flex  items-center justify-center"
              onClick={() => deleteItem(customer.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
