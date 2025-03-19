import axios from "axios";
import React from "react";
import { toast, ToastContainer } from "react-toastify";

const EnquiryList = ({ data, getEnquiryList, Swal, setFormData }) => {
  const DeleteRow = (DleId) => {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8020/api/website/enquiry/delete/${DleId}`)
          .then((res) => {
            toast.success("Enquiry Deleted successfully");
            getEnquiryList();
            console.log(res);
          });
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const EditRow = (editId) => {
    axios
      .get(`http://localhost:8020/api/website/enquiry/single/${editId}`)
      .then((res) => {
        let data = res.data;
        setFormData(data.enquiry);
      });
    // alert(editId);x`
  };
  return (
    <div className="w-[70%] bg-gray-200 p-4">
      <ToastContainer />
      <h2 className="text-[20px] font-bold pb-3">Enquiry List</h2>
      <div className="bg-white">
        <table className="bg-gray-50 w-[100%]">
          <thead className="bg-gray-50 w-[100%]">
            <tr>
              <th className="py-2 px-3 text-left">Sr No.</th>
              <th className="py-2 px-3 text-left">Name</th>
              <th className="py-2 px-3 text-left">Email</th>
              <th className="py-2 px-3 text-left">Phone</th>
              <th className="py-2 px-3 text-left">Message</th>
              <th className="py-2 px-3 text-left">Edit</th>
              <th className="py-2 px-3 text-left">Delete</th>
            </tr>
          </thead>
          {data.length >= 1 ? (
            data.map((item, index) => {
              return (
                <>
                  <tbody>
                    <tr
                      key={index}
                      className="hover:bg-gray-100 border-b  border-gray-200"
                    >
                      <td className="py-3 pl-4 text-left text-gray-800">
                        {index + 1}
                      </td>
                      <td className="py-3 pl-4 text-left text-gray-800">
                        {item.name}
                      </td>
                      <td className="py-3 pl-4 text-left text-gray-800">
                        {item.email}
                      </td>
                      <td className="py-3 pl-4 text-left text-gray-800">
                        {item.phone}
                      </td>
                      <td className="py-3 pl-4 text-left text-gray-800">
                        {item.message}
                      </td>
                      <td className="py-3 pl-4">
                        <button
                          onClick={() => EditRow(item._id)}
                          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none"
                        >
                          Edit
                        </button>
                      </td>
                      <td className="py-3 pl-4">
                        <button
                          onClick={() => DeleteRow(item._id)}
                          className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700 focus:outline-none"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </>
              );
            })
          ) : (
            <tbody>
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No data available
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default EnquiryList;
