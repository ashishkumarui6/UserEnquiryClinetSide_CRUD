import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2/dist/sweetalert2.js";
import EnquiryList from "./EnquiryList";

const Enquiry = () => {
  const [enquiryList, setEnquiryList] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    _id: "",
  });

  const isPhoneExist = enquiryList.find((it) => it.phone === formData.phone);
  const isEmailExist = enquiryList.find((it) => it.email === formData.email);

  const SaveEnquiry = (e) => {
    e.preventDefault();
    if (isEmailExist) {
      toast.error("Email Already Exist");
    } else if (isPhoneExist) {
      toast.error("Phone Already Exist");
    } else {
      if (formData._id) {
        axios
          .put(
            `http://localhost:8020/api/website/enquiry/update/${formData._id}`,
            formData
          )
          .then((res) => {
            console.log(res.data);
            toast.success("Enquiry Updated Successfully");
            setFormData({
              name: "",
              email: "",
              phone: "",
              message: "",
              _id: "",
            });
            getEnquiryList();
          });
      } else {
        axios
          .post("http://localhost:8020/api/website/enquiry/insert", formData)
          .then((res) => {
            console.log(res.data);
            toast.success("Enquiry Saved Successfully");
            setFormData({
              name: "",
              email: "",
              phone: "",
              message: "",
            });
            getEnquiryList();
          });
      }
    }
  };

  const OnGETData = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    const oldData = { ...formData };
    oldData[inputName] = inputValue;
    setFormData(oldData);
  };

  const getEnquiryList = () => {
    axios
      .get("http://localhost:8020/api/website/enquiry/enquiry-list")
      .then((res) => {
        return res.data;
      })
      .then((finalData) => {
        if (finalData.status) {
          setEnquiryList(finalData.enquiryList);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getEnquiryList();
  }, []);

  return (
    <div>
      <ToastContainer />
      <>
        <div className="gap-10">
          <h1 className="text-[40px] text-center py-3 font-bold">
            User Enquiry
          </h1>
          <div className="w-auto  flex gap-10 mx-5">
            <div className="w-[30%] bg-gray-200 p-4">
              <h2 className="text-[20px] font-bold">Enquiry From</h2>
              <form action="" onSubmit={SaveEnquiry}>
                <div className="flex flex-col py-3">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    placeholder="Enter Your Name"
                    className="bg-white p-1"
                    name="name"
                    onChange={OnGETData}
                    value={formData.name}
                    required
                  />
                </div>
                <div className="flex flex-col py-3">
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="text"
                    placeholder="Enter Your Name"
                    className="bg-white p-1"
                    name="email"
                    onChange={OnGETData}
                    value={formData.email}
                    required
                  />
                </div>
                <div className="flex flex-col py-3">
                  <label htmlFor="phone">Your Phone</label>
                  <input
                    type="text"
                    placeholder="Enter Your Name"
                    className="bg-white p-1"
                    name="phone"
                    onChange={OnGETData}
                    value={formData.phone}
                    required
                  />
                </div>
                <div className="flex flex-col py-3">
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    rows={4}
                    type="text"
                    placeholder="Enter Your Name"
                    className="bg-white p-1"
                    name="message"
                    onChange={OnGETData}
                    value={formData.message}
                    required
                  />
                </div>

                <div className="py-3">
                  <input
                    className="bg-blue-500 py-3 px-8 font-bold text-white w-[100%]"
                    type="submit"
                    value={!formData._id ? "Save" : "Update"}
                  />
                </div>
              </form>
            </div>
            <EnquiryList
              data={enquiryList}
              getEnquiryList={getEnquiryList}
              Swal={Swal}
              setFormData={setFormData}
            />
          </div>
        </div>
      </>
    </div>
  );
};

export default Enquiry;
