import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MedicHeader } from "../../components/MedicHeader";
import { logoutUser, updateProfile } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";

export const MedicProfileScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  // console.log(user.last_name);

  const [isEditing, setIsEditing] = useState(false);

  const [editedLastName, setEditedLastName] = useState(user?.last_name || "");
  const [editedFirstName, setEditedFirstName] = useState(
    user?.first_name || ""
  );
  const [editedFatherName, setEditedFatherName] = useState(
    user?.father_name || ""
  );
  const [editedGender, setEditedGender] = useState(user?.gender || "");

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  const saveChanges = () => {
    dispatch(
      updateProfile({
        user_id: user?.user_id,
        last_name: editedLastName,
        first_name: editedFirstName,
        father_name: editedFatherName,
        gender: editedGender,
      })
    );

    setIsEditing(false);
  };

  return (
    <div className="profile-screen">
      <MedicHeader />
      <button onClick={handleLogout}>Logout</button>

      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? "Cancel Editing" : "Edit Profile"}
      </button>

      <div>
        <h2>User Information</h2>
        {user ? (
          isEditing ? (
            <>
              <label>Last Name: </label>
              <input
                type="text"
                value={editedLastName}
                onChange={(e) => setEditedLastName(e.target.value)}
              />
              <br />
              <label>First Name: </label>
              <input
                type="text"
                value={editedFirstName}
                onChange={(e) => setEditedFirstName(e.target.value)}
              />
              <br />
              <label>Father Name: </label>
              <input
                type="text"
                value={editedFatherName}
                onChange={(e) => setEditedFatherName(e.target.value)}
              />
              <br />
              <label>Gender: </label>
              <input
                type="text"
                value={editedGender}
                onChange={(e) => setEditedGender(e.target.value)}
              />
              <br />
              <button onClick={saveChanges}>Save Changes</button>
            </>
          ) : (
            <>
              <p>Last Name: {user?.last_name || "N/A"}</p>
              <p>First Name: {user?.first_name || "N/A"}</p>
              <p>Father Name: {user?.father_name || "N/A"}</p>
              <p>Gender: {user?.gender || "N/A"}</p>
              <p>Email: {user?.email || "N/A"}</p>
            </>
          )
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};
