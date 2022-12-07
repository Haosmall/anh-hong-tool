import data_file from "../assets/raw_data.json";
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
	// expandGroup(lv2);
};

const expandGroup = (glv2: GroupTestCodeData[]) => {
	const result: DataObject[] = [];

	glv2.map((ele) => {
		ele.TEST_CODE.map((tcEle, index) => {
			result.push({ GROUP_CODE: ele.GROUP_CODE, TEST_CODE: tcEle });
			// if (index === 0) {
			// 	result.push({ GROUP_CODE: ele.GROUP_CODE, TEST_CODE: tcEle });
			// } else {
			// 	result.push({ GROUP_CODE: "", TEST_CODE: tcEle });
			// }
		});
	});
	console.log({ result });
	exportExcelFile(result);
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
		const temp = ele;
		if (listGroupNotInTestCodeObj.includes(ele)) {
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
					const str = oldData.TEST_CODE_STRING.replace(
						inTestCodeEle.GROUP_CODE,
						`[${inTestCodeEle.GROUP_CODE}: ${inTestCodeEle.TEST_CODE.join(
							", "
						)}]`
					);
					// temp2.GROUP_CODE = [...oldData.GROUP_CODE, ...inGroupEle.GROUP_CODE];
					temp2.TEST_CODE_STRING = str;
				}
			});
			groupCodeLv2.push(temp);
			test2.push(temp2);
		} else {
			groupCodeLv2.push(temp);
			test2.push({
				GROUP_CODE: ele.GROUP_CODE,
				TEST_CODE_STRING: ele.TEST_CODE.join(","),
			});
		}
	});

	// console.log(
	// 	listCodeNotInGroupObj.find((ele) => ele.TEST_CODE === "643-6-CN")
	// );
	console.log({ test2 });
	console.log({ groupTestCodeLv1 });
	// exportExcelFile(test2);
	const test3 = groupCodeLv2.map((ele) => ({
		GROUP_CODE: ele.GROUP_CODE,
		TEST_CODE_STRING: ele.TEST_CODE.join(','),
	}));
 exportExcelFile(test3);
	console.log({ groupCodeLv2 });

	return groupCodeLv2;
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
