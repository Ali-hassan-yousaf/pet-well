// // import React from 'react'
// // import { assets } from '../assets/assets'

// // const Contact = () => {
// //   return (
// //     <div>

// //       <div className='text-center text-2xl pt-10 text-[#707070]'>
// //         <p>CONTACT <span className='text-gray-700 font-semibold'>US</span></p>
// //       </div>

// //       <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
// //         <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />
// //         <div className='flex flex-col justify-center items-start gap-6'>
// //           <p className=' font-semibold text-lg text-gray-600'>OUR OFFICE</p>
// //           <p className=' text-gray-500'>54709 Willms Station <br /> Suite 350, Washington, USA</p>
// //           <p className=' text-gray-500'>Tel: (415) 555-0132 <br /> Email: greatstackdev@gmail.com</p>
// //           <p className=' font-semibold text-lg text-gray-600'>CAREERS AT PRESCRIPTO</p>
// //           <p className=' text-gray-500'>Learn more about our teams and job openings.</p>
// //           <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
// //         </div>
// //       </div>

// //     </div>
// //   )
// // }

// // export default Contact



// import React, { useState } from "react";
// import emailjs from "emailjs-com";

// const Contact = () => {
//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         phone: "",
//         company: "",
//         message: "",
//     });

//     const [responseMessage, setResponseMessage] = useState("");

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         // EmailJS service setup
//         const serviceID = "service_z5gwi97"; // Replace with your EmailJS service ID
//         const templateID = "template_lsavt01"; // Replace with your EmailJS template ID
//         const userID = "d6jIqBuGG6H1MMveY"; // Replace with your EmailJS user ID

//         // Sending email using EmailJS
//         emailjs
//             .send(serviceID, templateID, formData, userID)
//             .then((response) => {
//                 console.log("Email sent successfully:", response);
//                 setResponseMessage("Email sent successfully!");
//             })
//             .catch((error) => {
//                 console.error("Failed to send email:", error);
//                 setResponseMessage("Failed to send email.");
//             });
//     };

//     return (
//         <div>
//             <h1>Contact Form</h1>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     name="name"
//                     placeholder="Name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                 />
//                 <input
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                 />
//                 <input
//                     type="text"
//                     name="phone"
//                     placeholder="Phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                 />
//                 <input
//                     type="text"
//                     name="company"
//                     placeholder="Company"
//                     value={formData.company}
//                     onChange={handleChange}
//                 />
//                 <textarea
//                     name="message"
//                     placeholder="Message"
//                     value={formData.message}
//                     onChange={handleChange}
//                     required
//                 ></textarea>
//                 <button type="submit">Send Email</button>
//             </form>
//             {responseMessage && <p>{responseMessage}</p>}
//         </div>
//     );
// };

// export default Contact;


import React, { useState } from "react";
import emailjs from "emailjs-com";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Replace with your EmailJS service ID, template ID, and public key
    //emailjs.send("service_azxsyrn","template_2hq8erw");

    const serviceID = "service_azxsyrn";
    const templateID = "template_2hq8erw";
    const publicKey = "5bfyVd_p8T3Vp1kNQ";

  

    emailjs
      .send(serviceID, templateID, formData, publicKey)
      .then(
        (response) => {
          setResponseMessage("Message sent successfully!");
          setFormData({
            name: "",
            email: "",
            phone: "",
            company: "",
            message: "",
          });
        },
        (error) => {
          setResponseMessage("Failed to send message. Please try again.");
        }
      );
  };

  return (
    <section className="py-10 bg-gray-100 sm:py-16 lg:py-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Contact us
          </h2>
          <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-500">
            We'd love to hear from you. Fill out the form and we’ll get back to you as soon as possible.
          </p>
        </div>

        <div className="mt-6 overflow-hidden bg-white rounded-xl">
          <div className="px-6 py-12 sm:p-12">
            <h3 className="text-3xl font-semibold text-center text-gray-900">
              Send us a message
            </h3>

            <form onSubmit={handleSubmit} className="mt-14">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                <div>
                  <label htmlFor="name" className="text-base font-medium text-gray-900">
                    Your name
                  </label>
                  <div className="mt-2.5 relative">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                      className="block w-full px-4 py-4 text-black placeholder-gray-500 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="text-base font-medium text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2.5 relative">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                      className="block w-full px-4 py-4 text-black placeholder-gray-500 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                    />
                  </div>
                </div>

                {/* <div>
                  <label htmlFor="phone" className="text-base font-medium text-gray-900">
                    Phone number
                  </label>
                  <div className="mt-2.5 relative">
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      required
                      className="block w-full px-4 py-4 text-black placeholder-gray-500 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                    />
                  </div>
                </div> */}

                <div className="sm:col-span-2">
                  <label htmlFor="message" className="text-base font-medium text-gray-900">
                    Message
                  </label>
                  <div className="mt-2.5 relative">
                    <textarea
                      name="message"
                      id="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your message here"
                      required
                      className="block w-full px-4 py-4 text-black placeholder-gray-500 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                      rows="4"
                    ></textarea>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center w-full px-4 py-4 mt-2 text-base font-semibold text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:bg-blue-700"
                  >
                    Send
                  </button>
                </div>
              </div>
            </form>

            {responseMessage && (
              <p className="mt-6 text-center text-lg font-medium text-green-500">
                {responseMessage}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};




export default Contact;
