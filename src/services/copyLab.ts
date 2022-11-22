import { writeJsonFile } from "./groupcode";
import { DataObject, GroupCodeData, GroupComponent } from "../types";
// import constants from "./constants";

export const getGroupCodeOfTestCodeNo = (
	groupno: string[],
	groupOnly: GroupComponent[]
): DataObject[] => {
	const result: GroupCodeData[] = [];
	const test: DataObject[] = [];

	groupno.map((testCodeEle) => {
		const listGroup: string[] = [];
		const temp: GroupCodeData = {
			TEST_CODE: testCodeEle,
			GROUP_CODE: listGroup,
		};

		const temp2: DataObject = {
			TEST_CODE: testCodeEle,
			GROUP_CODE: "",
		};
		groupOnly.map((groupEle) => {
			if (groupEle.GROUP_COMPONENT.includes(testCodeEle)) {
				listGroup.push(groupEle.CODE);
			}
		});

		temp.GROUP_CODE = listGroup;
		result.push(temp);
 
		temp2.GROUP_CODE = listGroup.join(", ");
		test.push(temp2);
	});

	// console.log({ result, test });
	// console.log(test.length, constants.groupno.length);

	// writeJsonFile(test);
	return test;
};
