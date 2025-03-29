import React, { useEffect } from 'react'
import ProfileSection from '../Components/ProfileSection'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function ProfileSectionPage() {
  const navigate = useNavigate();
  const {status} = useSelector(state => state.authSlice);

  return (
    <div className='mt-5 mx-3 md:mx-0 bg-primary pb-10'>
        <ProfileSection />
    </div>
  )
}

export default ProfileSectionPage