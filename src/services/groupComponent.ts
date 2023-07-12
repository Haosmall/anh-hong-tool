import data_file from "../assets/raw_data.json";
import data_no_break from "../assets/data_no_break.json";
import data_break from "../assets/data_break.json";
import { DataObject, GroupCodeData, GroupTestCodeData } from "../types";
import constants from "../helper/constants";
import { exportExcelFile } from "../helper/readExcelFile";

export const getGroupComponent = (rawData: DataObject[]): void => {
	const listGroupCode: string[] = [];
	const listTestCode: string[] = [];

	rawData.map((ele) => {
		listGroupCode.push(ele.GROUP_CODE.toString());
		listTestCode.push(ele.TEST_CODE.toString());
	});

	const listUniqueGroupCode = [...new Set(listGroupCode)];

	const testCodeOfGroupLv1 = getTestCodeOfGroupLv1(
		rawData,
		listUniqueGroupCode
	);

	const groupCodeInTestCode: string[] = [];
	listUniqueGroupCode.map((ele) => {
		if (listTestCode.includes(ele)) {
			groupCodeInTestCode.push(ele);
		}
	});

	// const lv2 = getGroupInGroup(testCodeOfGroupLv1, groupCodeInTestCode);
	const lv2 = getGroupInGroupV2(testCodeOfGroupLv1, groupCodeInTestCode);
};

const getGroupInGroupV2 = (
	groupTestCodeLv1: GroupTestCodeData[],
	groupCodeInTestCode: string[]
): GroupTestCodeData[] => {
	const groupCodeLv2: GroupTestCodeData[] = [];

	const listGroupNotInTestCodeObj: GroupTestCodeData[] = [];
	const listGroupInTestCodeObj: GroupTestCodeData[] = [];

	groupTestCodeLv1.map((ele) => {
		if (groupCodeInTestCode.includes(ele.GROUP_CODE)) {
			listGroupInTestCodeObj.push(ele);
		} else {
			listGroupNotInTestCodeObj.push(ele);
		}
	});

	const test2: any[] = [];

	groupTestCodeLv1.map((ele) => {
		if (listGroupNotInTestCodeObj.includes(ele)) {
			const temp = ele;
			const temp2 = {
				// ...ele,
				GROUP_CODE: ele.GROUP_CODE,
				TEST_CODE_STRING: ele.TEST_CODE.join(", "),
			};

			listGroupInTestCodeObj.map((inTestCodeEle) => {
				if (ele.TEST_CODE.includes(inTestCodeEle.GROUP_CODE)) {
					const oldGroupCode = temp.TEST_CODE;
					temp.TEST_CODE = [...oldGroupCode, ...inTestCodeEle.TEST_CODE];
					//
					const oldData = { ...temp2 };
					// const str = oldData.TEST_CODE_STRING.replace(
					// 	inTestCodeEle.GROUP_CODE,
					// 	`[${inTestCodeEle.GROUP_CODE}: ${inTestCodeEle.TEST_CODE.join(
					// 		", "
					// 	)}]`
					// );
					// ======
					// const str = oldData.TEST_CODE_STRING.replace(
					// 	inTestCodeEle.GROUP_CODE,
					// 	`[${inTestCodeEle.GROUP_CODE} ${isBreak(
					// 		inTestCodeEle.GROUP_CODE
					// 	)}: ${inTestCodeEle.TEST_CODE.join(", ")}]`
					// );
					const str = oldData.TEST_CODE_STRING.replace(
						inTestCodeEle.GROUP_CODE,
						inTestCodeEle.TEST_CODE.join(", ")
					);
					// temp2.GROUP_CODE = [...oldData.GROUP_CODE, ...inGroupEle.GROUP_CODE];
					temp2.TEST_CODE_STRING = str;
				}
			});
			groupCodeLv2.push(temp);
			test2.push(temp2);
		} else {
			test2.push({
				GROUP_CODE: ele.GROUP_CODE,
				TEST_CODE_STRING: ele.TEST_CODE.join(", "),
			});
		}
	});

	// console.log(
	// 	listCodeNotInGroupObj.find((ele) => ele.TEST_CODE === "643-6-CN")
	// );
	console.log({ test2 });
	console.log({ groupTestCodeLv1 });
	exportExcelFile(test2);
	// writeJsonFile(test2);

	return groupCodeLv2;
};

const isBreak = (groupCode: string) => {
	if (data_break.includes(groupCode)) return "(break)";
	if (data_no_break.includes(groupCode)) return "(no_break)";
	console.log("aa", groupCode);
};

const getGroupInGroup = (
	groupTestCodeLv1: GroupTestCodeData[],
	groupCodeInTestCode: string[]
): GroupTestCodeData[] => {
	const groupCodeLv2: GroupTestCodeData[] = [];

	const listGroupNotInTestCodeObj: GroupTestCodeData[] = [];
	const listGroupInTestCodeObj: GroupTestCodeData[] = [];

	groupTestCodeLv1.map((ele) => {
		if (groupCodeInTestCode.includes(ele.GROUP_CODE)) {
			listGroupInTestCodeObj.push(ele);
		} else {
			listGroupNotInTestCodeObj.push(ele);
		}
	});

	const test2: any[] = [];

	listGroupNotInTestCodeObj.map((notInTestCodeEle) => {
		const temp = notInTestCodeEle;
		const temp2 = {
			// ...notInTestCodeEle,
			GROUP_CODE: notInTestCodeEle.GROUP_CODE,
			TEST_CODE_STRING: notInTestCodeEle.TEST_CODE.join(", "),
		};

		listGroupInTestCodeObj.map((inTestCodeEle) => {
			if (notInTestCodeEle.TEST_CODE.includes(inTestCodeEle.GROUP_CODE)) {
				const oldGroupCode = temp.TEST_CODE;
				temp.TEST_CODE = [...oldGroupCode, ...inTestCodeEle.TEST_CODE];
				//
				const oldData = { ...temp2 };
				const str = oldData.TEST_CODE_STRING.replace(
					inTestCodeEle.GROUP_CODE,
					`[${inTestCodeEle.GROUP_CODE}: ${inTestCodeEle.TEST_CODE.join(", ")}]`
				);
				// temp2.GROUP_CODE = [...oldData.GROUP_CODE, ...inGroupEle.GROUP_CODE];
				temp2.TEST_CODE_STRING = str;
			}
		});
		groupCodeLv2.push(temp);
		test2.push(temp2);
	});

	// console.log(
	// 	listCodeNotInGroupObj.find((ele) => ele.TEST_CODE === "643-6-CN")
	// );
	console.log({ test2 });
	exportExcelFile(test2);
	// writeJsonFile(test2);

	return groupCodeLv2;
};

const getTestCodeOfGroupLv1 = (
	rawData: DataObject[],
	listUniqueGroupCode: string[]
): GroupTestCodeData[] => {
	const groupCodeLv1: GroupTestCodeData[] = [];

	listUniqueGroupCode.map((ele) => {
		let temp: string[] = [];
		rawData.map((rawEle) => {
			if (rawEle.GROUP_CODE === ele) {
				temp.push(rawEle.TEST_CODE);
			}
		});

		groupCodeLv1.push({ GROUP_CODE: ele, TEST_CODE: temp });
	});
	return groupCodeLv1;
};
