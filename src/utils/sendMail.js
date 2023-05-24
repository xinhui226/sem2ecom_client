// import axios from "axios";

// export const sendMail = async (email, subject, value) => {
//   console.log("key", process.env.REACT_APP_SG_API_KEY);
//   const options = {
//     method: "POST",
//     url: "https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send",
//     headers: {
//       "content-type": "application/json",
//       "X-RapidAPI-Key": process.env.REACT_APP_SG_API_KEY,
//       "X-RapidAPI-Host": process.env.REACT_APP_SG_API_HOST,
//     },
//     data: {
//       personalizations: [
//         {
//           to: [
//             {
//               email: process.env.REACT_APP_SG_ADMIN_EMAIL,
//             },
//           ],
//           subject,
//         },
//       ],
//       from: {
//         email,
//       },
//       content: [
//         {
//           type: "text/plain",
//           value,
//         },
//       ],
//     },
//   };

//   try {
//     const response = await axios.request(options);
//     // console.log(response);
//     return response.status;
//   } catch (error) {
//     console.error(error);
//     return error;
//   }
// };
