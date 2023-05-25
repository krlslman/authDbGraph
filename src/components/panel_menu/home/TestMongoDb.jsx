import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStateContext } from "@/context/StateContext";

const TestMongoDb = () => {
  const [input, setInput] = useState("")
  const [datam, setDatam] = useState([]);
  const { isConnected, setIsConnected } = useStateContext();

  useEffect(() => {
    axios
      .get("/api/get_tableData")
      .then((res) => {
        setIsConnected(res.data.isConnected); // update client side isConnected
        setDatam(res.data.datam);
      })
      .catch((err) => console.error(err));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/set_tableData", { dataFromUi: input })
      .then(() => {
        console.log("Data submitted successfully");
        setInput("");
        // Trigger any necessary UI updates
      })
      .catch((error) => {
        console.log("Error adding data:", error.message);
        // Handle the error and display appropriate feedback to the user
      });
  };

  return (
    <div>
      {/* {datam ? (
        datam.map((item) => (
          <>
            <p>{item.city}</p>
          </>
        ))
      ) : (
        <div>NO DATA</div>
      )}

      {isConnected ? (
        <h2 className="subtitle">You are connected to MongoDB</h2>
      ) : (
        <h2 className="subtitle">
          You are NOT connected to MongoDB. Check the <code>README.md</code> for
          instructions.
        </h2>
      )}

      <form onSubmit={handleSubmit} className="m-20">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="btn">
          Send
        </button>
      </form> */}
    </div>
  );
};

export default TestMongoDb;
