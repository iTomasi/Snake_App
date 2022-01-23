import React from "react";

// Components
import NoAvatarPicture from "../NoAvatarPicture";

interface IPictureAndUsernameProps {
    username: string;
    profile_picture: string;
}

const PictureAndUsername = ({ username, profile_picture }: IPictureAndUsernameProps) => {
    return (
        <div>
            <div className="iw-w-20 iw-h-20 iw-mb-4 iw-mx-auto">
                {
                    !profile_picture
                    ? <NoAvatarPicture className="iw-w-full iw-h-full iw-bg-stone-800 iw-text-3xl" text={username}/>
                    : <img className="iw-w-full iw-h-full iw-rounded-full iw-object-cover iw-object-center" src={profile_picture} alt={`${username} picture profile`} />
                } 
            </div>

            <h1 className="iw-text-center iw-text-2xl">{username}</h1>
        </div>
    )
}

export default PictureAndUsername;