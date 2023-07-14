import React from 'react';

export default class Child extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    console.log(this.props);
    console.log('after: ', this.props);
    return (
      <div>
        <div>{this.props.check}</div>
        <div
          onClick={() => {
            this.props.check = 'nishabi';
            console.log(this.props);
          }}
        >
          Click me!
        </div>
      </div>
    )
  }
}
