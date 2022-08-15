import React, { useState, useEffect } from 'react';
import Input from '../../atoms/Input';
import InputButton from '../../molecules/InputButton';
import { useDaumPostcodePopup } from 'react-daum-postcode';

const PostCode = ({setPostCode, defaultValue}) => {

  const [inputs, setInputs] = useState({
		zonecode: '',
    address: '',
    extraAddress: '',
		detailAddress: '',
    fullAddress: '',
	});

  const {zonecode, address, extraAddress, detailAddress, fullAddress } = inputs;

  const open = useDaumPostcodePopup();

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setInputs(inputs => ({
      ...inputs,
      zonecode: data.zonecode,
      address: data.address,
      extraAddress: extraAddress,
      fullAddress: fullAddress,
    }))
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  useEffect(() => {
    setInputs(defaultValue);
  }, [defaultValue.zonecode]);

  useEffect(() => {
    setPostCode(inputs)
  }, [inputs]);

  return (
    <>
      <InputButton 
        onClick={handleClick}
        label="주소"
        mode="secondary"
        placeholder="우편번호"
        btnFontSize="md"
        btnMsg="주소검색"
        status="readOnly"
        name="zonecode"
        value={zonecode}
      >
      </InputButton>
      <Input 
        placeholder="주소"
        status="readOnly"
        name="address"
        value={fullAddress}
      />
      <Input 
        placeholder="상세주소를 입력해주세요"
        name="detailAddress"
        value={detailAddress}
        setValue={setInputs}
      />
    </>
  );
}

PostCode.defaultProps = {
  defaultValue: {
		zonecode: '',
    address: '',
    extraAddress: '',
		detailAddress: '',
    fullAddress: '',    
  }
}

export default PostCode;