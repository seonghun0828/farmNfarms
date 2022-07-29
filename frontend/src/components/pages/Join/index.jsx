import React from "react";
import Button from "../../atoms/Button"
import Text from "../../atoms/Text"
import JoinForm from "./JoinForm";
import Image from '../../atoms/Image';

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
				src='https://s3.us-west-2.amazonaws.com/secure.notion-static.com/99efce4a-4b32-45c7-820a-51154be98a7d/IMG_A334C9DFEFB8-1.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220729%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220729T001802Z&X-Amz-Expires=86400&X-Amz-Signature=eb7469e19769eb98939dd75d349e55e52d2ce21b676a5d00970e665143ac2eaf&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22IMG_A334C9DFEFB8-1.jpeg%22&x-id=GetObject'></Image>
			<br/>
			<Text color="green3" weight="bold" size="xxxl">회원가입</Text>
			<JoinForm></JoinForm>
			<Button mode="graytext">하이</Button>

		</div>
	);
}

export default Join;