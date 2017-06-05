// @flow
import React from "react";
import UrlInput from "./UrlInput";
import IntervalInput from "./IntervalInput";
import Timer from "../utils/timer";
import Socket from "../utils/socket";

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
	socket: Socket

	constructor(props: Props) {
		super(props);
		this.state = this.initState();
		this.socket = this.initSocket();
	}

	initState = (): State => {
		return {
			url: "",
			interval: DEFAULT_INTERVAL,
		};
	}

	initSocket = (): Socket => {
		const socket = new Socket();
		socket.addListener("test2", (response) => {
			console.log(response);
		});
		return socket;
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
		this.socket.postMessage({id: "test", content: "testing it out"});
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
