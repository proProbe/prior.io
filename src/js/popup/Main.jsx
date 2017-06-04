import React from "react";
import UrlInput from "./UrlInput";
import IntervalInput from "./IntervalInput";

export default class extends React.Component {
	render() {
		return (
			<div>
				<UrlInput />
				<IntervalInput />
				<button>Search</button>
				<button>Clear</button>
			</div>
		);
	}
};
