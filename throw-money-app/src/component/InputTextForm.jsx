import React from 'react'

// テキストフォームのコンポーネント
export const InputTextForm = (props) => {
  return (
    <div>
      <label htmlFor={props.name}>
        {props.labelName}:
        <input type={props.type} name={props.name} value={props.value} onChange={props.onChange} />
      </label>
    </div>
  )
}

export default InputTextForm
