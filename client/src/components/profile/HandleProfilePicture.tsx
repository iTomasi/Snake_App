import React from "react";
import { toast } from "react-hot-toast";
import {HiPlus} from "react-icons/hi";
import { IUserEditable } from "types/User";

interface IHandleProfilePictureProps {
    className?: string;
    setEditableUser: (value: IUserEditable | ((prev: IUserEditable) => void)) => void;
}

const HandleProfilePicture = ({ className = "", setEditableUser }: IHandleProfilePictureProps) => {
    const handlePicture = (file: Blob) => {
        if (!file.type.includes("image")) return toast.error("Your profile picture should be an image")

        const blobToUrl = URL.createObjectURL(file);

        setEditableUser((prev) => (
            {
                ...prev,
                profile_picture: {
                    ...prev.profile_picture,
                    url: blobToUrl,
                    blob: file
                }
            }
        ))
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const file = e.target.files[0];

            handlePicture(file);
        }

        catch(e) {
            console.log(e);
            console.log("handleOnChange() Error");
        }
    }

    return (
        <label htmlFor="iw_inputProfilePicture" className={`iw-block iw-absolute iw-inset-0 iw-bg-black iw-bg-opacity-50 iw-rounded-full iw-flex iw-justify-center iw-items-center iw-cursor-pointer ${className}`}>
            <HiPlus
                className="iw-w-8 iw-h-8"
            />

            <input id="iw_inputProfilePicture" className="iw-hidden" type="file" accept="image/*" onChange={handleOnChange} />
        </label>
    )
};

export default HandleProfilePicture;