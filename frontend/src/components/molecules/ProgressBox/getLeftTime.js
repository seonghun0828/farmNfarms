const getLeftTime = (createAt, setLeftTime) => {
  const diff = new Date(createAt) - new Date() + (24 * 1000 * 60 * 60);
  const hour = Math.floor(diff / 1000 / 60 / 60);
  const minute = Math.floor((diff - hour * 1000 * 60 * 60) / 1000 / 60);
  const second = Math.floor((diff - (hour * 1000 * 60 * 60) - (minute * 1000 * 60)) / 1000);
  setLeftTime(hour + '시간 ' + minute + '분 ' + second + '초');
  return hour + '시간 ' + minute + '분 ' + second + '초';
}

export default getLeftTime;