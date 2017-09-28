import * as React from "react";

export default class TitledCard extends React.Component {
    state = {
        isOpen: false,
    };

    render () {
        const {title, text} = this.props;
        const {isOpen} = this.state;
        const {setOpen} = this;

        return (
            <Card>
                <Title setOpen={setOpen} title={title}/>
                <Body isOpen={isOpen}>{text}</Body>
            </Card>
        );
    }

    setOpen = (value) => this.setState({isOpen: value});
}