import React, {
	DragEvent,
	PropsWithChildren,
	useEffect,
	useState,
} from "react";
import PropTypes from "prop-types";
import "./style.scss";

interface Props extends PropsWithChildren<any> {
	onChange?: (file: File[]) => Promise<void>;
}

const defaultProps: Props = {};

const UploadFile: React.FC<Props> = (props) => {
	const { onChange } = props;

	useEffect(() => {
		const dropContainer =
			document.getElementById("dropcontainer") || ({} as HTMLElement);
		const fileInput = (document.getElementById("inputFile") ||
			{}) as HTMLInputElement;

		dropContainer.addEventListener(
			"dragover",
			(e) => {
				// prevent default to allow drop
				e.preventDefault();
			},
			false
		);

		dropContainer.addEventListener("dragenter", () => {
			dropContainer.classList.add("drag-active");
		});

		dropContainer.addEventListener("dragleave", () => {
			dropContainer.classList.remove("drag-active");
		});

		dropContainer.addEventListener("drop", (e) => {
			e.preventDefault();
			dropContainer.classList.remove("drag-active");
			fileInput.files = e?.dataTransfer?.files as FileList;
			const files = Array.from(fileInput.files) || [];
			onChange && onChange(files);
		});
	}, []);

	const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = (e.target.files && Array.from(e.target.files)) || [];
		onChange && onChange(files);
	};

	return (
		<label htmlFor="inputFile" className="drop-container" id="dropcontainer">
			<span className={`drop-title`}>Drop file here</span>
			or
			<input
				id="inputFile"
				type="file"
				accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
				multiple={false}
				onChange={handleChangeFile}
			/>
		</label>
	);
};

UploadFile.defaultProps = defaultProps;

export default UploadFile;
