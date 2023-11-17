import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { BACK_END_BASE_URL } from "../../config";
const Profile = () => {
    const [user,setUser] = useState({});
    const navigate= useNavigate();
    useEffect(()=>{
        let access_token = window.localStorage.getItem("access_token")
        if(!access_token){
            navigate('/login');
        }
            axios.get(`${BACK_END_BASE_URL}/me`,{ headers: {"Authorization" : access_token} })
              .then(function (response) {
               setUser(response.data) 
              })
              .catch(function (error) {
                swal(error.response.data.message);
              });
    },[])
  return (
    <>
      <section style={{ height: "83.6vh" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-5">
              <div className="card p-2" style={{ marginTop: "120px" }}>
                <h2 className="card-title text-center py-2">Profile Details</h2>
                <div className=" py-md-3">
                  <form>
                    <div className="form-group mb-4">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Name"
                        disabled={true}
                        value={user.name}
                        onChange={()=>setUser()}
                      />
                      <label htmlFor="name">Name</label>
                    </div>

                    <div className="form-group mb-4">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Email"
                        disabled={true}
                        value={user.email}
                        onChange={()=>setUser()}
                      />
                      <label htmlFor="email">Email</label>
                    </div>

                    <div className="form-group mb-4">
                      <input
                        type="role"
                        className="form-control"
                        id="role"
                        placeholder="Role"
                        disabled={true}
                        value={user.role}
                        onChange={()=>setUser()}
                      />
                      <label htmlFor="role">Role</label>
                    </div>
                    <div className="d-grid gap-2">
                      <button className="btn btn-dark" type="button" disabled={true}>
                        UPDATE PROFILE
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
