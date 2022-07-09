import React from "react";
import playIcon from "../../assets/play-btn.svg";
import editIcon from "../../assets/pencil.svg";
import deleteIcon from "../../assets/trash.svg";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ActionButton = ({ url, _id }) => {
    return (
        <>
            <Button className="post-button" href={url} target="_blank">
                <img src={playIcon} alt="play" width="32" height="32" />
            </Button>
            <Button variant="primary" className="post-button" href={url}>
                <img src={editIcon} alt="play" width="24" height="24" />
            </Button>
            <Button className="post-button" href={url}>
                <img src={deleteIcon} alt="play" width="24" height="24" />
            </Button>
        </>
    );
};

export default ActionButton;
