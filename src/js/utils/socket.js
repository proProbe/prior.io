// @flow
declare var chrome: any;
import type {
	// RequestState,
	Message,
	BackgroundMessage,
} from "./constants";

type Listener = {
	id: string,
	cb: (msg: BackgroundMessage) => void,
}

const EXTENSION_ID = "prior.io";

export default class ChromeSocket {
	port: any
	listeners: Listener[]

	constructor(): void {
		this.port = chrome.runtime.connect({name: EXTENSION_ID});
		this.listeners = [];
		this.initListener();
	}

	initListener = () => {
		this.port.onMessage.addListener((msg: BackgroundMessage) => {
			this.listeners.map((listener: Listener) => {
				if (listener.id === msg.id) {
					listener.cb(msg);
				}
				return listener;
			});
		});
	}

	addListener = (id: string, cb: (msg: BackgroundMessage) => void): void => {
		this.listeners = this.listeners.concat([{ id, cb }]);
	}

	postMessage = (msg: Message): void => {
		this.port.postMessage(msg);
	}
}