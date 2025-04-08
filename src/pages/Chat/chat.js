import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";

const Chat = () => {
    const location = useLocation();
    const [prevLocation, setPrevLocation] = useState("");
  
    useEffect(() => {
      setPrevLocation(location.state?.data || "home");
    }, [location]);
  
    const [messages, setMessages] = useState([
      { from: "bot", text: "Hi there! How can I assist you today?" },
    ]);
    const [input, setInput] = useState("");
  
    const handleSend = (e) => {
      e.preventDefault();
      if (!input.trim()) return;
  
      const newMessages = [...messages, { from: "user", text: input }];
      setMessages(newMessages);
      setInput("");
  
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { from: "bot", text: "Thanks for your message! We'll get back to you soon." },
        ]);
      }, 1000);
    };
  
    return (
      <div className="max-w-container mx-auto px-4">
        <Breadcrumbs title="ChatBot" prevLocation={prevLocation} />
        <div className="w-full max-w-2xl mx-auto mt-10 bg-white border border-gray-200 rounded-lg shadow-md p-4 flex flex-col h-[600px]">
          <div className="flex-1 overflow-y-auto mb-4 space-y-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-xl max-w-[80%] text-sm ${
                  msg.from === "bot" ? "bg-gray-100 text-left" : "bg-primeColor text-white self-end text-right"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleSend} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-primeColor"
            />
            <button
              type="submit"
              className="bg-primeColor text-white px-4 py-2 rounded-md hover:bg-black duration-200"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    );
  };

export default Chat;
