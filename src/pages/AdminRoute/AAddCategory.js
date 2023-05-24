import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import toast, { Toaster } from "react-hot-toast";
import ADashboardTab from "../../components/ADashboardTab";
import { useAuth } from "../../context/authContext";
import { addNewCat, dltCat, getAllCat, updCat } from "../../api/categoryApi";
import { Button, Form, Input, Modal, Table } from "react-daisyui";
import { MdEditSquare, MdDelete } from "react-icons/md";
import CatForm from "../../components/form/CatForm";
import DltModal from "../../components/modal/DltModal";

const AddCategory = () => {
  const [auth] = useAuth();

  const [cats, setCats] = useState([]);
  const [name, setName] = useState("");
  const [selectCat, setSelectCat] = useState({
    id: "",
    name: "",
  });
  const [visible, setVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [updatedName, setUpdatedName] = useState("");

  const getCategories = async () => {
    try {
      const res = await getAllCat();
      setCats(res);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  // console.log(cats);

  const addCat = async (e) => {
    e.preventDefault();
    try {
      const res = await addNewCat(name);
      toast.success(res.msg);
      getCategories();
      setName("");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const handleDlt = async (e) => {
    e.preventDefault();
    // console.log(selectCat);
    try {
      const res = await dltCat(selectCat.id);
      toast.success(res.msg);
      getCategories();
    } catch (error) {
      toast.error(error.response.data.msg);
    }
    setVisible(!visible);
    setSelectCat({
      id: "",
      name: "",
    });
  };

  const handleUpd = async (e) => {
    e.preventDefault();
    if (updatedName.length >= 3) {
      try {
        const res = await updCat(selectCat.id, updatedName);
        toast.success(res.msg);
        getCategories();
      } catch (error) {
        toast.error(error.response.data.msg);
      }
    } else {
      toast.error("Category name should not be less than 3 character");
    }
    setEditModalVisible(!editModalVisible);
  };

  return (
    <Layout title={"Add Category"}>
      <Toaster />
      <div className="w-full flex flex-col justify-center items-center">
        <ADashboardTab />
        <div className="flex w-full component-preview p-4 items-center justify-center gap-2 font-sans">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Add Category</span>
            </label>
            <CatForm onSubmitHandler={addCat} name={name} setName={setName} />
          </div>
        </div>
        <div>
          <div className="overflow-x-auto">
            <Table>
              <Table.Head>
                <span />
                <span>Category</span>
                <span></span>
              </Table.Head>

              <Table.Body>
                {cats &&
                  cats?.map((cat, idx) => {
                    return (
                      <Table.Row key={cat._id} hover>
                        <span>{idx + 1}</span>
                        {/* <Catrow
                          name={cat.name}
                          id={cat._id}
                          setSelectCat={setSelectCat}
                          setVisible={setVisible}
                          visible={visible}
                          setUpdatedName={setUpdatedName}
                          updHandler={updHandler}
                          editing={editing}
                          setEditing={setEditing}
                        /> */}
                        <span>{cat.name}</span>
                        <span className="flex gap-4">
                          <MdEditSquare
                            size={25}
                            className="text-amber-400"
                            onClick={() => {
                              setEditModalVisible(!editModalVisible);
                              setUpdatedName(cat.name);
                              setSelectCat({ id: cat._id, name: cat.name });
                            }}
                          />
                          <MdDelete
                            size={25}
                            className="text-red-400"
                            onClick={() => {
                              setSelectCat({ id: cat._id, name: cat.name });
                              setVisible(!visible);
                            }}
                          />
                        </span>
                      </Table.Row>
                    );
                  })}
              </Table.Body>
            </Table>
            <DltModal
              handleDlt={handleDlt}
              title={"Category " + selectCat.name}
              name={selectCat.name}
              visible={visible}
              setVisible={setVisible}
            />
            <Modal
              open={editModalVisible}
              onClickBackdrop={() => setEditModalVisible(!editModalVisible)}
            >
              <Form>
                <Modal.Body>
                  <Input
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                  />
                </Modal.Body>

                <Modal.Actions>
                  <Button
                    type="button"
                    className="bg-slate-400 border-none"
                    onClick={() => setEditModalVisible(!editModalVisible)}
                  >
                    Close
                  </Button>
                  <Button
                    className="bg-rose-500 border-none"
                    onClick={handleUpd}
                  >
                    Edit
                  </Button>
                </Modal.Actions>
              </Form>
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;
