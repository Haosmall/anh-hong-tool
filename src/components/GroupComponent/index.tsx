import React, { PropsWithChildren, useContext } from "react";
import "./style.scss";
import UploadFile from "../UploadFile";
import { readExcelFile2 } from "../../helper/readExcelFile";
import { getGroupComponent } from "../../services/groupComponent";
import { AppContext } from "../../contexts/AppContextProvider";
import { message } from "antd";
import constants from "../../helper/constants";

interface Props extends PropsWithChildren<any> {}

const defaultProps: Props = {};

const GroupComponent: React.FC<Props> = (props) => {
	const { setLoading } = useContext(AppContext);
	const [messageApi] = message.useMessage();

	const handleFindGroupComponent = async (files: File[]) => {
		try {
			setLoading(true);
			const data = await readExcelFile2(files);
			getGroupComponent(data);
		} catch (error) {
			messageApi.open({
				type: constants.MessageTypes.ERROR,
				content: constants.ErrorMessages.UNDEFINED,
			});
		} finally {
			setLoading(false);
		}
	};
	return <UploadFile onChange={handleFindGroupComponent} />;
};

GroupComponent.defaultProps = defaultProps;

export default GroupComponent;
