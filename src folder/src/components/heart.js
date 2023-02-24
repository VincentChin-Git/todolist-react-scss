import React from "react";

const Heart = props => (
    <div className="d-inline-block heart-wrapper">

        {props.liked ?
            <i className="fa fa-heart" onClick={props.toggle} />
            :
            <i className="fa fa-heart-o" onClick={props.toggle} />
        }
    </div>
)

export default Heart;