import React from "react";

// Components
import NoAvatarPicture from "../NoAvatarPicture";
import HandleProfilePicture from "./HandleProfilePicture";
import Button from "../Button";

// Types
import { IUserEditable } from "types/User";

interface IPictureAndUsernameProps {
    username: string;
    profile_picture: string;
    user_account: boolean;
    setEditableUser: (value: IUserEditable | ((prev: IUserEditable) => void)) => void
}

const PictureAndUsername = ({ username, profile_picture, user_account, setEditableUser }: IPictureAndUsernameProps) => {
    const handleOnClickRemovePicture = () => {
        setEditableUser((prev) => (
            {
                ...prev,
                profile_picture: {
                    ...prev.profile_picture,
                    url: "",
                    blob: null
                }
            }
        ))
    }
    
    return (
        <div>
            <div className="iw-mb-4 iw-relative sm:iw-max-w-[25rem] iw-w-full sm:iw-mx-auto">
                <div className={`iw-w-20 iw-h-20 iw-relative iw-mx-auto ${(profile_picture && user_account) ? "iw-mb-4 sm:iw-mb-0" : ""}`}>
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
                
                {
                    (user_account && profile_picture) && (
                        <Button
                            className="iw-bg-red-400 iw-mx-auto sm:iw-absolute sm:iw-right-0 sm:iw-top-1/2 sm:iw-translate-y-[-50%]"
                            type="button"
                            text="Remove"
                            onClick={handleOnClickRemovePicture}
                    />)
                }
                
            </div>

            <h1 className="iw-text-center iw-text-2xl">{username}</h1>
        </div>
    )
}

export default PictureAndUsername;