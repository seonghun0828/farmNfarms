import React, { useEffect, useState } from 'react';
import InputButton from '../../molecules/InputButton';
import sendVerificationNum from './sendVerificationNum';
import CreateVerification from './CreateVerification';

const PhoneVerification = ({ setIsVerificated, setPhone }) => {

  const [inputs, setInputs] = useState({
    phone: '',
    validationNum: '',    
  });
  const { phone, validationNum } = inputs;

  const [verificationId, setVerificationId] = useState(null);
  const [buttonMode, setButtonMode] = useState('secondary');

  const [errorType, setErrorType] = useState(null);

  const [status, setStatus] = useState({
    phoneStatus: 'default',
    validationNumStatus: 'default'
  });

  const [alert, setAlert] = useState({
    phoneAlert: '',
    validationNumAlert: ''
  })

  const {phoneStatus, validationNumStatus} = status;
  const {phoneAlert, validationNumAlert} = alert;

  const phoneValidate = () => {
    const regex = /^[0-9]+$/g;
    // 전화번호 공백, - 제거 
    const trimmedPhone = phone.replaceAll(' ', '').replaceAll('-', '');
    // 전화번호 숫자로만 이뤄져있는지 / 11글자인지 / 010으로 시작하는지 점검
    if (!regex.test(trimmedPhone) || trimmedPhone.length !== 11 || trimmedPhone.substring(0, 3) !== '010') 
        return 1;

    setInputs(inputs => ({
        ...inputs,
        phone: trimmedPhone,
    }));

    return 2;
  }

  
  // 인증 번호 받는 함수
  const clickVerificationBtn = async () => {

    const result = phoneValidate();

    switch (result) {
      case 1:
        setStatus(status => ({
          ...status,
          phoneStatus: 'error',
          validationNumStatus: 'default'
        }));
        setAlert(alert => ({
          ...alert,
          phoneAlert: '휴대전화 번호를 올바르게 입력해주세요',
          validationNumAlert: ''
        }));
        break;
      case 2:
        setStatus(status => ({
          ...status,
          phoneStatus: 'default',
          validationNumStatus: 'default'
        }));
        setAlert(alert => ({
          ...alert,
          phoneAlert: '',
          validationNumAlert: ''
        }));
        setVerificationId(await CreateVerification(phone));
        break;
      default:
    }
  };

  // 인증 번호 확인 하는 함수
  const checkVerificationNum = async () => {
    const isVerificated = await sendVerificationNum(validationNum, verificationId, setErrorType);

    if (isVerificated) {
      setStatus(status => ({
        ...status,
        phoneStatus: 'readOnly',
        validationNumStatus: 'readOnly',
      }));
      setAlert(alert => ({
        ...alert,
        phoneAlert: '',
        validationNumAlert: '',
      }));
      setButtonMode('readonly')
      setIsVerificated(true)
      setPhone(phone)
    }

    else {
      setStatus(status => ({
        ...status,
        phoneStatus: 'default',
        validationNumStatus: 'error'
      }));
      setAlert(alert => ({
        ...alert,
        phoneAlert: '',
        validationNumAlert: '인증 번호가 올바르지 않습니다.'
      }));

      setIsVerificated(false)
    }
  };

  useEffect(() => {
    setPhone(phone)
  }, [phone]);

  return (
    <>
    <InputButton 
      label="아이디" 
      placeholder="휴대전화 번호" 
      btnMsg="인증번호받기" 
      btnFontSize="md" 
      mode={buttonMode} 
      name="phone"
      status={phoneStatus}
      helpMsg={phoneAlert}
      setValue={setInputs}
      btnClick={clickVerificationBtn}
      value={phone}
    />
    <InputButton 
      label="인증번호" 
      placeholder="인증 번호" 
      btnMsg="확인" 
      btnFontSize="md" 
      mode={buttonMode}
      name="validationNum"
      status={validationNumStatus}
      helpMsg={validationNumAlert}
      setValue={setInputs}
      btnClick={checkVerificationNum}
    />
    </>
  );

}

export default PhoneVerification;