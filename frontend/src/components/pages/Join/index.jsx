import React from "react";
import InputButton from "../../molecules/InputButton";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button"
import Text from "../../atoms/Text"
import TxtButton from "../../atoms/TxtButton";
import JoinForm from "./JoinForm";
import Image from '../../atoms/Image';

const Join = () => {
	return (
		<div>
			<h1>Join Page</h1>
			<TxtButton color='gray2' weight="bold" size="lg">←뒤로가기</TxtButton>
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