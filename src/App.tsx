import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { groupTestCode } from "./services/groupcode";
import { getGroupCodeOfTestCodeNo } from "./services/copyLab";
import {
	exportExcelFile,
	readExcelFile,
	readExcelFile2,
} from "./helper/readExcelFile";
import { ExcelObject } from "./types";
import { getGroupComponent } from "./services/groupComponent";

function App() {
	useEffect(() => {
		// groupTestCode();
		// getGroupCodeOfTestCodeNo();
		document.title = "Anh Hong";
	}, []);

	const inputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = (e.target.files && Array.from(e.target.files)) || [];

		if (files.length > 0) {
			try {
				const data = await readExcelFile(files);
				const result = getGroupCodeOfTestCodeNo(data.groupno, data.groupOnly);
				exportExcelFile(result);

				// const data = await readExcelFile2(files);
				// getGroupComponent(data);
			} catch (error) {
				alert("An error occurred, please try again");
			}
		}
	};

	return (
		<div>
			<input
				type="file"
				accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
				onChange={inputChange}
			/>
		</div>
	);
}

export default App;
