// import jwt from "jsonwebtoken";
// import appointmentModel from "../models/appointmentModel.js";
// import dModel from "../models/dModel.js";
// import bcrypt from "bcrypt";
// import validator from "validator";
// import { v2 as cloudinary } from "cloudinary";
// import userModel from "../models/userModel.js";

// // API for admin login
// const loginAdmin = async (req, res) => {
//     try {

//         const { email, password } = req.body

//         if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
//             const token = jwt.sign(email + password, process.env.JWT_SECRET)
//             res.json({ success: true, token })
//         } else {
//             res.json({ success: false, message: "Invalid credentials" })
//         }

//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: error.message })
//     }

// }


// // API to get all appointments list
// const appointmentsAdmin = async (req, res) => {
//     try {

//         const appointments = await appointmentModel.find({})
//         res.json({ success: true, appointments })

//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: error.message })
//     }

// }

// // API for appointment cancellation
// const appointmentCancel = async (req, res) => {
//     try {

//         const { appointmentId } = req.body
//         await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

//         res.json({ success: true, message: 'Appointment Cancelled' })

//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: error.message })
//     }

// }



// const addD = async (req, res) => {
//     try {
//         const { name, email, password, speciality, degree, experience, about, fees, address, services } = req.body;
//         const imageFile = req.file;

//         if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address|| !services|| !services.length===0) {
//             return res.json({ success: false, message: "Missing Details" });
//         }

//         if (!validator.isEmail(email)) {
//             return res.json({ success: false, message: "Please enter a valid email" });
//         }

//         if (password.length < 8) {
//             return res.json({ success: false, message: "Please enter a strong password" });
//         }

//         const existingD = await dModel.findOne({ email });
//         if (existingD) {
//             return res.json({ success: false, message: "Email already exists" });
//         }
        
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
//         const imageUrl = imageUpload.secure_url;

//         const newD = new dModel({
//             name,
//             email,
//             image: imageUrl,
//             password: hashedPassword,
//             speciality,
//             degree,
//             experience,
//             about,
//             fees,
//             address: JSON.parse(address),
//             services: JSON.parse(services),
//             date: Date.now(),
//         });

//         await newD.save();
//         res.json({ success: true, message: "Saloon added successfully!" });
//     } catch (error) {
//      res.json({ success: false, message: error.message });

// }
// };

// export default addD;





// // API to get all Saloon list for admin panel
// const allD = async (req, res) => {
//     try {

//         const doctors = await dModel.find({}).select('-password')
//         res.json({ success: true, doctors })

//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: error.message })
//     }
// }

// // API to get dashboard data for admin panel
// const adminDashboard = async (req, res) => {
//     try {

//         const doctors = await dModel.find({})
//         const users = await userModel.find({})
//         const appointments = await appointmentModel.find({})

//         const dashData = {
//             doctors: doctors.length,
//             appointments: appointments.length,
//             patients: users.length,
//             latestAppointments: appointments.reverse()
//         }

//         res.json({ success: true, dashData })

//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: error.message })
//     }
// }

// export {
//     loginAdmin,
//     appointmentsAdmin,
//     appointmentCancel,
//     addD,
//     allD,
//     adminDashboard
// }



import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import dModel from "../models/dModel.js";
import bcrypt from "bcrypt";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/userModel.js";

// API for admin login
const loginAdmin = async (req, res) => {
    try {

        const { email, password } = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}


// API to get all appointments list
const appointmentsAdmin = async (req, res) => {
    try {

        const appointments = await appointmentModel.find({})
        res.json({ success: true, appointments })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API for appointment cancellation
const appointmentCancel = async (req, res) => {
    try {

        const { appointmentId } = req.body
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        res.json({ success: true, message: 'Appointment Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}



const addD = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address, services,workers } = req.body;
        const imageFile = req.file;

        if (!name || !email || !password || !speciality || !experience || !about || !fees || !address|| !services|| !services.length===0||!workers) {
            return res.json({ success: false, message: "Missing Details" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        const existingD = await dModel.findOne({ email });
        if (existingD) {
            return res.json({ success: false, message: "Email already exists" });
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        const newD = new dModel({
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            services: JSON.parse(services),
            workers: JSON.parse(workers),
            date: Date.now(),
        });

        await newD.save();
        res.json({ success: true, message: "added successfully!" });
    } catch (error) {
     res.json({ success: false, message: error.message });

}
};

export default addD;

// API to get all Saloon list for admin panel
const allD = async (req, res) => {
    try {

        const doctors = await dModel.find({}).select('-password')
        res.json({ success: true, doctors })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get dashboard data for admin panel
const adminDashboard = async (req, res) => {
    try {

        const doctors = await dModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData = {
            doctors: doctors.length,
            appointments: appointments.length,
            patients: users.length,
            latestAppointments: appointments.reverse()
        }

        res.json({ success: true, dashData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export {
    loginAdmin,
    appointmentsAdmin,
    appointmentCancel,
    addD,
    allD,
    adminDashboard
}
