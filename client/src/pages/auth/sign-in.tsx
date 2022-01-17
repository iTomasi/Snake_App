import React, { useState } from "react";

// Components
import CenterContent from "components/modals/CenterContent";
import Input from "components/form/Input";
import Button from "components/Button";

const AuthSignIn = () => {
    const [inputsFields, setInputsFields] = useState({
        password: {
            correct: true,
            blurActivated: true
        }
    })

    const handleInputPassword = (e: React.FocusEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>) => {
        if (
            (inputsFields.password.blurActivated && e.type !== "blur") ||
            (!inputsFields.password.blurActivated && e.type === "blur")
        ) return

        setInputsFields((prev) => {
            return {
                ...prev,
                password: {
                    ...prev.password,
                    correct: e.target.value.length >= 5,
                    blurActivated: false
                }
            }
        })
    }

    return (
        <CenterContent>
            <form className="iw-bg-stone-800 iw-w-full iw-max-w-md iw-px-4 iw-py-8 iw-rounded">
                <h1 className="iw-text-2xl iw-text-center iw-font-semibold iw-mb-4">Sign In</h1>

                <div className="iw-mb-4">
                    <div className="iw-mb-4">
                        <Input
                            placeholder="Username or email"
                            name="username"
                        />
                    </div>

                    <div>
                        <Input
                            className={!inputsFields.password.correct ? "iw-mb-4 iw-outline-red-400" : ""}
                            placeholder="Password"
                            name="password"
                            onBlur={handleInputPassword}
                            onChange={handleInputPassword}
                        />

                        {
                            !inputsFields.password.correct && (
                                <p className="iw-text-base iw-text-center iw-text-red-400">Your password should contain 5 or more characters</p>
                            )
                        }
                    </div>
                </div>

                <Button
                    className="iw-w-full iw-bg-indigo-500 hover:iw-bg-indigo-400"
                    text="Sign In"
                />
            </form>
        </CenterContent>
    )

}

export default AuthSignIn;