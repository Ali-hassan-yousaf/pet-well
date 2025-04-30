// import React, { useState, useEffect, useContext } from "react";
// import { AppContext } from "../context/AppContext";
// import { useNavigate } from "react-router-dom";

// // Convert degrees to radians
// const deg2rad = (deg) => deg * (Math.PI / 180);

// // Calculate distance using the Haversine formula
// const calculateDistance = (lat1, lon1, lat2, lon2) => {
//   const R = 6371; // Radius of Earth in kilometers
//   const dLat = deg2rad(lat2 - lat1);
//   const dLon = deg2rad(lon2 - lon1);
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
//     Math.sin(dLon / 2) * Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c; // Distance in kilometers
// };

// // Extract coordinates from Google Maps URL
// const extractCoordinates = (line1) => {
//   const regex = /q=(-?\d+\.\d+),(-?\d+\.\d+)/; // Extract lat, lon from Google Maps URL
//   const match = line1?.match(regex);
//   if (match) {
//     return { latitude: parseFloat(match[1]), longitude: parseFloat(match[2]) };
//   }
//   return null; // Return null if coordinates not found
// };

// const Doctors = () => {
//   const [pointA, setPointA] = useState({ latitude: "", longitude: "" });
//   const [sortedDoc, setSortedDoc] = useState([]);
//   const [rangeFilter, setRangeFilter] = useState("all"); // Filter by range
//   const { doctors } = useContext(AppContext);
//   const navigate = useNavigate();

//   // Get user's current location
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setPointA({ latitude: latitude.toString(), longitude: longitude.toString() });
//         },
//         (error) => {
//           console.error("Error fetching location:", error);
//           alert("Unable to fetch your location. Please enable location services.");
//         }
//       );
//     } else {
//       alert("Geolocation is not supported by your browser.");
//     }
//   }, []);

//   useEffect(() => {
//     if (!pointA.latitude || !pointA.longitude) return;

//     const filteredDoctors = doctors
//       .map((doc) => {
//         const coordinates = extractCoordinates(doc.address.line1);
//         if (!coordinates) {
//           console.warn(`Invalid address format for doctor: ${doc.name}`);
//           return null;
//         }
//         const { latitude: docLat, longitude: docLon } = coordinates;
//         const distance = calculateDistance(
//           parseFloat(pointA.latitude),
//           parseFloat(pointA.longitude),
//           docLat,
//           docLon
//         );
//         return { ...doc, distance };
//       })
//       .filter((doc) => doc !== null) // Remove invalid entries
//       .filter((doc) => {
//         if (rangeFilter === "all") return true; // No filter
//         const [min, max] = rangeFilter.split("-").map(Number);
//         return doc.distance >= min && doc.distance < max; // Filter by range
//       })
//       .sort((a, b) => a.distance - b.distance); // Sort by distance (nearest first)

//     setSortedDoc(filteredDoctors); // Update sorted list
//   }, [doctors, pointA, rangeFilter]);

//   return (
//     <div>
//       {/* Filter buttons */}
//       <div className="mb-4">
//         <button onClick={() => setRangeFilter("all")} className="p-2 m-2 bg-blue-500 text-white rounded">All</button>
//         <button onClick={() => setRangeFilter("1-10")} className="p-2 m-2 bg-blue-500 text-white rounded">1-10 km</button>
//         <button onClick={() => setRangeFilter("10-15")} className="p-2 m-2 bg-blue-500 text-white rounded">10-15 km</button>
//         <button onClick={() => setRangeFilter("15-20")} className="p-2 m-2 bg-blue-500 text-white rounded">15-20 km</button>
//       </div>

//       <p className="text-gray-600">Saloons sorted by proximity:</p>
//       <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
//         {sortedDoc.length > 0 ? (
//           sortedDoc.map((item, index) => (
//             <div
//               key={index}
//               onClick={() => {
//                 navigate(`/appointment/${item._id}`);
//                 window.scrollTo(0, 0);
//               }}
//               className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
//             >
//               <img className="bg-[#EAEFFF]" src={item.image} alt={item.name} />
//               <div className="p-4">
//                 <div
//                   className={`flex items-center gap-2 text-sm ${item.available ? "text-green-500" : "text-gray-500"}`}
//                 >
//                   <p
//                     className={`w-2 h-2 rounded-full ${item.available ? "bg-green-500" : "bg-gray-500"}`}
//                   ></p>
//                   <p>{item.available ? "Available" : "Not Available"}</p>
//                 </div>
//                 <p className="text-[#262626] text-lg font-medium">{item.name}</p>
//                 {item.distance !== null && (
//                   <p className="text-[#5C5C5C] text-sm">
//                     Distance: {item.distance.toFixed(2)} km
//                   </p>
//                 )}
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No Saloons found near you.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Doctors;
import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

// Convert degrees to radians
const deg2rad = (deg) => deg * (Math.PI / 180);

// Calculate distance using the Haversine formula
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of Earth in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
};

// Extract coordinates from Google Maps URL
const extractCoordinates = (line1) => {
  const regex = /q=(-?\d+\.\d+),(-?\d+\.\d+)/; // Extract lat, lon from Google Maps URL
  const match = line1?.match(regex);
  if (match) {
    return { latitude: parseFloat(match[1]), longitude: parseFloat(match[2]) };
  }
  return null; // Return null if coordinates not found
};

const Doctors = () => {
  const [pointA, setPointA] = useState({ latitude: "", longitude: "" });
  const [sortedDoc, setSortedDoc] = useState([]);
  const [rangeFilter, setRangeFilter] = useState("all"); // Filter by range
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPointA({ latitude: latitude.toString(), longitude: longitude.toString() });
        },
        (error) => {
          console.error("Error fetching location:", error);
          alert("Unable to fetch your location. Please enable location services.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }, []);

  useEffect(() => {
    if (!pointA.latitude || !pointA.longitude) return;

    const filteredDoctors = doctors
      .map((doc) => {
        const coordinates = extractCoordinates(doc.address.line1);
        if (!coordinates) {
          console.warn(`Invalid address format for doctor: ${doc.name}`);
          return null;
        }
        const { latitude: docLat, longitude: docLon } = coordinates;
        const distance = calculateDistance(
          parseFloat(pointA.latitude),
          parseFloat(pointA.longitude),
          docLat,
          docLon
        );
        return { ...doc, distance };
      })
      .filter((doc) => doc !== null) // Remove invalid entries
      .filter((doc) => doc.available) // Filter out unavailable
      .filter((doc) => {
        if (rangeFilter === "all") return true; // No filter
        const [min, max] = rangeFilter.split("-").map(Number);
        return doc.distance >= min && doc.distance < max; // Filter by range
      })
      .sort((a, b) => a.distance - b.distance); // Sort by distance (nearest first)

    setSortedDoc(filteredDoctors); // Update sorted list
  }, [doctors, pointA, rangeFilter]);

  return (
    <div>
      {/* Filter buttons */}
      <div className="mb-4">
        <button onClick={() => setRangeFilter("all")} className="p-2 m-2 bg-blue-500 text-white rounded">All</button>
        <button onClick={() => setRangeFilter("1-10")} className="p-2 m-2 bg-blue-500 text-white rounded">1-10 km</button>
        <button onClick={() => setRangeFilter("10-15")} className="p-2 m-2 bg-blue-500 text-white rounded">10-15 km</button>
        <button onClick={() => setRangeFilter("15-20")} className="p-2 m-2 bg-blue-500 text-white rounded">15-20 km</button>
      </div>

      <p className="text-gray-600">Saloon sorted by proximity:</p>
      <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
        {sortedDoc.length > 0 ? (
          sortedDoc.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                navigate(`/appointment/${item._id}`);
                window.scrollTo(0, 0);
              }}
              className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
            >
              <img className="bg-[#EAEFFF]" src={item.image} alt={item.name} />
              <div className="p-4">
                <div
                  className={`flex items-center gap-2 text-sm ${item.available ? "text-green-500" : "text-gray-500"}`}
                >
                  <p
                    className={`w-2 h-2 rounded-full ${item.available ? "bg-green-500" : "bg-gray-500"}`}
                  ></p>
                  <p>{item.available ? "Available" : "Not Available"}</p>
                </div>
                <p className="text-[#262626] text-lg font-medium">{item.name}</p>
                {item.distance !== null && (
                  <p className="text-[#5C5C5C] text-sm">
                    Distance: {item.distance.toFixed(2)} km
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No Saloon found near you.</p>
        )}
      </div>
    </div>
  );
};

export default Doctors;
