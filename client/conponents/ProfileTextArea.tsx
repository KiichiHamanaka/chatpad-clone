import React, {useState} from 'react';
import styled from "styled-components";

const Profile = styled.textarea`
  width: 150px;
  height: 300px;
  border-radius: 5px;
  font-size: 16px;
  resize: none;
  border: 1px solid lightgray;
`

const URL = styled.textarea`
  width: 150px;
  height: 100px;
  border-radius: 5px;
  font-size: 16px;
  resize: none;
  border: 1px solid lightgray;
`

const ProfileTextArea = () => {
    const [profile,setProfile] = useState('')
    const [url,setUrl] = useState('')

    const handleChangeProfile = (event) => {
        setProfile(event.target.value)
    };
    const handleChangeUrl = (event) => {
        setUrl(event.target.value)
    };

    return(
        <div>
            <div>
                <Profile value={profile} onChange={handleChangeProfile}/>
            </div>
            <div>
                <URL value={url} onChange={handleChangeUrl}/>
            </div>
        </div>
    )
}

export default ProfileTextArea
