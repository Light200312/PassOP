import { useState, useRef, useEffect } from "react";
import Navbar from "./components/Navbar";
import Manager from "./components/manager";
import Footer from "./components/Footer";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

import { ToastContainer, toast } from "react-toastify";

function App() {
  let ref = useRef();
  let passref = useRef();
  const [passwordarray, setpasswordarray] = useState([]);

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => toast("Copied to Clipboard")) // Success message
      .catch((err) => console.error("Failed to copy:", err));
  };
  useEffect(() => {
    let Passwords = localStorage.getItem("passwords");
    if (Passwords) {
      setpasswordarray(JSON.parse(Passwords));
    }
  }, []);

  const savepassword = () => {
   if(form.website!="" && form.username!="" && form.password!=""){
    
    setpasswordarray([...passwordarray, { ...form, id: uuidv4() }]);
    // console.log(passwordarray)
    localStorage.setItem(
      "passwords",
      JSON.stringify([...passwordarray, { ...form, id: uuidv4() }])
    );
    setform({ website: "", username: "", password: "" });}
  };

  const Deletepassword = (id) => {
    setpasswordarray(passwordarray.filter((item) => item.id !== id));
    // console.log(passwordarray)
    localStorage.setItem(
      "passwords",
      JSON.stringify(passwordarray.filter((item) => item.id !== id))
    );
    setform({ website: "", username: "", password: "" });
  };
  
  const editpassword = (id) => {
    setform(passwordarray.filter((item) => item.id === id)[0]);
    setpasswordarray(passwordarray.filter((item) => item.id !== id));
    // console.log(passwordarray)
    // localStorage.setItem(
    //   "passwords",
    //   JSON.stringify(passwordarray.filter((item) => item.id !== id))
    // );
    // setform({ website: "", username: "", password: "" });
  };


  const handleclick = () => {
    passref.current.type = "text";

    if (ref.current.src.includes("eyeoff.png")) {
      ref.current.src = "/eye.png";
      passref.current.type = "text";
    } else {
      ref.current.src = "/eyeoff.png";
      passref.current.type = "password";
    }
  };

  const [form, setform] = useState({ website: "", username: "", password: "" });

  const handlechange = (e) => {
    console.log(form);
    setform({ ...form, [e.target.name]: e.target.value });
    //  console.log( form)
  };

  return (
    <>
      <ToastContainer />
      <Navbar />
      <Manager />
      <div className=" mt-[50px] lg:w-[70%] md:w-[80%] sm:w-[90%] mx-auto   ">
        <div className=" flex flex-col gap-4 p-8 text-white">
          <div className="flex justify-center items-center w-full gap-3 text-[2em] flex-col mb-[9px] ">
            
            <div className="logo font-bold   ">
              <span className="text-[#6433e0]">&lt; </span>
              <span>Pass</span>
              <span className="text-[#5f33e0]"> OP/&gt;</span>
            </div>
            <p className="text-center text-xl md:text-2xl">This is your own Password Manager</p>
          </div>
          {/* <label htmlFor="website">Website URL</label> */}

          <input
            id="website"
            value={form.website}
            onChange={handlechange}
            name="website"
            className="border-2 bg-[#5b2ed9] border-[#9a83db] outline-none  focus:ring-3 focus:ring-[#7a33ff] rounded-full px-3 py-1"
            type="text"
            placeholder="websiteURL"
          />

          <div className="flex justify-around gap-8">
            {/* <label htmlFor="username">Username</label> */}
            <input
              name="username"
              value={form.username}
              onChange={handlechange}
              type="text"
              placeholder="username"
              id="username"
              className="bg-[#5b2ed9] border-2 border-[#9a83db] outline-none  focus:ring-3 focus:ring-[#7a33ff] rounded-full px-3 py-1 w-1/2"
            />
            {/* <label htmlFor="password">Password</label> */}
            <div className="relative w-1/2">
              <input
                ref={passref}
                value={form.password}
                onChange={handlechange}
                name="password"
                type="password"
                id="password"
                placeholder="password"
                className=" bg-[#5b2ed9] border-2 border-[#9a83db] outline-none  focus:ring-3 focus:ring-[#7a33ff] rounded-full px-3 py-1  w-full absolute"
              />
              <span className="text-white absolute top-1 right-2 ">
                <img
                  value={form.password}
                  onChange={handlechange}
                  ref={ref}
                  width={28}
                  src="/eyeoff.png"
                  alt=""
                  onClick={handleclick}
                />
              </span>
            </div>
          </div>
          <button
            onClick={savepassword}
            className="flex justify-center  gap-2 items-center bg-[#461bc9] w-fit px-3 py-1 rounded-full hover:bg-[#461bc9d4]  active:ring-white active:ring-1"
          >
            <lord-icon
              src="https://cdn.lordicon.com/sbnjyzil.json"
              trigger="hover"
              stroke="bold"
              colors="primary:#ffffff,secondary:#f4f19c"
            ></lord-icon>
            Password
          </button>
        </div>
        <div className="passwardbank w-full flex justify-center">
          {passwordarray.length === 0 && (
            <div className="text-white"> No passwords to show</div>
          )}
          {passwordarray.length !== 0 && (
  <div className="overflow-x-auto">
    <table className="table-auto text-sm sm:text-md text-white border-collapse border border-[#5f33e0] w-full rounded-lg">
      <thead className="bg-[#5f33e0] text-white">
        <tr className="border border-[#5f33e0]">
          <th className="py-1 px-2 sm:px-3 md:px-4 text-xs sm:text-sm md:text-base">Website</th>
          <th className="py-1 px-2 sm:px-3 md:px-4 text-xs sm:text-sm md:text-base">Username</th>
          <th className="py-1 px-2 sm:px-3 md:px-4 text-xs sm:text-sm md:text-base">Passwords</th>
          <th className="py-1 px-2 sm:px-3 md:px-4 text-xs sm:text-sm md:text-base">Actions</th>
        </tr>
      </thead>
      {passwordarray.length !== 0 && (
        <>
          {passwordarray.map((item, index) => {
            return (
              <tbody key={index} className="text-center">
                <tr>
                  <td className="border border-[#5f33e0] p-2 sm:p-3 md:p-4 max-w-[100px] sm:max-w-[150px] md:max-w-[200px] break-words text-xs sm:text-sm md:text-base">
                    <div className="flex justify-center items-center gap-1 sm:gap-2">
                      <a href={item.website} className="truncate">{item.website}</a>
                      <div
                        onClick={() => {
                          copyToClipboard(item.website);
                        }}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/jectmwqf.json"
                          trigger="hover"
                          stroke="bold"
                          state="hover-squeeze"
                          colors="primary:#a866ee,secondary:#ffffff"
                          style={{ width: '20px', height: '20px' }} // Fixed size for consistency
                        ></lord-icon>
                      </div>
                    </div>
                  </td>
                  <td className="border border-[#5f33e0] p-2 sm:p-3 md:p-4 max-w-[80px] sm:max-w-[120px] md:max-w-[150px] break-words text-xs sm:text-sm md:text-base">
                    {item.username}
                  </td>
                  <td className="border border-[#5f33e0] p-2 sm:p-3 md:p-4 text-xs sm:text-sm md:text-base">
                    <div
                      onClick={() => {
                        copyToClipboard(item.password);
                      }}
                      className="flex justify-center items-center gap-1 sm:gap-2"
                    >
                      <img
                        width={30} // Slightly smaller for small screens
                        src="key.png"
                        alt="key icon"
                        className="w-6 sm:w-8 md:w-10" // Responsive icon size
                      />
                      <lord-icon
                        src="https://cdn.lordicon.com/jectmwqf.json"
                        trigger="hover"
                        stroke="bold"
                        state="hover-squeeze"
                        colors="primary:#a866ee,secondary:#ffffff"
                        style={{ width: '20px', height: '20px' }} // Fixed size for consistency
                      ></lord-icon>
                    </div>
                  </td>
                  <td className="border border-[#5f33e0] flex gap-2 sm:gap-3 md:gap-4 justify-center p-2 sm:p-3 md:p-4 items-center">
                    <button
                      onClick={() => Deletepassword(item.id)}
                      className=""
                    >
                      <img
                        src="delete.png"
                        alt="delete icon"
                        className="w-5 sm:w-6 md:w-7" // Responsive icon size
                      />
                    </button>
                    <button
                      onClick={() => editpassword(item.id)}
                      className=""
                    >
                      <img
                        src="edit.png"
                        alt="edit icon"
                        className="w-5 sm:w-6 md:w-7" // Responsive icon size
                      />
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </>
      )}
    </table>
  </div>
)}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
