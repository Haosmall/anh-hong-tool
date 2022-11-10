import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import readXlsxFile, { readSheetNames } from "read-excel-file";
import { DataObject, ExcelObject, GroupComponent } from "../types";

export const readExcelFile = async (files: File[]): Promise<ExcelObject> => {
	const sheets = await readSheetNames(files[0]);
	const data: ExcelObject = {} as ExcelObject;

	for (const [index, sheetName] of sheets.entries()) {
		const rows = await readXlsxFile(files[0], { sheet: sheetName });

		switch (index) {
			case 0:
				const testCodes: string[] = [];
				rows.map((ele, index) => {
					if (index > 0) {
						const TEST_CODE = (ele[0] || "").toString();
						testCodes.push(TEST_CODE);
					}
				});
				data.groupno = testCodes;
				break;

			case 1:
				const groupCodes: GroupComponent[] = [];
				rows.map((ele, index) => {
					if (index > 0) {
						const CODE = (ele[0] || "").toString();
						const GROUP_COMPONENT = (ele[1] || "").toString();
						const obj: GroupComponent = { CODE, GROUP_COMPONENT };
						groupCodes.push(obj);
					}
				});
				data.groupOnly = groupCodes;
				break;
		}
	}
	return Promise.resolve(data);
};

export const exportExcelFile = (csvData: DataObject[]) => {
	const fileType =
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

	const ws = XLSX.utils.json_to_sheet(csvData);
	const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
	const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
	const data = new Blob([excelBuffer], { type: fileType });
	FileSaver.saveAs(data, `result-${Date.now()}.xlsx`);
};
