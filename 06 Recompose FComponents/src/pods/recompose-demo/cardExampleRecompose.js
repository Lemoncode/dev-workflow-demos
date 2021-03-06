import * as React from "react";
import {withState} from "recompose";

const TitledCard = ({isOpen, setOpen, title, text}) => (
    <Card>
        <Title toggleOpen={() => setOpen(!isOpen)} title={title}/>
        <Body isOpen={isOpen}>{text}</Body>
    </Card>
);

export default withState("isOpen", "setOpen", false)(TitledCard)
