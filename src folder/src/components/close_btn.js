import React from "react";
import { Col, Row } from "reactstrap";

const CloseBtn = (props) => {
    return (
        <Row onClick={props.click} className="close_btn width_2rem ml-auto">
            <Col xs="12" className="line" />
            <Col xs="12" className="line" />
        </Row>
    )
}

export default CloseBtn;