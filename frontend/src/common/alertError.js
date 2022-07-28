export const alertError = (error) => {
    console.log(error);
    window.alert('서버와의 연결이 불안정합니다. 잠시 후에 다시 시도해주세요.');
}