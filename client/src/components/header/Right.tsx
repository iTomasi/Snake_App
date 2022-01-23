import React from "react";

// Next
import Link from "next/link";

// Components
import Button from "../Button";
import NoAvatarPicture from "../NoAvatarPicture";

// Hooks
import { useUser } from "hooks/useUser";

const Right = () => {
    const { user, status, logout } = useUser()

    const handleOnClickLogout = () => logout()

    return (
        <div className="iw-flex iw-items-center">
            {
                status === 1
                ? (
                    <>
                    <Link href={`/user/${user.username.toLowerCase()}`}>
                        <a className="iw-block iw-mr-4">
                            {
                                user.profile_picture
                                ? <img className="iw-w-12 iw-h-12 iw-object-cover iw-object-center iw-rounded-full" src={user.profile_picture} alt="user picture"/>
                                : (
                                    <NoAvatarPicture
                                        className="iw-w-12 iw-h-12 iw-text-2xl"
                                        text={user.username}
                                    />
                                )
                            }
                        </a>
                    </Link>
                    <Button
                        className="iw-bg-red-400 active:iw-bg-red-500"
                        type="button"
                        text="Logout"
                        onClick={handleOnClickLogout}
                    />
                    </>
                )
                : (
                    <>
                    <Button
                        className="iw-bg-indigo-500 active:iw-bg-indigo-600 iw-mr-4"
                        type="link"
                        text="Sign In"
                        href="/auth/sign-in"
                    />

                    <Button
                        className="iw-bg-indigo-500 active:iw-bg-indigo-600"
                        type="link"
                        text="Sign Up"
                        href="/auth/sign-up"
                    />
                    </>
                )
            }
        </div>
    )
};

export default Right;