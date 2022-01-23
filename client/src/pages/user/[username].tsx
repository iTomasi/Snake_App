import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { GetServerSidePropsContext } from "next";

// Components
import PictureAndUsername from "components/profile/PictureAndUsername";
import SaveChangesCard from "components/profile/SaveChangesCard";

// Axios
import { AxiosGetUser, AxiosEditUser } from "requests/localApi/AxiosUser";
import { AxiosCloudinary } from "requests/AxiosBase";
import AxiosCloudinaryUploadImage from "requests/cloudinary/AxiosCloudinaryUploadImage";

// Types
import { IUserEditable } from "types/User";

// Hooks
import { useUser } from "hooks/useUser";

const UserProfile = ({ status, message, data, user_account }) => {
    if (status === 0) {
        return <h3>{message}</h3>
    }

    const { updateUser } = useUser();

    const [editableUser, setEditableUser] = useState<IUserEditable>({
        profile_picture: {
            url: data.profile_picture,
            blob: null
        }
    })

    const [showCard, setShowCard] = useState<boolean>(false);
    const [fetching, setFetching] = useState<boolean>(false);

    useEffect(() => {
        if (!user_account) return

        const objectEntriesEditableUser = Object.entries(editableUser);

        let userHaveChanges: boolean = false;

        for (let i = 0; i < objectEntriesEditableUser.length; i++) {
            const [key, value] = objectEntriesEditableUser[i];

            if (key === "profile_picture") {
                if (data[key] === undefined || data[key] !== value.url) {
                    userHaveChanges = true;
                    break
                }
            }
        }

        setShowCard(userHaveChanges);
    }, [editableUser])

    const handleOnClickSave = async () => {
        let profile_picture_url: string = data.profile_picture;

        setFetching(true);

        if (editableUser.profile_picture.blob) {
            try {
                const formData = AxiosCloudinaryUploadImage({
                    blob: editableUser.profile_picture.blob,
                    folder: `user/${data.id}`
                });

                const { data: axiosData } = await AxiosCloudinary.post(
                    "/image/upload",
                    formData,
                    {
                        onUploadProgress: (e: any) => {
                            const percentage = (e.loaded * 100) / e.total;
                            console.log(percentage);
                        }
                    }
                )

                profile_picture_url = axiosData.secure_url;
            }

            catch(e) {
                console.log(e);
                console.log("handleOnClickSave() Cloudinary");
                toast.error("Cloudinary error connection")
            }
        }

        const { error } = await AxiosEditUser({
            profile_picture: profile_picture_url
        })

        if (error) {
            toast.error(error);
        }

        else {
            updateUser({
                profile_picture: profile_picture_url
            })
            toast.success("Data saved successfully")
        }

        setFetching(false)
    }

    const handleOnClickDiscard = () => {
        setEditableUser((prev) => {
            return {
                ...prev,
                profile_picture: {
                    ...prev.profile_picture,
                    url: data.profile_picture,
                    blob: null
                }
            }
        })
    }

    return (
        <div>
            <PictureAndUsername
                username={data.username}
                profile_picture={editableUser.profile_picture.url}
                user_account={user_account}
                setEditableUser={setEditableUser}
            />

            <SaveChangesCard
                show={showCard}
                onClickSave={handleOnClickSave}
                onClickDiscard={handleOnClickDiscard}
                loading={fetching}
            />
        </div>
    )
}

export const getServerSideProps = async ({ query, req, res }: GetServerSidePropsContext) => {
    const { username } = query;
    const userToken: string = req.cookies.token;

    const { error, data } = await AxiosGetUser(username as string, !userToken ? "" : userToken); 

    if (error) {
        return {
            props: {
                status: 0,
                message: error
            }
        }
    }

    if (data.access_token) {
        const expiresTime = new Date(Date.now() + (432000 * 1000))

        res.setHeader("Set-Cookie", `token=${data.access_token}; path=/; expires=${expiresTime.getUTCDate()}`)
    }

    return {
        props: {
            status: 1,
            data: data.payload,
            user_account: data.user_account
        }
    }
}

export default UserProfile;