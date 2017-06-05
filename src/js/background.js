// @flow
declare var chrome: any;

chrome.runtime.onConnect.addListener((port) => {
	console.log(port);
	port.onMessage.addListener((msg) => {
		console.log(msg);
		port.postMessage({id: "test2", content: "whaaat"});
	});
});