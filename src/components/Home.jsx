// import React, { useEffect, useState } from "react";
// import { useSearchParams, } from "react-router-dom";
// import { addToPastes, updateToPastes } from "../redux/pasteSlice";
// import { useDispatch, useSelector } from "react-redux";



// const Home = () => {
//   const [title, setTitle] = useState("");
//   const [value, setValue] = useState("");
//   const [searchParams, setSearchParams] = useSearchParams();
//   const pasteId = searchParams.get("pasteId");
//   const dispatch = useDispatch();
//   const allPastes = useSelector((state) => state.paste.pastes);

//   useEffect(() => {
//     if(pasteId) {
//       const paste = allPastes.find((p) => p._id === pasteId);
//       console.log("Page Found");
//       setTitle(paste.title);
//       setValue(paste.content);
//     }
//   })

//   function CreatePaste() {
//     const paste = {
//           title: title,
//           content: value,
//           _id: pasteId || Date.now().toString(36),
//           createdAt:new Date().toISOString(),
//     }
//     if (pasteId) {
//       //updated
//       dispatch(updateToPastes(paste));

//     }
//     else {
//       //Create
//       dispatch(addToPastes(paste));

//       }
//       //After Creation or Updation
//       setTitle('');
//       setValue('');
//       setSearchParams([]);
    
//   }

//   return (
//     <div>
//       <div className="flex flex-row gap-7 place-content-between">
//         <input
//           className="p-1 rounded-2xl mt-2 w-[66%] pl-4"
//           type="text"
//           placeholder="enter the Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <button onClick={CreatePaste} className="p-2 rounded-2xl mt-2">
//           {pasteId ? "Update MY Paste" : "Create My Paste"}
//         </button>
//       </div>
//       <div>
//         <textarea
//           className="rounded-2xl mt-4, min-w-[500px] p-4"
//           value={value}
//           placeholder="enter content here"
//           onChange={(e) => setValue(e.target.value)}
//           rows={20}
//         />
//       </div>
//     </div>
//   );
// };

// export default Home;

// // http://localhost:5173/?pasteId=ptyuio12  -> URL to Access


import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom"; // Added useNavigate for redirection
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const navigate = useNavigate(); // For redirecting after creation/update
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, allPastes]); // Add pasteId and allPastes to dependency array

  function handlePasteSubmit() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      // Update existing paste
      dispatch(updateToPastes(paste));
      // Redirect to the updated paste view
      navigate(`/pastes/${pasteId}`);
    } else {
      // Create new paste
      dispatch(addToPastes(paste));
      // Redirect to the new paste view or home page
      navigate(`/pastes/${paste._id}`);
    }

    // Clear the form after submission
    setTitle('');
    setValue('');
    setSearchParams({}); // Reset search params, clears the URL query string
  }

  return (
    <div>
      <div className="flex flex-row gap-7 place-content-between">
        <input
          className="p-1 rounded-2xl mt-2 w-[66%] pl-4"
          type="text"
          placeholder="Enter the Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={handlePasteSubmit} className="p-2 rounded-2xl mt-2">
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>
      <div>
        <textarea
          className="rounded-2xl mt-4, min-w-[500px] p-4"
          value={value}
          placeholder="Enter content here"
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  );
};

export default Home;
