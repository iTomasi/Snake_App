import React from "react";
import { GetServerSidePropsContext } from "next";

// Components
import PictureAndUsername from "components/profile/PictureAndUsername";

// Axios
import { AxiosGetUser } from "requests/localApi/AxiosUser";

const UserProfile = ({ status, message, data, user_account }) => {
    if (status === 0) {
        return <h3>{message}</h3>
    }

    console.log(data)
    console.log({user_account})

    return (
        <div>
            <PictureAndUsername
                username={data.username}
                profile_picture={data.profile_picture}
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