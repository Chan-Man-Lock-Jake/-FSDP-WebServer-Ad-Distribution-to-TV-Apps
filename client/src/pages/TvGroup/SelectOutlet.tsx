import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CreateTvGroup.css";

type OutletInfo = {
  OutletId: string;
  Company: string;
  OutletName: string;
  TotalTv: string;
};

type SelectOutletProps = {
  selectedOutlet: string | null;
  setSelectedOutlet: React.Dispatch<React.SetStateAction<string | null>>;
  selectedTvs: { [outletId: string]: string[] };
  setSelectedTvs: React.Dispatch<React.SetStateAction<{ [outletId: string]: string[] }>>;
  handleNext: () => void; 
};

const SelectOutlet: React.FC<SelectOutletProps> = ({
  selectedOutlet,
  setSelectedOutlet,
  selectedTvs,
  setSelectedTvs,
}) => {
  const [outlets, SetOutlets] = useState<OutletInfo[]>([]); // store outlets fetched from dynamodb
  // const [selectedOutlet, setSelectedOutlet] = useState<string | null>(null); // store the selected outlet id
  // const [selectedTvs, setSelectedTvs] = useState<string[]>([]) // store the selected tv id
  const navigate = useNavigate();

  // fetch outlets on component mount
  useEffect(() => {
    const fetchOutlets = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/admin/get-outlets`
        );
        //console.log("Fetched outlets:", response.data);
        if (Array.isArray(response.data)) {
          SetOutlets(response.data);
        } else {
          console.error("API response is not an array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching outlets:", error);
      }
    };

    fetchOutlets();
  }, []);

  //handle outlet selection w/o clearing tv selections
  const handleSelectOutlet = (outletId: string) => {
    if (selectedOutlet === outletId) {
      // deselect the outlet
      setSelectedOutlet(null);
    } else {
      setSelectedOutlet(outletId);
    }
  };

  // navigate to the next pg w selected data
  const handleNext = () => {
    if (!selectedOutlet && Object.keys(selectedTvs).length === 0) {
      alert("Please select an outlet or at least one TV.");
      return;
    }
    navigate("/admin/submit-group-details", {
      state: {selectedOutlet, selectedTvs},
    });
  };

  const handleTvSelection = (updatedTvs: string[], outletId: string) => {
    setSelectedTvs((prev) => ({
      ...prev, 
      [outletId]: updatedTvs
    }));
  };

  // handle clicking the card to fetch tvs
  const handleCardClick = (outletId: string) => {
    //console.log(`Navigating to /select-tvs/${outletId}`);
    navigate(`/admin/select-tvs/${outletId}`, {
      state: { selectedTvs: selectedTvs[outletId] || [] }
    })
  };

  return (
    <div className="select-outlet">
      <h2>Select TV</h2>
      <div className="outlet-list">
        {outlets.map((outlet) => (
          <div
            key={outlet.OutletId}
            className="outlet"
          >
            <label>
              <input
                type="radio"
                name="outlet"
                value={outlet.OutletId}
                checked={selectedOutlet === outlet.OutletId}
                onChange={() => handleSelectOutlet(outlet.OutletId)} // handle radio btn selection
                onClick={(e) => e.stopPropagation()} // prevent card click propagation
              />
              <span id="outlet-name" onClick={() =>handleCardClick(outlet.OutletId) }>{outlet.OutletName}</span>
              <span id="outlet-totaltv">{outlet.TotalTv} TV</span>
            </label>
          </div>
        ))}
      </div>
      <button className="next-btn" onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default SelectOutlet;

// {Array.isArray(outlets) && outlets.length > 0 ? (
//     outlets.map((outlet) => (
//       <div key={outlet.OutletId} className="outlet">
//         <label>
//           <input
//             type="radio"
//             name="outlet"
//             value={outlet.OutletId}
//             onChange={() => handleSelectOutlet(outlet.OutletId)} // circle for selecting all TVs
//             checked={selectedOutlet === outlet.OutletId}
//             onClick={(e) => e.stopPropagation()} // prevent propagation to card click
//           />
//           <span className="outlet-name" onClick={() => handleCardClick(outlet.OutletId)}>{outlet.OutletName}</span>
//           <span id="outlet-totaltv"> {outlet.TotalTv} TV</span>
//         </label>
//         {/* display tvs if the outlet is selected */}
//         {selectedOutlet === outlet.OutletId && Array.isArray(outlet.Tvs) && (
//           <div className="tvs">
//             {outlet.Tvs.map((tv) => (
//               <div key="{tv.TvId}" className="tv">
//                 <p>
//                   {tv.TvName} - {tv.TvDimension}
//                 </p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     ))
//   ) : (
//     <p>No outlets available</p>
//   )}
