// @flow
import React from "react";


type Props = {
  onChange: (interval: number) => void,
  interval: number,
}

type State = {

}

export default class extends React.Component {
  props: Props
  state: State
  constructor(props: Props) {
    super(props);
  }

  onChange = (event: Object): void => {
    const interval = event.target.value;
    this.props.onChange(interval);
  }

  render() {
    return (
      <div>
        <h4>Add Interval</h4>
        <input
          type="number"
          placeholder="Interval"
          value={this.props.interval}
          onChange={this.onChange}
        />
      </div>
    );
  }
};
