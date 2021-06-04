import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { getChecklist, getChecklistTemplate } from "./Api";

export default function Checklist() {
  let { id } = useParams();
  const [checklist, setChecklist] = useState([]);
  const [checklistTemplate, setChecklistTemplate] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [visibility, setVisibility] = useState([]);

  useEffect(() => {
    getChecklistTemplate().then((data) => {
      setChecklistTemplate(data);
    });
    getChecklist(id).then((data) => {
      setChecklist(data);
      setLoaded(true);
      setVisibility(new Array(data.length).fill(false));
    });
  }, []);

  const toggle = (index) => {
    let newVisibility = [...visibility];
    newVisibility[index] = !newVisibility[index];
    setVisibility(newVisibility);
  };

  const renderSection = (section, list) => {
    return (
      <div className="mb-3">
        <h6>Section {section}</h6>
        {checklistTemplate[section].map((check) => (
          <div className="d-flex flex-row">
            <input
              className="m-2"
              type="checkbox"
              checked={checkActionInSession(list, check["intent"])}
            />
            <span className={check.isCompulsory ? "font-weight-bold" : ""}>
              {check.description}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const checkActionInSession = (list, actionName) => {
    console.log(list);
    return list.some((el) => el["action"] === actionName);
  };

  return (
    <div className="container">
      <h1 className="text-center p-4">MediVR Core</h1>
      <h5>Checklist for {id}</h5>
      {loaded ? (
        checklist.map((item, index) => (
          <div key={index} className="my-2 bg-light p-2 rounded border">
            <div
              className="btn btn-block text-left"
              onClick={() => toggle(index)}
            >
              <h6>Session #{checklist.length - index}</h6>
              <small className="text-muted">
                {moment(item.timestamp * 1000).format("Do MMM YYYY, h:mma")}
              </small>
            </div>
            {visibility[index] ? (
              <div className="p-2">
                {renderSection("1.Demo", item.data)}
                {renderSection("2. PS", item.data)}
                {renderSection("4. DTH", item.data)}
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
