import React from "react";
import InputButton from "../../molecules/InputButton";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button"
import Text from "../../atoms/Text"
import JoinForm from "./JoinForm";
import Image from '../../atoms/Image';
import { Postcode } from "./DaumPostCodePopup";
import SearchBar from "../../molecules/SearchBar";
import Select from "../../atoms/Select";

const Join = () => {

	return (
		<div>
			<h1>Join Page</h1>
			<Button mode="graytext">
				뒤로가기
			</Button>
			<br/>
			<Image
				size='xxxl' 
				src='https://s3.us-west-2.amazonaws.com/secure.notion-static.com/99efce4a-4b32-45c7-820a-51154be98a7d/IMG_A334C9DFEFB8-1.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220727%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220727T040426Z&X-Amz-Expires=86400&X-Amz-Signature=6285251e220524f6b904d485088685d58aa7956505ec82f6c2fea490ba47f5c1&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22IMG_A334C9DFEFB8-1.jpeg%22&x-id=GetObject'></Image>
			<br/>
			<Text color="green3" weight="bold" size="xxxl">회원가입</Text>
			<JoinForm></JoinForm>
			<Button mode="graytext">하이</Button>
			<Postcode></Postcode>
			<SearchBar/>
		</div>
	);
}

export default Join;