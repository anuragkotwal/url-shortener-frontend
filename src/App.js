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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex justify-center items-center p-4">
      <Toaster
        toastOptions={{
          style: {
            background: "#1f2937",
            color: "#f9fafb",
            borderRadius: "12px",
            border: "1px solid #374151",
            fontSize: "14px",
          },
        }}
      />

      {/* Main Card */}
      <div className="w-full max-w-2xl">
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="mb-4">
              <span className="inline-block p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.102m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                URL Shortener
              </span>
            </h1>
            <p className="text-gray-600 mt-3 text-lg">
              Transform long URLs into short, shareable links
            </p>
          </div>

          {/* Input Section */}
          <div className="space-y-6">
            <div className="relative">
              <input
                className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm placeholder-gray-500"
                type="text"
                placeholder="Paste your long URL here..."
                value={userInput}
                onChange={(e) => {
                  setUserInput(e.target.value);
                }}
              />
            </div>

            <button
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 text-lg"
              onClick={() => {
                fetchData();
              }}
            >
              <span className="flex items-center justify-center space-x-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <span>Shorten URL</span>
              </span>
            </button>

            {/* Result Section */}
            {shortenedLink && (
              <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border border-green-200/50 animate-fade-in">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Your shortened URL is ready!
                </h3>

                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <div className="flex-1 min-w-0">
                    <a
                      href={shortenedLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 bg-white rounded-xl border border-gray-200 text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition-all duration-200 break-all text-lg font-medium"
                    >
                      {shortenedLink}
                    </a>
                  </div>

                  <CopyToClipboard text={shortenedLink}>
                    <button
                      className="flex items-center space-x-2 bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-600 font-medium px-6 py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                      onClick={() =>
                        toast.success("Short URL copied to clipboard!")
                      }
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                      <span>Copy</span>
                    </button>
                  </CopyToClipboard>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p className="text-sm">
            Fast, secure, and reliable URL shortening service
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
