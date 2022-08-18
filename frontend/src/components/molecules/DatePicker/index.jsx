import {useState, useEffect} from 'react';
import buildWeek from './buildWeek'
import moment from 'moment';
import styled, {css} from 'styled-components';
import Text from '../../atoms/Text';
import Date from './Date';
import theme from '../../../common/theme';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const StyledDatePicker = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: white;
  margin-top: 0.5rem;
  padding 1rem 1.5rem 1.5rem 1.5rem;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
  gap: 1rem;
`

const HeadContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`

const DateContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${theme.colors.gray2};
  border-radius: 1rem;
  overflow: hidden;
  width: 100%;
`

const Day = styled.div`
  width: 100%;
  padding: 1rem 0;
  text-align: center;
  cursor: pointer;
  color: ${({value}) => {
    if (value.day() === 0 || value.day() === 6) {
      return `${theme.colors.red};`
    } else {
      return `${theme.colors.black};`
    }
  }}}

  ${({value, selectedDate}) => {
    if (value.format("YYYY-MM-DD") === selectedDate) {
      return css`
        background-color: ${theme.colors.colar};
        color: ${theme.colors.white};
      `
    }
  }}

  ${({value}) => {
    if (!value.isBefore(moment())) {
      return css`
        color: ${theme.colors.gray3};
      `
    }
  }}
`

const DayContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const Button = styled.button`
  all: unset;
  padding: 0.6rem 1rem;
  border: 1px solid ${theme.colors.green3};
  color: ${theme.colors.green3};
  border-radius: 1rem;
  cursor: pointer;
  background-color: ${theme.colors.white};
`
const DatePicker = ({setValue}) => {

  const [centerDate, setCenterDate] = useState(moment());
  const [Week, setWeek] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD"));
 
  useEffect(() => {
    setWeek(buildWeek(centerDate));
  }, [centerDate])

  const Next = () => {
    setCenterDate((p) => p.clone().add(1, "week"))
  }

  const Prev = () => {
    setCenterDate((p) => p.clone().subtract(1, "week"))
  }

  const ClickedDay = (day) => {
    if (day.isBefore(moment())) {
      setValue(day.format("YYYY-MM-DD"));
      setSelectedDate(day.format("YYYY-MM-DD"));
    }
  }

  console.log(selectedDate);

  return (
    <StyledDatePicker>
      <HeadContainer>
        <Button onClick={Prev}>
          이전
        </Button>
        <Text size="xxxl" weight="bold">{centerDate.format("YYYY")}년 {centerDate.format("MM")}월</Text>
        <Button onClick={Next}>
          다음
        </Button>
      </HeadContainer>
      <DateContainer>
        {
          Week.map((day, index) => {
            return (
              <DayContainer key={index}>
                <Date value={day}/>
                <Day 
                  onClick={(e) => ClickedDay(day, e)}
                  value={day}
                  selectedDate={selectedDate}
                >
                  {day.format("DD")}
                </Day>
              </DayContainer>
            );
          })
        }
      </DateContainer>
    </StyledDatePicker>
  );
}

export default DatePicker;