import { useState } from 'react'

function MockingTest () {

  const [userData, setUserData] = useState();

  function getUsersHandler() {
    fetch('/users')
    .then((res) => {
      return res.json()
    })
    .then((json) => {
      setUserData(json)
    })
  }

  return (
    <div>
      <button onClick={getUsersHandler}>멤버</button>
      {userData &&
        userData.users.map((user) => (
          <div key={user.id}>이름 : {user.name} 나이 : {user.age}</div>
        ))
      }
    </div>
  );
}

export default MockingTest;
