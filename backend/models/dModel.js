// import mongoose from "mongoose";

// const dSchema = new mongoose.Schema(
//     {
//         name: { type: String, required: true },
//         email: { type: String, required: true, unique: true },
//         password: { type: String, required: true },
//         image: { type: String, required: true },
//         speciality: { type: String, required: true },
//         degree: { type: String, required: true },
//         experience: { type: String, required: true },
//         about: { type: String, required: true },
//         available: { type: Boolean, default: true },
//         fees: { type: Number, required: true },
//         slots_booked: { type: Object, default: {} },
//         services: { type: Array, default: [] },
//         address: { type: Object, required: true },
//         date: { type: Number, required: true },
//     },
//     { minimize: false }
// );

// const doctorModel = mongoose.models.doctor || mongoose.model("doctor", dSchema);
// export default doctorModel;



import mongoose from "mongoose";

const dSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        image: { type: String, required: true },
        speciality: { type: Object, required: true },
        degree:  { type: String, required: true },
        experience: { type: Array, required: true },
        about: { type: String, required: true },
        available: { type: Boolean, default: true },
        fees: { type: Number, required: true },
        slots_booked: { type: Object, default: {} },
        services: { type: Array, default: [] },
        address: { type: Object, required: true },
        workers: { type: Array, default: [] },
        date: { type: Number, required: true },
    },
    { minimize: false }
);

const doctorModel = mongoose.models.doctor || mongoose.model("doctor", dSchema);
export default doctorModel;



