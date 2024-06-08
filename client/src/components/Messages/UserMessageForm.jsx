import React, { useState } from "react";
import axios from "axios";

const UserMessageForm = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("/api/messages", { message });
      setResponse(result.data.message);
      setMessage("");
    } catch (error) {
      setResponse("Failed to send message");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send Message</button>
      </form>
      {response && <p>{response}</p>}
    </div>
  );
};

export default UserMessageForm;
