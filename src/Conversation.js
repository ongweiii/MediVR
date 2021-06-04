import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { getConversation } from "./Api";

export default function Conversation() {
  let { id } = useParams();
  const [chat, setChat] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [visibility, setVisibility] = useState([]);
  useEffect(() => {
    getConversation(id).then((data) => {
      setChat(data);
      setLoaded(true);
      setVisibility(new Array(data.length).fill(false));
    });
  }, []);

  const toggle = (index) => {
    let newVisibility = [...visibility];
    newVisibility[index] = !newVisibility[index];
    setVisibility(newVisibility);
  };

  return (
    <div className="container">
      <h1 className="text-center p-4">MediVR Core</h1>
      <h5>Conversation for {id}</h5>
      {loaded ? (
        chat.map((item, index) => (
          <div key={index} className="my-2 bg-light p-2 rounded border">
            <div
              className="btn btn-block text-left"
              onClick={() => toggle(index)}
            >
              <h6>Session #{chat.length - index}</h6>
              <small className="text-muted">
                {moment(item.timestamp * 1000).format("Do MMM YYYY, h:mma")}
              </small>
            </div>
            {visibility[index] ? (
              <div>
                <hr />
                {item.data.map((item2, index2) => (
                  <div
                    key={index2}
                    className={`d-flex flex-row justify-content-${
                      item2.event === "bot" ? "start" : "end"
                    } align-items-center `}
                  >
                    <div
                      style={{
                        maxWidth: "75%"
                      }}
                      className={`text-${
                        item2.event === "bot" ? "left" : "right"
                      }`}
                    >
                      <div
                        className="bg-primary text-white p-2"
                        style={{
                          borderTopLeftRadius: 12,
                          borderTopRightRadius: 12,
                          borderBottomLeftRadius:
                            item2.event === "bot" ? 0 : 12,
                          borderBottomRightRadius:
                            item2.event === "bot" ? 12 : 0
                        }}
                      >
                        <span className="h6">{item2.event}</span>
                        <br />
                        <span className="text-end">{item2.text}</span>
                        <br />
                      </div>

                      <small className="text-muted">
                        {moment(item2.timestamp * 1000).format("h:mma")}
                      </small>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        ))
      ) : (
        <h6>Loading...</h6>
      )}
    </div>
  );
}
