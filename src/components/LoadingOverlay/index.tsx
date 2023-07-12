import React, { PropsWithChildren } from "react";
import "./style.scss";

interface Props extends PropsWithChildren<any> {}

const defaultProps: Props = {};

const LoadingOverlay: React.FC<Props> = (props) => {
	return (
		<div className="loader-container">
			<span className="loader"></span>
		</div>
	);
};

LoadingOverlay.defaultProps = defaultProps;

export default LoadingOverlay;
