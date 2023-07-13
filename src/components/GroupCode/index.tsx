import React, { PropsWithChildren, useContext } from "react";
import { AppContext } from "../../contexts/AppContextProvider";
import { exportExcelFile, readExcelFile } from "../../helper/readExcelFile";
import { getGroupCodeOfTestCodeNo } from "../../services/copyLab";
import UploadFile from "../UploadFile";
import "./style.scss";
import { message } from "antd";
import constants from "../../helper/constants";

interface Props extends PropsWithChildren<any> {}

const defaultProps: Props = {};

const GroupCode: React.FC<Props> = (props) => {
	const { setLoading } = useContext(AppContext);
	const [messageApi] = message.useMessage();

	const handleFindGroupCode = async (files: File[]) => {
		try {
			setLoading(true);
			const data = await readExcelFile(files);
			const result = getGroupCodeOfTestCodeNo(data.groupno, data.groupOnly);
			exportExcelFile(result);
		} catch (error) {
			messageApi.open({
				type: constants.MessageTypes.ERROR,
				content: constants.ErrorMessages.UNDEFINED,
			});
		} finally {
			setLoading(false);
		}
	};
	return <UploadFile onChange={handleFindGroupCode} />;
};

GroupCode.defaultProps = defaultProps;

export default GroupCode;
