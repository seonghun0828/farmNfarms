import Swal from "sweetalert2";
import theme from "./theme";

export const alertError = (error) => {
    console.log(error);
    // window.alert('서버와의 연결이 불안정합니다. 잠시 후에 다시 시도해주세요.');
    Swal.fire({
        title: '에러!',
        text: '서버와의 연결이 불안정 합니다. 잠시 후에 다시 시도해주세요.',
        width: 310,
        imageUrl: '/assets/Swal_image/터진수박.png',
        imageHeight: 150,
        confirmButtonColor: theme.colors.green3, 
    })
}