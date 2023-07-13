import { message } from "antd";
import React, {
	PropsWithChildren,
	useContext,
	useEffect,
	useState,
} from "react";
import { AppContext } from "../../contexts/AppContextProvider";
import constants from "../../helper/constants";
import { readExcelFile2 } from "../../helper/readExcelFile";
import { compare2File, splitTestCode } from "../../services/check2file";
import { GroupTestCodeData } from "../../types";
import "./style.scss";

interface Props extends PropsWithChildren<any> {}

const defaultProps: Props = {};

const CompareFile: React.FC<Props> = (props) => {
	const { setLoading } = useContext(AppContext);
	const [flag, setFlag] = useState({ data1: false, data2: false });
	const [data1, setData1] = useState<GroupTestCodeData[]>([]);
	const [data2, setData2] = useState<GroupTestCodeData[]>([]);
	const [messageApi] = message.useMessage();

	useEffect(() => {
		if (flag.data1 && flag.data2) {
			console.log("change", flag);
			console.log(data1);

			try {
				compare2File(data1, data2);
			} catch (error) {
				handleError();
			} finally {
				setFlag({ data1: false, data2: false });
			}
		}
	}, [flag]);

	const handleError = () => {
		messageApi.open({
			type: constants.MessageTypes.ERROR,
			content: constants.ErrorMessages.UNDEFINED,
		});
	};

	const input1Change = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = (e.target.files && Array.from(e.target.files)) || [];

		if (files.length > 0) {
			try {
				setLoading(true);
				const data = await readExcelFile2(files);
				const dataSplitted = splitTestCode(data);
				console.log("data1", dataSplitted);
				const oldFlag1 = flag.data1;
				setFlag({ ...flag, data1: !oldFlag1 });
				setData1(dataSplitted);
			} catch (error) {
				handleError();
			} finally {
				setLoading(false);
			}
		}
	};

	const input2Change = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = (e.target.files && Array.from(e.target.files)) || [];

		if (files.length > 0) {
			try {
				setLoading(true);
				const data = await readExcelFile2(files);
				const dataSplitted = splitTestCode(data);
				console.log("data2", dataSplitted);
				const oldFlag2 = flag.data2;
				setFlag({ ...flag, data2: !oldFlag2 });
				setData2(dataSplitted);
			} catch (error) {
				handleError();
			} finally {
				setLoading(false);
			}
		}
	};

	return (
		<div className="compare-2-files-container">
			<input
				type="file"
				accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
				multiple={false}
				onChange={input1Change}
				style={{ marginBlock: "1rem" }}
			/>
			<input
				type="file"
				accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
				multiple={false}
				onChange={input2Change}
				style={{ marginBlock: "1rem" }}
			/>
		</div>
	);
};

CompareFile.defaultProps = defaultProps;

export default CompareFile;
