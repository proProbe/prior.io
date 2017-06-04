// @flow
import React from "react";


type Props = {
	onInput: (interval: number) => void,
}

type State = {

}

export default class extends React.Component {
	props: Props
	state: State
	constructor(props: Props) {
		super(props);
	}

	onInput = (event: Object): void => {
		const interval = event.target.value;
		this.props.onInput(interval);
	}

	render() {
		return (
			<div>
				<h4>Add Interval</h4>
				<input type="number" placeholder="Interval" onInput={this.onInput} />
			</div>
		);
	}
};