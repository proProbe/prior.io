// @flow
declare var chrome: any;

type Listener = {
	id: string,
	cb: () => void,
}

type Msg = {
	id: string,
	content: any,
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
		this.port.onMessage.addListener((msg: Msg) => {
			this.listeners.map((listener: Listener) => {
				if (listener.id === msg.id) {
					listener.cb(msg);
				}
				return listener;
			});
		});
	}

	addListener = (id: string, cb: () => void): void => {
		this.listeners = this.listeners.concat([{ id, cb }]);
	}

	postMessage = (message: Msg): void => {
		this.port.postMessage(message.id, message.content);
	}
}