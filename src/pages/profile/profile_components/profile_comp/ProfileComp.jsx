import React from 'react'

const ProfileComp = () => {
  return (
    <div id="profile-right">
                     <div className="p-side">
                    <p>Profile Settings</p>
                    <div id="profile-form">
                        <div className="input-lines">
                            <div className="input-field">
                                <label htmlFor="">First Name</label>
                                <input type="text"
                                    placeholder='Enter first name' name='fname' />
                            </div>
                            <div className="input-field">
                                <label htmlFor="">Last Name</label>
                                <input type="text" placeholder='Enter first name' name='lname' />
                            </div>
                        </div>

                        <div className="input-lines">
                            <div className="input-field">
                                <label htmlFor="">Email</label>
                                <input type="text" placeholder='Enter email' name='email' />
                            </div>
                            <div className="input-field">
                                <label htmlFor="">Phone Number</label>
                                <input type="text" placeholder='Enter phone number' name='phone' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-side">
                    <p>Account Settings</p>
                </div>
    </div>
  )
}

export default ProfileComp
