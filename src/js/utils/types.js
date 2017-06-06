// @flow

// States
export type RequestState =
	| {type: "None"}
	| {type: "Success"}
	| {type: "Start"}
	| {type: "In progress"}
	| {type: "Done", changed: boolean}
	| {type: "Error", error: Error}
	| {type: "Reset"}

type State = {
	url: string,
	interval: number,
}
type OnConnectState = State & {requestState: RequestState};


// Messages
export type Message =
	| {id: "Start search", data: State}
	| {id: "Clear search"}
	| {id: "Error", error: Error}

export type BackgroundMessage = Message | {id: "On connect", data: OnConnectState}