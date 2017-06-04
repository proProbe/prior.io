// @flow
import React from "react";
import UrlInput from "./UrlInput";
import IntervalInput from "./IntervalInput";
import Timer from "../utils/timer";

const DEFAULT_INTERVAL = 15 * Timer.minute;

type Props = {
}

type State = {
	url: string,
	interval: number,
}

export default class extends React.Component {
	props: Props
	state: State
	intervalID: ?number
	constructor(props: Props) {
		super(props);
		this.state = this.initState();
	}

	initState = (): State => {
		return {
			url: "",
			interval: DEFAULT_INTERVAL,
		};
	}

	clearIntervalID = (): void => {
		if (this.intervalID) {
			clearInterval(this.intervalID);
			this.intervalID = undefined;
		}
	}

	setUrl = (url: string): void => {
		return this.setState({ url: url });
	}

	setInterval = (interval: number): void => {
		return this.setState({ interval: interval });
	}

	startSearch = (): void => {
		console.log("startsearch");
	}

	clearSearch = (): void => {
		this.clearIntervalID();
	}

	render() {
		return (
			<div>
				<UrlInput onInput={this.setUrl} />
				<IntervalInput onInput={this.setInterval} />
				<button onClick={this.startSearch}>Search</button>
				<button onClick={this.clearSearch}>Clear</button>
			</div>
		);
	}
};
