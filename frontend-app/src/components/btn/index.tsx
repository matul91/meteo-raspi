import React from 'react';

type Props = {
    children: string,
    onClick: () => void;
};

export default class Btn extends React.PureComponent<Props, {}> {
    render() {
        return (
            <button
                className="btn"
                onClick={() => {}}>
                {this.props.children}
            </button>
        );
    }
}
