import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";

const AddD = () => {
    const [docImg, setDocImg] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fees, setFees] = useState("");
    const [about, setAbout] = useState("");
    const [name, setName] = useState("");
    const [address1, setAddress1] = useState("");
    const [services, setServices] = useState([]);
    const [workers, setWorkers] = useState([""]); // Only worker names
    const { backendUrl } = useContext(AppContext);
    const { aToken } = useContext(AdminContext);

    // Hardcoded values for unused fields
    const speciality = "NAN";
    const degree =  "nab";
    const experience = "NAN";

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            if (!docImg) {
                return toast.error("Image Not Selected");
            }

            const formData = new FormData();
            formData.append("image", docImg);
            formData.append("name", name);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("experience",experience); // Hardcoded
            formData.append("fees", Number(fees));
            formData.append("about", about);
            formData.append("speciality",speciality); // Hardcoded
            formData.append("degree", degree); // Hardcoded
            formData.append("address", JSON.stringify({ line1: address1 }));
            formData.append("services", JSON.stringify(services));
            formData.append("workers", JSON.stringify(workers)); // Send only worker names

          
            const { data } = await axios.post(backendUrl + "/api/admin/add-Saloon", formData, {
                headers: { aToken },
            });

            if (data.success) {
                toast.success(data.message);
                setDocImg(null);
                setEmail("");
                setName("");
                setPassword("");
                setAddress1("");
                setAbout("");
                setFees("");
                setServices([]);
                setWorkers([""]); // Reset worker list
            } else {
                toast.error(error.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.error(error);
        }
    };

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    const link = `https://www.google.com/maps?q=${pos.lat},${pos.lng}`;
                    setAddress1(link);
                },
                () => {
                    alert("Error: Unable to fetch your location.");
                }
            );
        } else {
            alert("Error: Geolocation is not supported by your browser.");
        }
    };

    const handleAddService = () => {
        setServices([...services, { service: "", fee: "" }]);
    };

    const handleServiceChange = (e, index) => {
        const updatedServices = [...services];
        updatedServices[index].fee = e.target.value;
        setServices(updatedServices);
    };

    const handleServiceNameChange = (e, index) => {
        const updatedServices = [...services];
        updatedServices[index].service = e.target.value;
        setServices(updatedServices);
    };

    const handleAddWorker = () => {
        setWorkers([...workers, ""]); // Add an empty string for a new worker name
    };

    const handleWorkerChange = (e, index) => {
        const updatedWorkers = [...workers];
        updatedWorkers[index] = e.target.value;
        setWorkers(updatedWorkers);
    };

    const handleDeleteService = (index) => {
        const updatedServices = services.filter((_, i) => i !== index);
        setServices(updatedServices);
    };

    const handleDeleteWorker = (index) => {
        const updatedWorkers = workers.filter((_, i) => i !== index);
        setWorkers(updatedWorkers);
    };

    return (
        <form onSubmit={onSubmitHandler} className="m-5 w-full">
            <p className="mb-3 text-2xl font-semibold text-gray-700">Add Saloon</p>
            <div className="bg-white px-8 py-8 border rounded-xl w-full max-w-4xl shadow-lg">
                <div className="flex items-center gap-4 mb-8 text-gray-500">
                    <label htmlFor="doc-img">
                        <img
                            className="w-24 h-24 bg-gray-100 rounded-full cursor-pointer object-cover"
                            src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                            alt="Saloon"
                        />
                    </label>
                    <input
                        onChange={(e) => setDocImg(e.target.files[0])}
                        type="file"
                        id="doc-img"
                        hidden
                    />
                    <p className="text-sm">Upload Saloon Picture</p>
                </div>
                <div className="space-y-6">
                <input
                     type="text"
                         placeholder="Saloon Name"
                         value={name}
                         onChange={(e) => setName(e.target.value)}
                         className="w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                     />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                        placeholder="About Saloon"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        className="w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={4}
                    />
                    <div>
                        <button
                            type="button"
                            onClick={getLocation}
                            className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Get Current Location
                        </button>
                        <input
                            type="text"
                            placeholder="Address"
                            value={address1}
                            onChange={(e) => setAddress1(e.target.value)}
                            className="w-full mt-3 py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Service Section */}
                    <div className="space-y-4">
                        <button
                            type="button"
                            onClick={handleAddService}
                            className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            Add Service
                        </button>
                        {services.map((service, index) => (
                            <div key={index} className="flex gap-4">
                                <input
                                    type="text"
                                    placeholder="Service Name"
                                    value={service.service}
                                    onChange={(e) => handleServiceNameChange(e, index)}
                                    className="w-1/2 py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="number"
                                    placeholder="Service Fee"
                                    value={service.fee}
                                    onChange={(e) => handleServiceChange(e, index)}
                                    className="w-1/2 py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleDeleteService(index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Worker Section */}
                    <div className="space-y-4">
                        <button
                            type="button"
                            onClick={handleAddWorker}
                            className="py-2 px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                            Add Worker
                        </button>
                        {workers.map((worker, index) => (
                            <div key={index} className="flex gap-4">
                                <input
                                    type="text"
                                    placeholder="Worker Name"
                                    value={worker}
                                    onChange={(e) => handleWorkerChange(e, index)}
                                    className="w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleDeleteWorker(index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    className="mt-6 py-3 px-6 bg-blue-600 text-white text-xl font-semibold rounded-lg w-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Add Saloon
                </button>
            </div>
        </form>
    );
};

export default AddD;
