import { Select } from "antd";
import { useContext, useEffect, useState } from "react";
import "./App.css";
import CompareFile from "./components/CompareFile";
import GroupCode from "./components/GroupCode";
import GroupComponent from "./components/GroupComponent";
import LoadingOverlay from "./components/LoadingOverlay";
import { AppContext } from "./contexts/AppContextProvider";
import constants from "./helper/constants";

function App() {
	useEffect(() => {
		// groupTestCode();
		// getGroupCodeOfTestCodeNo();
		document.title = "Anh Hong";
	}, []);

	const { loading } = useContext(AppContext);
	const [selectedOption, setSelectedOption] = useState(
		constants.OptionValues.GROUP_COMPONENT
	);

	const handleChangeSelected = (value: any) => {
		setSelectedOption(value);
		console.log(value);
	};

	return (
		<div className="app-container">
			{loading && <LoadingOverlay />}

			<div>
				<Select
					size="large"
					defaultValue={selectedOption}
					onChange={handleChangeSelected}
					style={{ width: "100%", marginBottom: "3rem" }}
					options={constants.options}
				/>
				{selectedOption === constants.OptionValues.GROUP_CODE && <GroupCode />}
				{selectedOption === constants.OptionValues.GROUP_COMPONENT && (
					<GroupComponent />
				)}
				{selectedOption === constants.OptionValues.COMPARE_2_FILES && (
					<CompareFile />
				)}
			</div>
		</div>
	);
}

export default App;
