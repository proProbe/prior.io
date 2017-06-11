// @flow
import React from "react";
import Timer from "../utils/timer";
import type {
	RequestState,
	Message,
	BackgroundMessage,
} from "../utils/types";

declare var chrome: any;

const DEFAULT_INTERVAL = 15 * Timer.minute;

type Port = {
	postMessage: (msg: BackgroundMessage) => void,
	onMessage: {
		addListener: ((msg: Message) => void) => void,
	},
}

type Props = {
}

type State = {
	url: string,
	interval: number,
	requestState: RequestState,
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
			requestState: {type: "None"},
		};
	}

	componentDidMount() {
		chrome.runtime.onConnect.addListener((port: Port) => {
			// Send a message to popup with the current state
			port.postMessage({id: "On connect", data: {
				url: this.state.url,
				interval: this.state.interval,
				requestState: this.state.requestState,
			}});

			// Start the listeners and update the state accordingly
			port.onMessage.addListener((msg: Message) => {
				const newState = this.update(this.state, msg);
				this.setState({
					...newState,
				});
			});
		});
	}

	update = (state: State, msg: Message): State => {
		console.log("Updating: ", state, msg);
		switch (msg.id) {
			case "Start search":
				this.requestHtml(msg.data.url);
				return {
					...state,
					...msg.data,
					requestState: {
						type: "Start",
					},
				};
			case "Clear search":
				this.clearIntervalID();
				return {
					...state,
					requestState: {
						type: "Reset",
					},
				};
			case "Error":
				return {
					...state,
					requestState: {
						type: "Error",
						error: new Error("Something went wrong"),
					},
				};
			default:
				console.log("In default, should not come here?");
				(msg.id: empty);
				return state;
		}
	}

	requestHtml = (url: string) => {
		const testRequest = new Request(url);
		fetch(testRequest)
			.then((response) => {
				const htmlPromise = response.text();
				return htmlPromise;
			})
			.then((html) => {
				console.log(html);
			})
			.catch((err) => {
				console.error(err);
			});
		this.setState({

		});
	}

	clearIntervalID = (): void => {
		if (this.intervalID) {
			clearInterval(this.intervalID);
			this.intervalID = undefined;
		}
	}

	render() {
		return (
			<div>
			</div>
		);
	}
};
