// import React from "react";
// import { Form, Input } from "react-daisyui";
// import { useSearch } from "../../context/searchContext";
// import { useNavigate } from "react-router-dom";
// import { searchProduct } from "../../api/productsApi";

// const SearchBox = () => {
//   const [val, setVal] = useSearch();
//   const redirect = useNavigate();

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await searchProduct(val);
//       setVal({ ...val, result: res });
//       redirect("/search");
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   return (
//     <div>
//       <Form onSubmit={submitHandler}>
//         <Input
//           bordered
//           type="text"
//           placeholder="Search"
//           value={val.search}
//           onChange={(e) => setVal({ ...val, search: e.target.value })}
//         />
//       </Form>
//     </div>
//   );
// };

// export default SearchBox;
