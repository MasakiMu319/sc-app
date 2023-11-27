import React, { useState } from 'react';
import {Input, Button} from "@nextui-org/react";

const SigninForm = () => {
    const [value, setValue] = React.useState("");
    const validateName = (value) => value.match(/^[A-Z0-9]{3,15}$/i);
    const isInvalid = React.useMemo(()=>{
        if (value == "") return false;

        return validateName(value)?false:true
    },[value]);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/signin', {
                method: 'POST',
                credentials: 'include', // 必要时携带 cookies
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Sign in failed.');
            }

            window.location.href = "http://localhost:8080/";
            // 登录成功的处理逻辑
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        // <div className="flex flex-col gap-4">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Input
                isClearable
                value={value}
                label="username"
                variant="bordered"
                isInvalid={isInvalid}
                color={isInvalid ? "danger" : "success"}
                errorMessage={isInvalid && "Please enter a valid username"}
                onValueChange={setValue}
                onChange={(e) => setUsername(e.target.value)}
                className="max-w-xs"
            />
            <Input
                type={"password"}
                label="Password"
                variant="bordered"
                placeholder="Enter your password"
                className="max-w-xs"
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button color="primary" variant="shadow" type={"submit"}>
                Sign in
            </Button>
                {errorMessage && <p color={"danger"}>{errorMessage}</p>}
            </form>
    );
};

export default SigninForm;
