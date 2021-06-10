import React, {useState} from 'react';

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
                <textarea value={profile} onChange={handleChangeProfile}/>
            </div>
            <div>
                <textarea value={url} onChange={handleChangeUrl}/>
            </div>
        </div>
    )
}

export default ProfileTextArea
