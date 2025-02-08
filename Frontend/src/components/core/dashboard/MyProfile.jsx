import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import IconButton from '../../common/IconButton';
import { FaEdit } from 'react-icons/fa';

const MyProfile = () => {
  const {user} = useSelector((state) => state.profile);
  const navigate = useNavigate();
  return (
    <div className='text-white'>
      <h1>My Profile</h1>
      {/* section 1 */}
      <div>
        <div>
          <img src={user?.image} alt={`profile-${user?.firstName }`} className='aspect-square w-[78px] rounded-full object-cover'/>
          <div>
            <p>{user?.firstName + " " + user?.lastName}</p>
            <p></p>
          </div>
        </div>
        <IconButton text={"Edit"} onClick={()=>{
          navigate("dashboard/settings")
        }} />
      </div>
      {/* Section 2 */}
       <div>
          <div>
            <p>About</p>
            <IconButton text={"edit"} onClick={()=>navigate("/dashboard/settings")}/>
          </div>
          <p>{user?.additionalDetails?.about ?? "Tell Something about yourself"}</p>
       </div>
       {/* section 3 */}
       <div>
          <div>
              <p>Personal Details</p>
              <IconButton text={"edit"} onClick={()=>navigate("/Dashboard/settings")}/>
          </div>
          <div>
              <div>
                <p>First Name</p>
                <p>{user?.firstName}</p>
              </div>
              <div>
                <p>Email Name</p>
                <p>{user?.email}</p>
              </div>
              <div>
                <p>Gender</p>
                <p>{user?.additionalDetails?.gender ?? " add gender"}</p>
              </div>
              <div>
                <p>Last Name</p>
                <p>{user?.lastName}</p>
              </div>
              <div>
                <p>Phone Number</p>
                <p>{user?.additionalDetails?.contactNumber ?? "add contact number"}</p>
              </div>
              <div>
                <p>Date of Birth</p>
                <p>{user?.additionalDetails?.dateOfBirth ?? "add date of birth"}</p>
              </div>
          </div>
       </div>

    </div>
  )
}

export default MyProfile
