import React from "react";

// Components
import NoAvatarPicture from "../NoAvatarPicture";
import HandleProfilePicture from "./HandleProfilePicture";

// Types
import { IUserEditable } from "types/User";

interface IPictureAndUsernameProps {
    username: string;
    profile_picture: string;
    user_account: boolean;
    setEditableUser: (value: IUserEditable | ((prev: IUserEditable) => void)) => void
}

const PictureAndUsername = ({ username, profile_picture, user_account, setEditableUser }: IPictureAndUsernameProps) => {
    return (
        <div>
            <div className="iw-w-20 iw-h-20 iw-mb-4 iw-mx-auto iw-relative">
                {
                    !profile_picture
                    ? <NoAvatarPicture className="iw-w-full iw-h-full iw-bg-stone-800 iw-text-3xl" text={username}/>
                    : <img className="iw-w-full iw-h-full iw-rounded-full iw-object-cover iw-object-center" src={profile_picture} alt={`${username} picture profile`} />
                }

                {
                    user_account && (
                        <HandleProfilePicture
                            className="iw-opacity-0 iw-transition-all iw-duration-300 hover:iw-opacity-100"
                            setEditableUser={setEditableUser}
                        />
                    )
                }
            </div>

            <h1 className="iw-text-center iw-text-2xl">{username}</h1>
        </div>
    )
}

export default PictureAndUsername;