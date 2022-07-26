import React from "react";
import Checkbox from "../../atoms/Checkbox";
import Image from "../../atoms/Image";
import Label from "../../atoms/Label";
import CheckboxLabel from "../../molecules/CheckboxLabel";

const Login = () => {
    return <>
        <h1>Login Page</h1>
        <Label htmlFor="one" color='green3' size="xxl" >sdfafweagaeghef</Label>
        <Checkbox id="one" name='check' value="aha"  size='xxxl' />
        <Image src='https://images.unsplash.com/photo-1658732049821-0e5ce13224cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=60' alt='moutain' size='xxxl' />
        <CheckboxLabel text="휴대전화 번호 저장" size='lg' id="phone-save" />
    </>
}

export default Login;