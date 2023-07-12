import React from "react";

function MyButton(props) {
  const buttonClassName = `p-2 w-40 bg-white rounded-lg text-lg border-[#19A7CE] border-2 hover:cursor-pointer hover:bg-[#146C94] hover:text-white ease-in-out duration-500 ${props.className}`;

    return (
        <button className={buttonClassName} onClick={props.onClick}>
        {props.name}
      </button>
    );
}

export default MyButton;