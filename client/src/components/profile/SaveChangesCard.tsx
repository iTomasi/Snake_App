import React from "react";

// Components
import Button from "../Button";

interface ISaveChangesCardProps {
    show: boolean;
    onClickSave: React.MouseEventHandler<HTMLButtonElement>;
    onClickDiscard: React.MouseEventHandler<HTMLButtonElement>;
}

const SaveChangesCard = ({ show, onClickSave, onClickDiscard }: ISaveChangesCardProps) => {
    return (
        <div className={`iw-transition-all iw-duration-300 iw-fixed iw-right-0 ${show ? "iw-bottom-4" : "iw--bottom-full"} iw-left-0 iw-p-4 iw-rounded iw-w-11/12 iw-max-w-md iw-mx-auto iw-bg-stone-800 iw-flex iw-justify-between iw-items-center`}>
            <span>Wanna save your changes?</span>

            <div className="iw-flex">
                <Button
                    className="iw-bg-violet-500 iw-mr-4"
                    type="button"
                    text="Save"
                    onClick={onClickSave}
                />

                <Button
                    className="iw-bg-stone-700"
                    type="button"
                    text="Discard"
                    onClick={onClickDiscard}
                />
            </div>
        </div>
    )

}

export default SaveChangesCard;