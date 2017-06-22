// @flow
import React from "react";
import UrlInput from "./UrlInput";
import IntervalInput from "./IntervalInput";
import Timer from "../utils/timer";
import Socket from "../utils/socket";
import type {
  RequestState,
  // Message,
  BackgroundMessage,
} from "../utils/types";

const DEFAULT_INTERVAL = 15 * Timer.minute;

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
  socket: Socket

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
    this.socket = this.initSocket();
  }

  initSocket = (): Socket => {
    const socket = new Socket();
    socket.addListener("On connect", (response: BackgroundMessage) => {
      if (response.id === "On connect") {
        const newState = response.data;
        this.setState({
          ...newState,
        });
      }
    });
    return socket;
  }

  setUrl = (url: string): void => {
    return this.setState({ url: url });
  }

  setInterval = (interval: number): void => {
    return this.setState({ interval: interval });
  }

  startSearch = (): void => {
    this.socket.postMessage({
      id: "Start search",
      data: {url: this.state.url, interval: this.state.interval},
    });
  }

  clearSearch = (): void => {
    this.socket.postMessage({id: "Clear search"});
  }

  render() {
    return (
      <div>
        <UrlInput onChange={this.setUrl} url={this.state.url} />
        <IntervalInput onChange={this.setInterval} interval={this.state.interval} />
        <button onClick={this.startSearch} disabled={this.state.requestState.type === "Start"}>Search</button>
        <button onClick={this.clearSearch}>Clear</button>
      </div>
    );
  }
};
