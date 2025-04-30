import express from 'express';
import { loginD, appointmentsD, appointmentCancel, doctorList, changeAvailablity, appointmentComplete, dD, doctorProfile, updateDProfile } from '../controllers/doctorController.js';
import authD from '../middleware/authD.js';
const dRouter = express.Router();

dRouter.post("/login", loginD)
dRouter.post("/cancel-appointment", authD, appointmentCancel)
dRouter.get("/appointments", authD, appointmentsD)
dRouter.get("/list", doctorList)
dRouter.post("/change-availability", authD, changeAvailablity)
dRouter.post("/complete-appointment", authD, appointmentComplete)
dRouter.get("/dashboard", authD, dD)
dRouter.get("/profile", authD, doctorProfile)
dRouter.post("/update-profile", authD, updateDProfile)

export default dRouter;