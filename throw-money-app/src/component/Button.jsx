import React from 'react'

const Button = (props) => {
  console.log('Buttonコンポーネント')
  return <button onClick={() => props.onClick()}>{props.value}</button>
}

export default Button
