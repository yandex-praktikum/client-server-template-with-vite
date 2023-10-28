import React from 'react'

type TMyErrorMessage = {
  message: string
}

export const MyErrorMessage = ({ message }: TMyErrorMessage) => (
  <p className="form-error-message">{message}</p>
)
