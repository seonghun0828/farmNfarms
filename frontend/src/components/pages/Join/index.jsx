import React from "react";
import InputButton from "../../molecules/InputButton";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button"
import Text from "../../atoms/Text"
import JoinForm from "./JoinForm";
import Image from '../../atoms/Image';

const Join = () => {
	return (
		<div>
			<h1>Join Page</h1>
			<br/>
			<Image src="https://src.hidoc.co.kr/image/lib/2021/4/28/1619598179113_0.jpg"></Image>
			<br/>
			<Text color="green3" weight="bold" size="xxxl">회원가입</Text>
			<JoinForm></JoinForm>
			<Button mode="graytext">하이</Button>
		</div>
	);
}

export default Join;