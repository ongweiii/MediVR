import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import back_img from "./images/back_img.png";
import vr_pic from "./images/VR_pic.png";
import logo from "./images/MediVRLogo.png";
import { getSenders } from "./Api";
export default function Senders() {
  const [list, setList] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    getSenders().then((data) => {
      setList(data);
      setLoaded(true);
    });
  }, []);

function login(){
  var username = (document.getElementById('usernam').value).toLowerCase();
  var webstring = 'https://medi-vr.vercel.app//sessions/' + username;
  if (username === '' || username == null) {alert('Please enter a username')}
  else if (list.some(obj => obj.sender_id === username)) {window.open(webstring, "_self")}
  else {alert('Username is invalid')};
}

return (
    <div>
      {loaded ? (
        <div>
          <body background={back_img}>
            <div className="container-login">
              <div className="img">
                <img src={vr_pic} className="vr_pic" alt=''/>
              </div>
              <div className="login-content">
                <div id='login' name='login'>
                  <img src={logo} alt=''/>
                  
                  <div className="input-div one">
                    <div className="i">
                      <i className="fas fa-user"></i>
                    </div>
                    <div className="div">
                      <input type="text" id = "usernam" name="username" placeholder="Username"
                        /><br></br>
                    </div>
                  </div>
                  <input type="submit" id='login' title='login' className="btn" onClick={()=>login()}></input>
                </div>
              </div>
            </div>
          </body>
        </div>
      ) : (
        <h6>Loading...</h6>
      )}
    </div>
  );
}
