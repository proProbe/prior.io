// @flow
import React from "react";
import Timer from "../utils/timer";
// import jsDiff from "diff";
const jsdiff = require('diff');
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
    console.log(jsdiff);
  }

  initState = (): State => {
    return {
      url: "",
      interval: DEFAULT_INTERVAL,
      requestState: { type: "None" },
    };
  }

  componentDidMount() {
    chrome.runtime.onConnect.addListener((port: Port) => {
      // Send a message to popup with the current state
      port.postMessage({
        id: "On connect", data: {
          url: this.state.url,
          interval: this.state.interval,
          requestState: this.state.requestState,
        }
      });

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
        this.intervalID = setInterval(() => {
          this.requestHtml(msg.data.url);
        }, 3000);
        return {
          ...state,
          ...msg.data,
          requestState: {
            type: "Start",
            url: msg.data.url,
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
    console.log("fetching", this.state);
    const testRequest = new Request(url);
    fetch(testRequest)
      .then((response) => {
        const htmlPromise = response.text();
        return htmlPromise;
      })
      .then((html) => {
        if (this.state.requestState.type === "In progress") {
          const diff = jsdiff.diffLines(
            this.state.requestState.htmlToCheck,
            html,
            { ignoreWhitespace: true },
          );
          if (diff.length === 0) {
            this.setState({
              ...this.state,
              requestState: {
                type: "In progress",
                htmlToCheck: html,
              },
            });
          } else {
            this.clearIntervalID();
            alert(
              diff
                .map((part) => {
                  return part.value;
                })
                .join("")
            );
            this.setState({
              ...this.state,
              requestState: {
                type: "Done",
                changes: diff,
              },
            });
          }
        } else {
          this.setState({
            ...this.state,
            requestState: {
              type: "In progress",
              htmlToCheck: html,
            },
          });
        }
      })
      .catch((err) => {
        this.clearIntervalID();
        this.setState({
          ...this.state,
          requestState: {
            type: "Error",
            error: err,
          },
        });
        console.log(err);
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
