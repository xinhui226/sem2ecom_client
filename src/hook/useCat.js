import { useState, useEffect } from "react";
import { getAllCat } from "../api/categoryApi";
export default function useCategory() {
  const [categories, setCategories] = useState([]);

  //get cat
  const getCategories = async () => {
    try {
      const res = await getAllCat();
      setCategories(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return categories;
}
