// @flow
import React from "react";

type Props = {
	onInput: (url: string) => void,
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
		const url = event.target.value;
		this.props.onInput(url);
	}

	render() {
		return (
			<div>
				<h4>Add url here!</h4>
				<input
					type="text"
					placeholder="Url"
					onInput={this.onInput}
				/>
			</div>
		);
	}
};