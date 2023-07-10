import React from "react";

function MyButton(props) {
    return (
        <button className="p-2 w-40 bg-white rounded-lg  text-lg border-[#19A7CE] border-2 hover:cursor-pointer hover:bg-[#146C94] hover:text-white ease-in-out duration-500" onClick={props.onClick}>
        {props.name}
      </button>
    );
}

export default MyButton;