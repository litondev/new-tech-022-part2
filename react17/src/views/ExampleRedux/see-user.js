import React from 'react'
import { useSelector } from 'react-redux'

export default function SeeUser() {
  const user = useSelector((state) => state.user.value)
  
  return (
    <div>
        { user }      
    </div>
  )
}