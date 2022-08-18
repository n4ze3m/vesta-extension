import React from "react"
import { Navigate } from "react-router-dom"

type IProps = {
  children: React.ReactNode
}

export const Protect = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token") !== null

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  return children
}
