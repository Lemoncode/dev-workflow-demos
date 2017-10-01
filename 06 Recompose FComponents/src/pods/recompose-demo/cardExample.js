import * as React from "react";

export default class TitledCard extends React.Component {
    state = {
        isOpen: false,
    };

    render () {
        const {title, text} = this.props;
        const {isOpen} = this.state;

        return (
            <Card>
                <Title toggleOpen={this.toggleOpen} title={title}/>
                <Body isOpen={isOpen}>{text}</Body>
            </Card>
        );
    }

    toggleOpen = () => this.setState({isOpen: !this.state.isOpen});
}