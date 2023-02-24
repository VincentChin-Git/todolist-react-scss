import React from "react";

const theme_list = ['purple', 'tblue', 'red', 'khaki'];

const ToDo = props => {
    let theme = theme_list[props.index % 4];
    return (
        <div onClick={props.click} className={"to_do_card bg_" + theme}>
            <div className="to_do_title ">{props.data.title}</div>
            <div className="task_wrapper ">

                {props.data.todo
                    .filter((todo, index) => index < 4)
                    .map((todo, index) => (
                        <div key={index} className={"d-flex my-2 to_do_item  " + (todo.status ? "done" : "")}>
                            {todo.name}
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default ToDo;