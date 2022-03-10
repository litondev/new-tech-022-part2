import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../../store/user.js'
import { useNavigate } from "react-router-dom";

export default function User() {
  const user = useSelector((state) => state.user.value)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  
  return (
    <div>
      <div>
        <button
          aria-label="Set User"
          onClick={() => dispatch(setUser("Iam User"))}
        >
          Set User
        </button>

        <br/>

        <span>{user}</span>

        <br/>

        <button onClick={() => navigate("/example-redux/see-user")}>See User</button>
      </div>
    </div>
  )
}