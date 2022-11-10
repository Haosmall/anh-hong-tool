import data_file from "../assets/raw_data.json";
import { DataObject, GroupCodeData, GroupTestCodeData } from "../types";
import constants from "./constants";

export const groupTestCode = (): void => {
	const {
		rawData,
		listTestCode,
		listGroupCode,
		listUniqueTestCode,
		testCodeInGroup,
		testCodeNotInGroup,
	} = convertJsonToObj();

	// console.log({ rawData, listTestCode, listGroupCode, listUniqueTestCode });
	const groupCodeLv1: GroupCodeData[] = groupCodeLevel1(
		rawData,
		listUniqueTestCode
	);

	const groupCodeLv2: GroupCodeData[] = groupCodeLevel2(
		groupCodeLv1,
		testCodeInGroup,
		testCodeNotInGroup
	);

	// console.log(testCodeInGroup.length, testCodeNotInGroup.length);

	console.log({ groupCodeLv2 });

	const result: DataObject[] = groupCodeLv2.map((ele) => ({
		TEST_CODE: ele.TEST_CODE,
		GROUP_CODE: ele.GROUP_CODE.join(", "),
	}));

	console.log({ result });

	console.log({
		copy_lab: constants.copy_lab_code.length,
		raw: [...new Set([...listGroupCode, ...listTestCode])].length,
	});
	// writeJsonFile(result);

	// groupCodeLv1.map((ele) => {
	// 	if (ele.TEST_CODE === "643-6-CN") {
	// 		console.log(ele.GROUP_CODE);
	// 	}
	// });

	// rawData.map((ele) => {
	// 	if (ele.TEST_CODE === "10357-2") {
	// 		console.log(ele.GROUP_CODE);
	// 	}
	// });

	const testCodeOfGroupLv1 = getTestCodeOfGroup(rawData, [
		...new Set(listGroupCode),
	]);

	const lv2 = getGroupInGroup(
		testCodeOfGroupLv1,
		[...new Set(listGroupCode)],
		listTestCode
	);
};

const getGroupInGroup = (
	groupTestCodeLv1: GroupTestCodeData[],
	listUniqueGroupCode: string[],
	listTestCode: string[]
): GroupTestCodeData[] => {
	const groupCodeInTestCode: string[] = [];

	listUniqueGroupCode.map((tcEle) => {
		if (listTestCode.includes(tcEle)) {
			groupCodeInTestCode.push(tcEle);
		}
	});

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
	writeJsonFile(test2);

	return groupCodeLv2;
};

const getTestCodeOfGroup = (
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

const groupCodeLevel2 = (
	groupCodeLv1: GroupCodeData[],
	testCodeInGroup: string[],
	testCodeNotInGroup: string[]
): GroupCodeData[] => {
	const groupCodeLv2: GroupCodeData[] = [];

	const listCodeNotInGroupObj: GroupCodeData[] = [];
	const listCodeInGroupObj: GroupCodeData[] = [];

	groupCodeLv1.map((ele) => {
		if (testCodeInGroup.includes(ele.TEST_CODE)) {
			listCodeInGroupObj.push(ele);
		} else {
			listCodeNotInGroupObj.push(ele);
		}
	});

	// console.log({ listCodeNotInGroupObj, listCodeInGroupObj });

	const test: any[] = [];

	listCodeNotInGroupObj.map((notInGroupEle) => {
		const temp = notInGroupEle;
		const temp2 = {
			// ...notInGroupEle,
			TEST_CODE: notInGroupEle.TEST_CODE,
			GROUP_CODE_STRING: notInGroupEle.GROUP_CODE.join(", "),
		};

		listCodeInGroupObj.map((inGroupEle) => {
			if (notInGroupEle.GROUP_CODE.includes(inGroupEle.TEST_CODE)) {
				const oldGroupCode = temp.GROUP_CODE;
				temp.GROUP_CODE = [...oldGroupCode, ...inGroupEle.GROUP_CODE];
				//
				const oldData = { ...temp2 };
				const str = oldData.GROUP_CODE_STRING.replace(
					inGroupEle.TEST_CODE,
					`[${inGroupEle.TEST_CODE}: ${inGroupEle.GROUP_CODE.join(", ")}]`
				);
				// temp2.GROUP_CODE = [...oldData.GROUP_CODE, ...inGroupEle.GROUP_CODE];
				temp2.GROUP_CODE_STRING = str;
			}
		});
		groupCodeLv2.push(temp);
		test.push(temp2);
	});

	// console.log(
	// 	listCodeNotInGroupObj.find((ele) => ele.TEST_CODE === "643-6-CN")
	// );
	console.log({ test });
	// writeJsonFile(test);

	return groupCodeLv2;
};

const groupCodeLevel1 = (
	rawData: DataObject[],
	listUniqueTestCode: string[]
): GroupCodeData[] => {
	const groupCodeLv1: GroupCodeData[] = [];

	listUniqueTestCode.map((ele) => {
		let temp: string[] = [];
		rawData.map((rawEle) => {
			if (rawEle.TEST_CODE === ele) {
				temp.push(rawEle.GROUP_CODE);
			}
		});

		groupCodeLv1.push({ TEST_CODE: ele, GROUP_CODE: temp });
	});
	return groupCodeLv1;
};

const convertJsonToObj = () => {
	const rawData: DataObject[] = [];
	const listTestCode: string[] = [];
	const listGroupCode: string[] = [];
	data_file.map((ele) => {
		const testCode = ele.TEST_CODE.toString();
		const groupCode = ele.GROUP_CODE.toString();
		rawData.push({
			GROUP_CODE: groupCode,
			TEST_CODE: testCode,
		});
		listTestCode.push(testCode);
		listGroupCode.push(groupCode);
	});

	const listUniqueTestCode: string[] = [...new Set(listTestCode)];

	const testCodeNotInGroup: string[] = [];
	const testCodeInGroup: string[] = [];

	listUniqueTestCode.map((tcEle) => {
		if (listGroupCode.includes(tcEle)) {
			testCodeInGroup.push(tcEle);
		} else {
			testCodeNotInGroup.push(tcEle);
		}
	});

	return {
		rawData,
		listTestCode,
		listGroupCode,
		listUniqueTestCode,
		testCodeInGroup,
		testCodeNotInGroup,
	};
};

export const writeJsonFile = (data: any) => {
	const element = document.createElement("a");
	const textFile = new Blob([JSON.stringify(data)], {
		type: "application/json",
	});
	element.href = URL.createObjectURL(textFile);
	element.download = `result-${Date.now()}.json`;
	document.body.appendChild(element);
	element.click();
};
