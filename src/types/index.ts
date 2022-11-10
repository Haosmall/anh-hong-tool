export interface DataObject {
	GROUP_CODE: string;
	TEST_CODE: string;
}

export interface GroupCodeData {
	TEST_CODE: string;
	GROUP_CODE: string[];
}

export interface GroupTestCodeData {
	GROUP_CODE: string;
	TEST_CODE: string[];
}

export interface GroupComponent {
	CODE: string;
	GROUP_COMPONENT: string;
}

export interface ExcelObject {
	groupno: string[];
	groupOnly: GroupComponent[];
}
