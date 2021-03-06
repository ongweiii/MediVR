import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import moment from "moment";
import logo from './images/MediVRLogoWhite.png';
import {
  getConversation,
  getChecklist,
  getChecklistTemplate,
  deleteSession
} from "./Api";
export default function SessionDetail() {
  let { id, ts } = useParams();

  const [convo, setConvo] = useState([]);
  const [convoLoaded, setConvoLoaded] = useState(false);
  const [checklist, setChecklist] = useState([]);
  const [checklistTemplate, setChecklistTemplate] = useState({});
  const [checklistLoaded, setChecklistLoaded] = useState(false);
  const history = useHistory();
  useEffect(() => {
    getConversation(id, ts).then((data) => {
      setConvo(data);
      setConvoLoaded(true);
    });
    getChecklistTemplate().then((data) => {
      setChecklistTemplate(data);
      getChecklist(id, ts).then((data2) => {
        setChecklist(data2);
        setChecklistLoaded(true);
      });
    });
  }, []);
  
  const sessionDuration = (convoList) => {
    var start = convoList[0].timestamp;
    var end = convoList[convoList.length-1].timestamp;
    var duration = moment(end).diff(start);
    var formatted = moment.utc(duration*1000).format('mm:ss');
    return(
      <p className="session-duration">Session duration : {formatted}</p>
    )
  }
  
  const renderSession = (id, string) =>{
    var res = string.split("/");
    return (
      <h1 className="session-details">{id}: Session {res[res.length - 1]}</h1>
    )
  };

  const renderSection = (section) => {
    return (
      <div className="checklist-sections">
        <h6 className="section-head">{section}</h6>
        <div className="checklist-box">
          {checklistTemplate[section].map((check) => (
            <div className="checklist-item">
              <input
                type="checkbox"
                checked={checkActionInSession(check["intent"])}
              />
              <span className="checkmark">{check.description}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const checkActionInSession = (actionName) => {
    return checklist.some(
      (el) => el["action"] === actionName || actionName.includes(el["action"])
      );
  };

  return (
    <div className="container">
      <img src={logo} title='logo'/>
      {renderSession(id, window.location.href)}

      <div className='timestampDelete'>
        <small className="session-timestamp">
          {moment(ts * 1000).format("D MMM YYYY h:mma")}
        </small>
       </div>
      {convoLoaded ? sessionDuration(convo) : <p>NIL</p>}
      <div className="container-checklist">
        <h5 className="indv-session-btn">Checklist</h5>
        <div className="container-checklist-items">
        {checklistLoaded ? (
          <div className="p-2">
            {renderSection("Demographics")}
            {renderSection("Presenting Symptoms")}
            {renderSection("HPI")}
            {renderSection("Drug & Treatment History")}
            {renderSection("Past History")}
            {renderSection("Social History")}
            {renderSection("Family History")}
            {renderSection("Systems Review")}
            {renderSection("PCE")}
            {renderSection("NURS")}
          </div>
        ) : (
          <h6>Loading...</h6>
        )}
        </div>
      </div>
      <div className="container-checklist">
        <h5 className="convo-title">Conversation</h5>
        <div className="container-checklist-items">
        {convoLoaded ? (
          convo.map((item, index) => (
            <div
              key={index}
              className={`d-flex flex-row justify-content-${
                item.event === "bot" ? "start" : "end"
              } align-items-center `}
            >
              <div
                style={{
                  maxWidth: "75%"
                }}
                className={`text-${item.event === "bot" ? "left" : "right"}`}
              >
               {(item.text !== "/StartConversation" && 
              item.text !== "The conversation is restarted./The conversation is going on again./The conversation is restarting./The conversation is restarting again." &&
              item.text !== "Return." &&
              item.text !== "/restart" &&
              item.text !== null ) ? (
                
                 <div className="indv-convo">
                 <span className="convo-person">{item.event} :</span>
                 <br />
                 <span className="convo-text">{item.text}</span>
                 <br />
                 <small className="timestamp">
                   {moment(item.timestamp * 1000).format("h:mma")}
                 </small>
               </div>
                  ) : (
                <div></div>
              )}
              </div>
          </div>))): (<h6>Loading...</h6>)}
      </div> 
    </div>
    <Link className="back" title="results" to={`/sessions/${id}`}>
      Back
    </Link>  
</div>);
}
