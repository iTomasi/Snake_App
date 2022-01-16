import React, { useState, useEffect } from "react";

// Components
import CenterContent from "components/modals/CenterContent";
import Input from "components/form/Input";
import Button from "components/Button";

const AuthSignUp = () => {
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
        confirm_password: ""
    })

    const handleOnChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
        const targetName = e.target.name;
        const targetValue = e.target.value;

        setInputs((prev) => (
            {
                ...prev,
                [targetName]: targetValue
            }
        ))
    }

    return (
        <CenterContent>
            <form className="iw-bg-stone-800 iw-w-full iw-max-w-md iw-px-4 iw-py-8 iw-rounded">
                <h1 className="iw-text-center iw-font-semibold iw-mb-4 iw-text-2xl">Sign Up</h1>

                <div>
                    <Input
                        className="iw-mb-4" 
                        placeholder="Username"
                        name="username"
                        value={inputs.username}
                        onChange={handleOnChangeInputs}
                    />

                    <Input
                        className="iw-mb-4"
                        placeholder="Email"
                        name="email"
                        value={inputs.email}
                        onChange={handleOnChangeInputs}
                    />

                    <Input
                        className="iw-mb-4"
                        placeholder="Password"
                        name="password"
                        value={inputs.password}
                        onChange={handleOnChangeInputs}
                    />

                    <Input
                        className="iw-mb-4"
                        placeholder="Confirm Password"
                        name="confirm_password"
                        value={inputs.confirm_password}
                        onChange={handleOnChangeInputs}
                    />
                </div>

                <Button
                    className="iw-bg-indigo-500 iw-w-full hover:iw-bg-indigo-400"
                    text="Create Account"
                />
            </form>
        </CenterContent>
    )

}

export default AuthSignUp;