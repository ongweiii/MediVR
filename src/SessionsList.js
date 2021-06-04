import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import moment from "moment";
import logo from './images/MediVRLogoWhite.png';
import { deleteSender, getSessions } from "./Api";
export default function SessionsList() {
  let { id } = useParams();

  const [list, setList] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const history = useHistory();
  useEffect(() => {
    getSessions(id).then((data) => {
      setList(data);
      setLoaded(true);
    });
  }, []);

  const ConfirmDelete = () => {
    var resp = window.confirm("Are you sure you want to delete this sender?");
    if (resp) {
      deleteSender(id).then(() => {
        alert("Successfully deleted!");
        history.push("/");
      });
    }
  };
  return (
    <div className="container">
      <h1 className="session-details">{id}</h1>
      <img src={logo} title='logo'/>
      <div>
      </div>
      {loaded ? (
        list
          .slice(0)
          .reverse()
          .map((item, index) => (
            <div className="mb-2">
              <Link
                className="text-decoration-none"
                to={`/session/${id}/${item.timestamp}`}
              >
                <div key={index} className="indv-session-btn">
                  <h6 className="session-num">Session {list.length - index}</h6>
                  <small>
                    {moment(item.timestamp * 1000).format("Do MMM YYYY, h:mma")}
                  </small>
                </div>
              </Link>
            </div>
          ))
      ) : (
        <h6>Loading...</h6>
      )}
      <Link className="back" title='sessionList'
        to={``}> Back
      </Link>
    </div>
  );
}
