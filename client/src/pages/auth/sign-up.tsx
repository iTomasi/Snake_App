import React, { useState } from "react";
import { toast } from "react-hot-toast";

// Next
import { useRouter } from "next/router"

// Components
import CenterContent from "components/modals/CenterContent";
import Input from "components/form/Input";
import Button from "components/Button";

// Helpers
import { email_RegExp } from "helpers/customRegExp";

// Requests
import { AxiosSignUpEmail } from "requests/localApi/AxiosAuth";

// Hooks
import { useUser } from "hooks/useUser";

const AuthSignUp = () => {
    const router = useRouter();
    const { authenticating } = useUser();

    const [inputsValids, setInputsValids] = useState({
        username: {
            correct: true,
            blurActivated: true,
        },
        email: {
            correct: true,
            blurActivated: true
        },
        password: {
            correct: true,
            blurActivated: true
        },
        confirm_password: {
            correct: true,
            blurActivated: true
        }
    })

    const [fetching, setFetching] = useState<boolean>(false);

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const username = formData.get("username").toString();
        const email = formData.get("email").toString();
        const password = formData.get("password").toString();
        const confirm_password = formData.get("confirm_password").toString();

        setFetching(true);

        const { error, data } = await AxiosSignUpEmail({
            username, email, password, confirm_password
        });

        if (error) {
            toast.error(error);
            setFetching(false)
            return
        }

        authenticating(data);
        toast.success("Logged Successfully");

        router.push("/")
    }

    const handleInputUsername = (e: React.FocusEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>) => {
        if (
            (inputsValids.username.blurActivated && e.type !== "blur") ||
            (!inputsValids.username.blurActivated && e.type === "blur")
        ) return

        const targetValue = e.target.value;

        setInputsValids((prev) => {
            let isCorrect: boolean = true;

            if (
                targetValue.length < 3 ||
                targetValue.length > 30
            ) isCorrect = false;

            return {
                ...prev,
                username: {
                    ...prev.username,
                    correct: isCorrect,
                    blurActivated: false
                }
            }
        })
        
    }

    const handleInputEmail = (e: React.FocusEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>) => {
        if (
            (inputsValids.email.blurActivated && e.type !== "blur") ||
            (!inputsValids.email.blurActivated && e.type === "blur")
        ) return
        
        const targetValue = e.target.value;

        setInputsValids((prev) => (
            {
                ...prev,
                email: {
                    ...prev.email,
                    correct: email_RegExp.test(targetValue),
                    blurActivated: false
                }
            }
        ))
    }

    const handleInputPassword = (e: React.FocusEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>) => {
        if (
            (inputsValids.password.blurActivated && e.type !== "blur") ||
            (!inputsValids.password.blurActivated && e.type === "blur")
        ) return
        
        const targetValue = e.target.value;

        setInputsValids((prev) => {
            return {
                ...prev,
                password: {
                    ...prev.password,
                    correct: targetValue.length >= 5,
                    blurActivated: false
                }
            }
        })
    }

    const handleInputConfirmPassword = (e: React.FocusEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>) => {
        if (
            (inputsValids.confirm_password.blurActivated && e.type !== "blur") ||
            (!inputsValids.confirm_password.blurActivated && e.type === "blur")
        ) return
        
        const $form: any = e.currentTarget.parentElement.parentElement.parentElement;

        const formData = new FormData($form);

        const password = formData.get("password").toString();

        setInputsValids((prev) => {
            return {
                ...prev,
                confirm_password: {
                    ...prev.confirm_password,
                    correct: password === e.target.value,
                    blurActivated: false
                }
            }
        })
    }

    return (
        <CenterContent>
            <form className="iw-bg-stone-800 iw-w-full iw-max-w-md iw-px-4 iw-py-8 iw-rounded" onSubmit={handleOnSubmit}>
                <h1 className="iw-text-center iw-font-semibold iw-mb-4 iw-text-2xl">Sign Up</h1>

                <div className="iw-mb-4">
                    <div className="iw-mb-4">
                        <Input
                            className={`${!inputsValids.username.correct ? "iw-outline-red-400 iw-mb-4" : ""}`} 
                            placeholder="Username"
                            name="username"
                            onBlur={handleInputUsername}
                            onChange={handleInputUsername}
                        />

                        {
                            !inputsValids.username.correct && <p className="iw-text-red-400 iw-text-base iw-text-center">Your username must contain between 3 - 30 characters</p>
                        }
                    </div>

                    <div className="iw-mb-4">
                        <Input
                            className={!inputsValids.email.correct ? "iw-outline-red-400 iw-mb-4" : ""}
                            placeholder="Email"
                            name="email"
                            onBlur={handleInputEmail}
                            onChange={handleInputEmail}
                        />

                        {
                            !inputsValids.email.correct && <p className="iw-text-red-400 iw-text-base iw-text-center">Wrong email format, example: snake@app.com</p>
                        }
                    </div>

                    <div className="iw-mb-4">
                        <Input
                            className={!inputsValids.password.correct ? "iw-outline-red-400 iw-mb-4" : ""}
                            type="password"
                            placeholder="Password"
                            name="password"
                            onBlur={handleInputPassword}
                            onChange={handleInputPassword}
                        />

                        {
                            !inputsValids.password.correct && <p className="iw-text-center iw-text-base iw-text-red-400">Your password must contains at least 5 characters</p>
                        }
                    </div>

                    <div>
                        <Input
                            className={!inputsValids.confirm_password.correct ? "iw-outline-red-400 iw-mb-4" : ""}
                            type="password"
                            placeholder="Confirm Password"
                            name="confirm_password"
                            onBlur={handleInputConfirmPassword}
                            onChange={handleInputConfirmPassword}
                        />

                        {
                            !inputsValids.confirm_password.correct && <p className="iw-text-center iw-text-base iw-text-red-400">Your password not match!</p>
                        }
                    </div>
                </div>

                <Button
                    className="iw-bg-indigo-500 iw-w-full hover:iw-bg-indigo-400"
                    text="Create Account"
                    loading={fetching}
                />
            </form>
        </CenterContent>
    )

}

export default AuthSignUp;