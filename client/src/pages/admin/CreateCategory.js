import React, { useEffect, useState } from "react";
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Forms/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  //handle Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/category/create-category", {
        name,
      });
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      // toast.error("somthing went wrong in input form");
    }
  };

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data?.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //delete category
  const handleDelete = async (prodId) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${prodId}`
      );
      if (data.success) {
  
        toast.success(`category is deleted`);

        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Dashboard - Create Category"}>
       
    <div className='dashboard-container'>
      <div className='dashboard-menu'>
        <AdminMenu/>
      </div>           
      <div className='dashboard-content' style={{overflow:"auto", maxHeight:"120vh", fontFamily:"fantasy"}}>
        <div className="cate-title"><h1>Manage Category</h1></div>
          <div className="p-3 w-100 cate-form">
            <CategoryForm  handleSubmit={handleSubmit} value={name} setValue={setName} />
          </div>
          <div className="table " style={{margin:"auto", maxWidth:"100%"}}>
            <table className="table table-bordered table-striped">
              <thead>
                <tr className="text-center">
                  <th scope="col">Name</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody className="text-center" >
               {categories?.map((c) => (
                <>
                <tr >
                  <td key={c._id}>{c.name}</td>
                  
                  <td>
                    <button className="blue-btn" onClick={() => {setVisible(true); setUpdatedName(c.name); setSelected(c);}}>
                        Edit
                    </button>
                    <button className="red-btn" onClick={() => {handleDelete(c._id); }} >
                        Delete
                    </button>
                  </td>
                </tr>
              </>
              ))}
              </tbody>
            </table>
          </div>    

            
            <Modal onCancel={() => setVisible(false)}
              footer={null}
              open={visible}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
    </Layout>
  );
};

export default CreateCategory;