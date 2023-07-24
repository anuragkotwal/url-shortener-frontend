import "./App.css";
import { React, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";

function App() {
  const [shortenedLink, setShortenedLink] = useState("");
  const [userInput, setUserInput] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/short`,
        { originalUrl: userInput }
      );
      if (!response.data) toast.error("Something went wrong!");
      else {
        if (response.data) {
          setShortenedLink(response.data.data.shortUrl);
        } else {
          toast.error(response.data.data.message);
        }
      }
    } catch (e) {
      if (e.response) toast.error(e.response.data.message);
      else toast.error("Something went wrong!");
    }
  };
  return (
    <div className=" container h-screen flex justify-center items-center">
      <Toaster
        toastOptions={{
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
      <div className="text-center">
        <h1 className="text-2xl font-medium text-blue-500 mb-4">
          <span className="font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            URL Shortener
          </span>
        </h1>
        <div>
          <input
            className="outline-none border-2 border-blue-500 rounded-md backdrop-blur-xl bg-white/20 shadow-md px-3 py-3"
            type="text"
            placeholder="Enter link to be shortened"
            value={userInput}
            onChange={(e) => {
              setUserInput(e.target.value);
            }}
          />
          <button
            className=" bg-blue-500 text-white px-8 py-3 ml-4 rounded-md"
            onClick={() => {
              fetchData();
            }}>
            Submit URL
          </button>
          <div className="mt-5">
            {shortenedLink}
            <CopyToClipboard text={shortenedLink}>
              <button
                className="border-2 border-blue-500 text-blue-500 font-medium px-5 py-2 ml-4 rounded-md"
                onClick={() => toast.success("Short URL copied")}>
                Copy URL to Clipboard
              </button>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
