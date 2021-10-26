import React, { Component } from 'react';

class Buttton extends Component {
    // state = {  }
    render() {
        return (
            <button id={this.props.id} className={`button ${this.props.className ? this.props.className : ''}`} onClick={this.props.onClick}>
                {this.props.nums !== undefined ? this.props.nums : this.props.children}
            </button>
        );
    }
}

export default Buttton;