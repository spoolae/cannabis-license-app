import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MedicHeader } from "../../components/MedicHeader";
import { logoutUser, updateProfile } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { faEnvelope, faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProfileForm = ({
  editedLastName,
  editedFirstName,
  editedFatherName,
  editedGender,
  onLastNameChange,
  onFirstNameChange,
  onFatherNameChange,
  onGenderChange,
  onSaveChanges,
}) => (
  <>
    <label>Last Name: </label>
    <input type="text" value={editedLastName} onChange={onLastNameChange} />
    <br />
    <label>First Name: </label>
    <input type="text" value={editedFirstName} onChange={onFirstNameChange} />
    <br />
    <label>Father Name: </label>
    <input type="text" value={editedFatherName} onChange={onFatherNameChange} />
    <br />
    <label>Gender: </label>
    <select value={editedGender} onChange={onGenderChange}>
      <option value="male">Male</option>
      <option value="female">Female</option>
    </select>
    <br />
    <button className="round-button" onClick={onSaveChanges}>
      Save Changes
    </button>
  </>
);

const UserProfile = ({ user, isEditing, handleLogout }) => (
  <div className="info-card">
    <p>
      <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: "5px" }} />
      {user?.email}
    </p>
    <p>
      {user?.gender === "male" ? (
        <FontAwesomeIcon icon={faMars} />
      ) : (
        <FontAwesomeIcon icon={faVenus} />
      )}{" "}
      {user?.last_name} {user?.first_name} {user?.father_name}
    </p>
    <p></p>
    {isEditing && <p>Loading...</p>}
    <button className="round-button" onClick={handleLogout}>
      Logout
    </button>
  </div>
);

export const MedicProfileScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

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

  const toggleEditing = () => setIsEditing(!isEditing);

  const onLastNameChange = (e) => setEditedLastName(e.target.value);
  const onFirstNameChange = (e) => setEditedFirstName(e.target.value);
  const onFatherNameChange = (e) => setEditedFatherName(e.target.value);
  const onGenderChange = (e) => setEditedGender(e.target.value);

  return (
    <div className="profile-screen">
      <MedicHeader />

      <div className="profile-screen-content">
        <h3>
          User Information{" "}
          <button className="text-button" onClick={toggleEditing}>
            {isEditing ? "Cancel Editing" : "Edit Profile"}
          </button>
        </h3>
        {user && isEditing && (
          <ProfileForm
            editedLastName={editedLastName}
            editedFirstName={editedFirstName}
            editedFatherName={editedFatherName}
            editedGender={editedGender}
            onLastNameChange={onLastNameChange}
            onFirstNameChange={onFirstNameChange}
            onFatherNameChange={onFatherNameChange}
            onGenderChange={onGenderChange}
            onSaveChanges={saveChanges}
          />
        )}

        {user && !isEditing && (
          <UserProfile
            user={user}
            isEditing={isEditing}
            handleLogout={handleLogout}
          />
        )}

        {!user && <p>Loading...</p>}
      </div>
    </div>
  );
};
