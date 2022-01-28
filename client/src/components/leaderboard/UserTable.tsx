import React from "react";
import NoAvatarPicture from "../NoAvatarPicture";
import Link from "next/link";

interface IUserCardProps {
    data: any[]
}

const UserTable = ({ data }: IUserCardProps) => {
    return (
        <div>
            <div className="iw-flex iw-text-center iw-bg-stone-800 iw-py-4 iw-rounded iw-mb-4">
                <span className="iw-w-[10%]">N</span>
                <span className="iw-w-[70%] iw-text-left">Username</span>
                <span className="iw-w-[20%]">Score</span>
            </div>

            <div className="iw-bg-stone-800 iw-rounded">
                {
                    data.map((value: any, index: any) => (
                        <Link href={`/user/${value.username.toLowerCase()}`}>
                            <a className="iw-flex iw-items-center iw-py-4" key={index + 1}>
                                <span className="iw-w-[10%] iw-text-center">{index + 1}</span>
                                <div className="iw-flex iw-items-center iw-w-[70%]">
                                    <div className="iw-w-16 iw-h-16 iw-mr-4">
                                        {
                                            value.profile_picture
                                            ? <img className="iw-w-full iw-h-full iw-object-cover iw-object-center iw-rounded-full" src={value.profile_picture} alt={value.username}/>
                                            : <NoAvatarPicture className="iw-w-full iw-h-full iw-text-2xl" text={value.username} />
                                        }
                                    </div>
                                    <span>{value.username}</span>
                                </div>
                                <span className="iw-w-[20%] iw-text-center">{value.maxScores.snake}</span>
                            </a>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
};

export default UserTable;