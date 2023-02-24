import React from "react";

const Task = props => (
    <div className={"my-4 task " + (props.data.status ? " done" : "")} onClick={props.click}>
        {!props.data.status ?
            <i className="fa fa-clock-o icon_pending" />
            :
            <i className="fa fa-check icon_done" />
        }
        <label className="font-weight-bold mb-0 taskname">{props.data.name}</label>

        <div></div>
        {props.data.status && props.data.date != "" ?
            <div className="done_date">{props.data.date}</div>
            :
            <div className="not_done">1</div>
        }

    </div>
)

export default Task;