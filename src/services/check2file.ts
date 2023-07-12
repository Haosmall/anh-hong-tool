import { exportExcelFile } from "../helper/readExcelFile";
import { DataObject, GroupTestCodeData } from "../types";

export const splitTestCode = (rawData: DataObject[]): GroupTestCodeData[] => {
	const result: GroupTestCodeData[] = [];

	rawData.map((ele) => {
		const splitted = ele.TEST_CODE.length > 0 ? ele.TEST_CODE.split(", ") : [];
		result.push({
			GROUP_CODE: ele.GROUP_CODE,
			TEST_CODE: splitted,
		});
	});
	return result;
};

export const compare2File = (
	checkComponent: GroupTestCodeData[],
	fileCheck: GroupTestCodeData[]
): void => {
	const groupCodeCheckComponents = checkComponent.map((ele) => ele.GROUP_CODE);
	const groupInCheck: GroupTestCodeData[] = [];
	const groupNotInCheck: any[] = [];

	fileCheck.map((ele) => {
		if (groupCodeCheckComponents.includes(ele.GROUP_CODE)) {
			groupInCheck.push(ele);
		} else {
			groupNotInCheck.push(ele.GROUP_CODE);
		}
	});

	console.log("groupInCheck", groupInCheck);
	console.log("groupNotInCheck", groupNotInCheck);

	const result: any[] = [];
	const result2: any[] = [];

	groupInCheck.forEach((ele) => {
		const find: GroupTestCodeData =
			checkComponent.find((e) => e.GROUP_CODE === ele.GROUP_CODE) ||
			({} as GroupTestCodeData);

		const testCodeCheckComponents = find.TEST_CODE;

		const tempInTC: string[] = [];
		const tempNotInTC: string[] = [];

		ele.TEST_CODE.forEach((ele2) => {
			if (testCodeCheckComponents.includes(ele2)) {
				tempInTC.push(ele2);
			} else {
				tempNotInTC.push(ele2);
			}
		});

		result2.push({
			GROUP_CODE: ele.GROUP_CODE,
			TEST_CODE_IN_COMPONENT: tempInTC,
			TEST_CODE_NOT_IN_COMPONENT: tempNotInTC,
		});

		if (tempNotInTC.length > 0) {
			result.push({
				GROUP_CODE: ele.GROUP_CODE,
				TEST_CODE_IN_COMPONENT: tempInTC.join(", "),
				TEST_CODE_NOT_IN_COMPONENT: tempNotInTC.join(", "),
			});
		}
	});

	console.log("Result2", result2);
	console.log("Result", result);
	exportExcelFile(result);
};
