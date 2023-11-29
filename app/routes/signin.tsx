import React, {useState} from 'react';
import {
    Input,
    Button,
    Tabs,
    Tab,
    Link,
    Modal,
    ModalHeader,
    ModalBody,
    ModalContent,
    ModalFooter,
    useDisclosure
} from "@nextui-org/react";
import {Card, CardBody} from "@nextui-org/card";

const SigninForm = () => {
    const [selected, setSelected] = React.useState("login");

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const validateName = (username: string) => username.match(/^[A-Z0-9]{3,15}$/i);
    const validatePassword = (password: string) => password.match(/^[A-Z0-9]{8,20}$/i);

    const isInvalid = React.useMemo(()=>{
        if (username === "") return true;
        return !validateName(username)
    },[username]);

    const isPasswordInvalid = React.useMemo(()=>{
        if (password === "") return true;
        return !validatePassword(password)
    },[password]);


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
    const handleRegiser = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/signup', {
                method: 'POST',
                credentials: 'include', // 必要时携带 cookies
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                setErrorMessage('Registered failed.')
                throw new Error('register failed.');
            }
            setErrorMessage('Registered successfully')
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="flex flex-col w-full items-center">
            <Card className="max-w-full w-[360px] h-[420px]">
                <CardBody className="overflow-hidden">
                    <Tabs
                        fullWidth
                        size="md"
                        aria-label="Tabs form"
                        selectedKey={selected}
                        onSelectionChange={setSelected}
                    >
                        <Tab key="login" title="Login">
                            <form className="flex flex-col gap-4">
                                <Input
                                    isRequired
                                    label="Username"
                                    placeholder="Enter your username"
                                    isInvalid={isInvalid}
                                    color={isInvalid ? "danger" : "success"}
                                    errorMessage={isInvalid && "Only numbers and letters are supported"}
                                    defaultValue={username}
                                    onChange={(e)=>setUsername(e.target.value)}
                                />
                                <Input
                                    isRequired
                                    label="Password"
                                    placeholder="Enter your password"
                                    type="password"
                                    isInvalid={isPasswordInvalid}
                                    color={isPasswordInvalid ? "danger" : "success"}

                                    errorMessage={isPasswordInvalid && "Only numbers and letters are supported"}
                                    defaultValue={password}
                                    onChange={(e)=>setPassword(e.target.value)}
                                />
                                <p className="text-center text-small">
                                    Need to create an account?{" "}
                                    <Link size="sm" onPress={() => setSelected("sign-up")}>
                                        Sign up
                                    </Link>
                                </p>
                                <div className="flex gap-2 justify-end">
                                    <Button onClick={handleSubmit} isDisabled={isInvalid || isPasswordInvalid} fullWidth color="primary">
                                        Login
                                    </Button>
                                </div>
                            </form>
                        </Tab>
                        <Tab key="sign-up" title="Sign up">
                            <form className="flex flex-col gap-4 h-[300px]">
                                <Input
                                    isRequired
                                    label="Username"
                                    placeholder="Enter your username"
                                    isInvalid={isInvalid}
                                    color={isInvalid ? "danger" : "success"}
                                    errorMessage={isInvalid && "Only numbers and letters are supported"}
                                    defaultValue={username}
                                    onChange={(e)=>setUsername(e.target.value)}
                                />
                                <Input
                                    isRequired
                                    label="Password"
                                    placeholder="Enter your password"
                                    type="password"
                                    isInvalid={isPasswordInvalid}
                                    color={isPasswordInvalid ? "danger" : "success"}
                                    errorMessage={isPasswordInvalid && "Only numbers and letters are supported"}
                                    defaultValue={password}
                                    onChange={(e)=>{
                                        setPassword(e.target.value);
                                        setPasswordsMatch(password === e.target.value);
                                    }}
                                />
                                <Input
                                    isRequired
                                    label="Password"
                                    placeholder="Repeat your password"
                                    type="password"
                                    color={!passwordsMatch ? "danger" : "success"}
                                    errorMessage={!passwordsMatch && "Please repeat your password."}
                                    defaultValue={confirmPassword}
                                    onChange={(e)=>{
                                        setConfirmPassword(e.target.value);
                                        setPasswordsMatch(password === e.target.value);
                                }}
                                />
                                <p className="text-center text-small">
                                    Already have an account?{" "}
                                    <Link size="sm" onPress={() => setSelected("login")}>
                                        Login
                                    </Link>
                                </p>
                                <div className="flex gap-2 justify-end">
                                    <Button onPress={onOpen} onClick={handleRegiser} isDisabled={!passwordsMatch} fullWidth color="primary">
                                        Sign up
                                    </Button>
                                    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                                        <ModalContent>
                                            {(onClose) => (
                                                <>
                                                    <ModalHeader className="flex flex-col gap-1">
                                                        {errorMessage}
                                                    </ModalHeader>
                                                    <ModalFooter>
                                                        <Button color="primary" onPress={onClose}>
                                                            OK
                                                        </Button>
                                                    </ModalFooter>
                                                </>
                                            )}
                                        </ModalContent>
                                    </Modal>
                                </div>
                            </form>
                        </Tab>
                    </Tabs>
                    {errorMessage && <p className="text-center text-medium">{errorMessage}</p>}
                </CardBody>
            </Card>
        </div>
    );
};

export default SigninForm;
