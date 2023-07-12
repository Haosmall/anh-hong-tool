import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { groupTestCode } from "./services/groupcode";
import { getGroupCodeOfTestCodeNo } from "./services/copyLab";
import {
	exportExcelFile,
	readExcelFile,
	readExcelFile2,
} from "./helper/readExcelFile";
import { ExcelObject, GroupTestCodeData } from "./types";
import { getGroupComponent } from "./services/groupComponent";
import { compare2File, splitTestCode } from "./services/check2file";
import UploadFile from "./components/UploadFile";
import LoadingOverlay from "./components/LoadingOverlay";

function App() {
	useEffect(() => {
		// groupTestCode();
		// getGroupCodeOfTestCodeNo();
		document.title = "Anh Hong";
	}, []);

	const [loading, setLoading] = useState<Boolean>(false);

	const [flag, setFlag] = useState({ data1: false, data2: false });
	const [data1, setData1] = useState<GroupTestCodeData[]>([]);
	const [data2, setData2] = useState<GroupTestCodeData[]>([]);

	useEffect(() => {
		if (flag.data1 && flag.data2) {
			console.log("change", flag);
			console.log(data1);
			compare2File(data1, data2);
			setFlag({ data1: false, data2: false });
		}
	}, [flag]);

	const inputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = (e.target.files && Array.from(e.target.files)) || [];

		if (files.length > 0) {
			try {
				// const data = await readExcelFile(files);
				// const result = getGroupCodeOfTestCodeNo(data.groupno, data.groupOnly);
				// exportExcelFile(result);

				const data = await readExcelFile2(files);
				getGroupComponent(data);
			} catch (error) {
				alert("An error occurred, please try again");
			}
		}
	};

	const input1Change = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = (e.target.files && Array.from(e.target.files)) || [];

		if (files.length > 0) {
			try {
				const data = await readExcelFile2(files);
				const dataSplitted = splitTestCode(data);
				console.log("data1", dataSplitted);
				const oldFlag1 = flag.data1;
				setFlag({ ...flag, data1: !oldFlag1 });
				setData1(dataSplitted);
			} catch (error) {
				alert("An error occurred, please try again");
			}
		}
	};

	const input2Change = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = (e.target.files && Array.from(e.target.files)) || [];

		if (files.length > 0) {
			try {
				const data = await readExcelFile2(files);
				const dataSplitted = splitTestCode(data);
				console.log("data2", dataSplitted);
				const oldFlag2 = flag.data2;
				setFlag({ ...flag, data2: !oldFlag2 });
				setData2(dataSplitted);
			} catch (error) {
				alert("An error occurred, please try again");
			}
		}
	};

	const handleOnInputChange = async (files: File[]) => {
		// const files = (e.target.files && Array.from(e.target.files)) || [];
		setLoading(true);
		const data = await readExcelFile2(files);
		getGroupComponent(data);
		setLoading(false);
	};

	return (
		<div className="app-container">
			{/* <input
				type="file"
				accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
				onChange={inputChange}
			/> */}
			{loading && <LoadingOverlay />}
			<UploadFile onChange={handleOnInputChange} />

			{/* <div>
				Input 1
				<input
					type="file"
					accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
					onChange={input1Change}
				/>
			</div>
			<div>
				Input 2
				<input
					type="file"
					accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
					onChange={input2Change}
				/>
			</div> */}
		</div>
	);
}

export default App;
