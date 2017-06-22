// @flow
import React from "react";

type Props = {
  onChange: (url: string) => void,
  url: string,
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
    const url = event.target.value;
    this.props.onChange(url);
  }

  render() {
    return (
      <div>
        <h4>Add url here!</h4>
        <input
          type="text"
          placeholder="Url"
          value={this.props.url}
          onChange={this.onChange}
        />
      </div>
    );
  }
};
