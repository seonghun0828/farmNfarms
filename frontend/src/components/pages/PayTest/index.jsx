import Button from "../../atoms/Button";
import pay from "./pay";

const PayTest = () => {
  return (
    <Button onClick={() => {pay(0)}}>구매하기</Button>
  );
}

export default PayTest;