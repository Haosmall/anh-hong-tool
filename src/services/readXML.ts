import readXlsxFile from "read-excel-file";
import { exportExcelFile } from "../helper/readExcelFile";

interface ExcelXMLObject {
	TCODE: string;
	REFERENCE_RANGE: string;
}

interface ExcelXMLObjectResult {
	TCODE: string;
	REFERENCE_RANGE_STRING: string | (string | null)[];
}
export const readXML = async (files: File[]) => {
	const raw = await readExcelFile(files);
	const result: ExcelXMLObjectResult[] = [];
	raw.map((ele) => {
		const temp: ExcelXMLObjectResult = {
			TCODE: ele.TCODE,
			REFERENCE_RANGE_STRING: ele.REFERENCE_RANGE,
		};
		if (ele.REFERENCE_RANGE) {
			console.log(ele.TCODE);

			const xmlDocument = getXMLDocument(ele.REFERENCE_RANGE);
			const txt = getElementsFromDocument(xmlDocument, "txt");
			const eql = getElementsFromDocument(xmlDocument, "eql");
			const lsq = getElementsFromDocument(xmlDocument, "lsq");
			const btw = getElementsFromDocument(xmlDocument, "btw");
			const lst = getElementsFromDocument(xmlDocument, "lst");
			const grq = getElementsFromDocument(xmlDocument, "grq");
			const grt = getElementsFromDocument(xmlDocument, "grt");
			const ref = getElementsFromDocument(xmlDocument, "ref");

			const arr = [txt, eql, lsq, btw, lst, grq, grt, ref];

			arr.map((arrEle) => {
				if (arrEle.length > 0) {
					arrEle.map((e) => {
						result.push({ TCODE: ele.TCODE, REFERENCE_RANGE_STRING: e });
					});
				}
			});

			// temp.REFERENCE_RANGE_STRING = [
			// 	...txt,
			// 	...eql,
			// 	...lsq,
			// 	...btw,
			// 	...lst,
			// 	...grq,
			// 	...grt,
			// 	...ref,
			// ].join(", ");
		} else {
			result.push(temp);
		}
		// result.push(temp);
	});
	console.log("aa", result);
	// exportExcelFile(result);
	// const xmlDocument = getXMLDocument(xmlInput);
	// const txt = getElementsFromDocument(xmlDocument, "txt");
	// const eql = getElementsFromDocument(xmlDocument, "eqls");
	// const lsq = getElementsFromDocument(xmlDocument, "lsq");
	// const btw = getElementsFromDocument(xmlDocument, "btw");
	// const lst = getElementsFromDocument(xmlDocument, "lst");
	// const grq = getElementsFromDocument(xmlDocument, "grq");
	// const grt = getElementsFromDocument(xmlDocument, "grt");
	// const ref = getElementsFromDocument(xmlDocument, "ref");
	// console.log({ xmlDocument });
	// console.log({ txt, eql, lsq, btw, lst, grq, grt, ref });
	// console.log(
	// 	[...txt, ...eql, ...lsq, ...btw, ...lst, ...grq, ...grt, ...ref].join(", ")
	// );
};

const xmlInput = `<?xml version="1.0" encoding="utf-16"?><referenceranges><autoauthorizationrange><property type="age" value="Male" mode="Day(s)"><btw mode="lsq" gender="Male" agetype="Day(s)" data="" result="" device="" value="54">0                          -                          7</btw></property><property type="age" value="Male" mode="Day(s)"><btw mode="lsq" gender="Male" agetype="Day(s)" data="" result="" device="" value="32">7                          -                          15</btw></property><property type="age" value="Male" mode="Day(s)"><btw mode="lsq" gender="Male" agetype="Day(s)" data="" result="" device="" value="14">15                          -                          30</btw></property><property type="age" value="Male" mode="Month(s)"><btw mode="lsq" gender="Male" agetype="Month(s)" data="" result="" device="" value="14">1                          -                          12</btw></property><property type="age" value="Male" mode="Year(s)"><btw mode="lsq" gender="Male" agetype="Year(s)" data="" result="" device="" value="14">1                          -                          3</btw></property><property type="age" value="Male" mode="Year(s)"><btw mode="lsq" gender="Male" agetype="Year(s)" data="" result="" device="" value="21">3                          -                          6</btw></property><property type="age" value="Male" mode="Year(s)"><btw mode="lsq" gender="Male" agetype="Year(s)" data="" result="" device="" value="21">6                          -                          8</btw></property><property type="age" value="Male" mode="Year(s)"><btw mode="lsq" gender="Male" agetype="Year(s)" data="" result="" device="" value="20">8                          -                          10</btw></property><property type="age" value="Male" mode="Year(s)"><btw mode="lsq" gender="Male" agetype="Year(s)" data="" result="" device="" value="24">10                          -                          11</btw></property><property type="age" value="Male" mode="Year(s)"><btw mode="lsq" gender="Male" agetype="Year(s)" data="" result="" device="" value="29">11                          -                          12</btw></property><property type="age" value="Male" mode="Year(s)"><btw mode="lsq" gender="Male" agetype="Year(s)" data="" result="" device="" value="49">12                          -                          13</btw></property><property type="age" value="Male" mode="Year(s)"><btw mode="lsq" gender="Male" agetype="Year(s)" data="" result="" device="" value="48">13                          -                          14</btw></property><property type="age" value="Male" mode="Year(s)"><btw mode="lsq" gender="Male" agetype="Year(s)" data="" result="" device="" value="67">14                          -                          15</btw></property><property type="age" value="Male" mode="Year(s)"><btw mode="lsq" gender="Male" agetype="Year(s)" data="" result="" device="" value="36">15                          -                          16</btw></property><property type="age" value="Male" mode="Year(s)"><btw mode="lsq" gender="Male" agetype="Year(s)" data="" result="" device="" value="25">16                          -                          17</btw></property><property type="age" value="Male" mode="Year(s)"><btw mode="lsq" gender="Male" agetype="Year(s)" data="" result="" device="" value="32">17                          -                          19</btw></property><property type="age" value="Male" mode="Year(s)"><btw mode="btw" gender="Male" agetype="Year(s)" data="" result="" device="" value="11.3-43.2">19                          -                          200</btw></property><property type="age" value="Female" mode="Day(s)"><btw mode="lsq" gender="Female" agetype="Day(s)" data="" result="" device="" value="31">0                        -                        7</btw></property><property type="age" value="Female" mode="Day(s)"><btw mode="lsq" gender="Female" agetype="Day(s)" data="" result="" device="" value="36">7                        -                        15</btw></property><property type="age" value="Female" mode="Day(s)"><btw mode="lsq" gender="Female" agetype="Day(s)" data="" result="" device="" value="18">15                        -                        30</btw></property><property type="age" value="Female" mode="Month(s)"><btw mode="lsq" gender="Female" agetype="Month(s)" data="" result="" device="" value="18">1                        -                        12</btw></property><property type="age" value="Female" mode="Year(s)"><btw mode="lsq" gender="Female" agetype="Year(s)" data="" result="" device="" value="18">1                        -                        3</btw></property><property type="age" value="Female" mode="Year(s)"><btw mode="lsq" gender="Female" agetype="Year(s)" data="" result="" device="" value="22">3                        -                        6</btw></property><property type="age" value="Female" mode="Year(s)"><btw mode="lsq" gender="Female" agetype="Year(s)" data="" result="" device="" value="20">6                        -                        8</btw></property><property type="age" value="Female" mode="Year(s)"><btw mode="lsq" gender="Female" agetype="Year(s)" data="" result="" device="" value="36">8                        -                        10</btw></property><property type="age" value="Female" mode="Year(s)"><btw mode="lsq" gender="Female" agetype="Year(s)" data="" result="" device="" value="45">10                        -                        11</btw></property><property type="age" value="Female" mode="Year(s)"><btw mode="lsq" gender="Female" agetype="Year(s)" data="" result="" device="" value="44">11                        -                        12</btw></property><property type="age" value="Female" mode="Year(s)"><btw mode="lsq" gender="Female" agetype="Year(s)" data="" result="" device="" value="42">12                        -                        13</btw></property><property type="age" value="Female" mode="Year(s)"><btw mode="lsq" gender="Female" agetype="Year(s)" data="" result="" device="" value="136">13                        -                        14</btw></property><property type="age" value="Female" mode="Year(s)"><btw mode="lsq" gender="Female" agetype="Year(s)" data="" result="" device="" value="196">14                        -                        15</btw></property><property type="age" value="Female" mode="Year(s)"><btw mode="btw" gender="Female" agetype="Year(s)" data="" result="" device="" value="26-192">15                        -                        16</btw></property><property type="age" value="Female" mode="Year(s)"><btw mode="btw" gender="Female" agetype="Year(s)" data="" result="" device="" value="14-124">16                        -                        17</btw></property><property type="age" value="Female" mode="Year(s)"><btw mode="btw" gender="Female" agetype="Year(s)" data="" result="" device="" value="17-184">17                        -                        19</btw></property><property type="age" value="Female" mode="Year(s)"><btw mode="btw" gender="Female" agetype="Year(s)" data="" result="" device="" value="12.4-184">19                        -                        200</btw></property></autoauthorizationrange><referencerange><property type="age" value="Male" mode="Year(s)"><btw mode="btw" gender="Male" agetype="Year(s)" data="" result="" device="" value="11.3-43.2">19                   -                   200</btw></property><property type="age" value="Female" mode="Year(s)"><btw mode="ref" gender="Female" agetype="Year(s)" data="" result="" device="" value="Xem bên dưới (View Below)">19-200</btw></property><property type="age" value="Male" mode="Day(s)"><btw mode="lsq" gender="Male" agetype="Day(s)" data="" result="" device="" value="54">0            -            7</btw></property><property type="age" value="Male" mode="Day(s)"><btw mode="lsq" gender="Male" agetype="Day(s)" data="" result="" device="" value="32">7            -            15</btw></property><property type="age" value="Male" mode="Day(s)"><btw mode="lsq" gender="Male" agetype="Day(s)" data="" result="" device="" value="14">15            -            30</btw></property><property type="age" value="Male" mode="Month(s)"><btw mode="lsq" gender="Male" agetype="Month(s)" data="" result="" device="" value="14">1            -            12</btw></property><property type="age" value="Male" mode="Year(s)"><btw mode="lsq" gender="Male" agetype="Year(s)" data="" result="" device="" value="14">1            -            3</btw></property><property type="age" value="Male" mode="Year(s)"><btw mode="lsq" gender="Male" agetype="Year(s)" data="" result="" device="" value="21">3            -            6</btw></property><property type="age" value="Male" mode="Year(s)"><btw mode="lsq" gender="Male" agetype="Year(s)" data="" result="" device="" value="21">6            -            8</btw></property><property type="age" value="Male" mode="Year(s)"><btw mode="lsq" gender="Male" agetype="Year(s)" data="" result="" device="" value="20">8            -            10</btw></property><property type="age" value="Male" mode="Year(s)"><btw mode="lsq" gender="Male" agetype="Year(s)" data="" result="" device="" value="24">10            -            11</btw></property><property type="age" value="Male" mode="Year(s)"><btw mode="lsq" gender="Male" agetype="Year(s)" data="" result="" device="" value="29">11            -            12</btw></property><property type="age" value="Male" mode="Year(s)"><btw mode="lsq" gender="Male" agetype="Year(s)" data="" result="" device="" value="49">12            -            13</btw></property><property type="age" value="Male" mode="Year(s)"><btw mode="lsq" gender="Male" agetype="Year(s)" data="" result="" device="" value="48">13            -            14</btw></property><property type="age" value="Male" mode="Year(s)"><btw mode="lsq" gender="Male" agetype="Year(s)" data="" result="" device="" value="67">14            -            15</btw></property><property type="age" value="Male" mode="Year(s)"><btw mode="lsq" gender="Male" agetype="Year(s)" data="" result="" device="" value="36">15            -            16</btw></property><property type="age" value="Male" mode="Year(s)"><btw mode="lsq" gender="Male" agetype="Year(s)" data="" result="" device="" value="25">16            -            17</btw></property><property type="age" value="Male" mode="Year(s)"><btw mode="lsq" gender="Male" agetype="Year(s)" data="" result="" device="" value="32">17            -            19</btw></property><property type="age" value="Female" mode="Day(s)"><btw mode="lsq" gender="Female" agetype="Day(s)" data="" result="" device="" value="31">0          -          7</btw></property><property type="age" value="Female" mode="Day(s)"><btw mode="lsq" gender="Female" agetype="Day(s)" data="" result="" device="" value="36">7          -          15</btw></property><property type="age" value="Female" mode="Day(s)"><btw mode="lsq" gender="Female" agetype="Day(s)" data="" result="" device="" value="18">15          -          30</btw></property><property type="age" value="Female" mode="Month(s)"><btw mode="lsq" gender="Female" agetype="Month(s)" data="" result="" device="" value="18">1          -          12</btw></property><property type="age" value="Female" mode="Year(s)"><btw mode="lsq" gender="Female" agetype="Year(s)" data="" result="" device="" value="18">1          -          3</btw></property><property type="age" value="Female" mode="Year(s)"><btw mode="lsq" gender="Female" agetype="Year(s)" data="" result="" device="" value="22">3          -          6</btw></property><property type="age" value="Female" mode="Year(s)"><btw mode="lsq" gender="Female" agetype="Year(s)" data="" result="" device="" value="20">6          -          8</btw></property><property type="age" value="Female" mode="Year(s)"><btw mode="lsq" gender="Female" agetype="Year(s)" data="" result="" device="" value="36">8          -          10</btw></property><property type="age" value="Female" mode="Year(s)"><btw mode="lsq" gender="Female" agetype="Year(s)" data="" result="" device="" value="45">10          -          11</btw></property><property type="age" value="Female" mode="Year(s)"><btw mode="lsq" gender="Female" agetype="Year(s)" data="" result="" device="" value="44">11          -          12</btw></property><property type="age" value="Female" mode="Year(s)"><btw mode="lsq" gender="Female" agetype="Year(s)" data="" result="" device="" value="42">12          -          13</btw></property><property type="age" value="Female" mode="Year(s)"><btw mode="lsq" gender="Female" agetype="Year(s)" data="" result="" device="" value="136">13          -          14</btw></property><property type="age" value="Female" mode="Year(s)"><btw mode="lsq" gender="Female" agetype="Year(s)" data="" result="" device="" value="196">14          -          15</btw></property><property type="age" value="Female" mode="Year(s)"><btw mode="btw" gender="Female" agetype="Year(s)" data="" result="" device="" value="26-192">15          -          16</btw></property><property type="age" value="Female" mode="Year(s)"><btw mode="btw" gender="Female" agetype="Year(s)" data="" result="" device="" value="14-124">16          -          17</btw></property><property type="age" value="Female" mode="Year(s)"><btw mode="btw" gender="Female" agetype="Year(s)" data="" result="" device="" value="17-184">17          -          19</btw></property></referencerange></referenceranges>`;
// const xmlDocument = getXMLDocument(xmlInput);
// const txt = getElementsFromDocument(xmlDocument, "btw");

function getXMLDocument(xmlString: string): Document {
	const parser = new DOMParser();

	return parser.parseFromString(xmlString, "application/xml");
}

function getElementsFromDocument(xmlDocument: Document, selectors: string) {
	const titleElements: Element[] = Array.from(
		xmlDocument.querySelectorAll(selectors)
	);
	// console.log(titleElements);
	return titleElements.map((ele) => {
		const attributeText = [`tagName: ${ele.tagName}`];
		for (const e of ele.attributes) {
			attributeText.push(`${e.name}: ${e.textContent}`);
		}
		attributeText.push(`value_txt: ${ele.textContent}`);
		console.log({
			selectors,
			ele: ele.attributes,
			bb: ele,
			test_string: attributeText.join(", "),
		});
		// console.log({ lenght: ele.attributes.length, 0: ele.attributes.item(0) });
		// return ele.textContent;

		const temp = attributeText.join(", ");
		return temp;
	});
}

function createHTMLForTitles(titles: Element[]) {
	return titles.reduce((html, title) => {
		// Only add the title when it is not an empty string.
		if (title.textContent !== "") {
			html += `<li>${title.textContent}</li>`;
		}

		return html;
	}, "");
}

// const xmlDocument = getXMLDocument(xmlInput),
// 	titleArray = getTitleElementsFromDocument(xmlDocument),
// 	titlesHTML = createHTMLForTitles(titleArray),
// 	outputElement = document.getElementById("output");

export const readExcelFile = async (
	files: File[]
): Promise<ExcelXMLObject[]> => {
	const data: ExcelXMLObject[] = [];

	const rows = await readXlsxFile(files[0], { sheet: 1 });
	rows.map((ele, index) => {
		if (index > 1) {
			const TCODE = (ele[1] || "").toString();
			const REFERENCE_RANGE = (ele[33] || "").toString();
			const obj: ExcelXMLObject = { TCODE, REFERENCE_RANGE };
			data.push(obj);
		}
	});
	return Promise.resolve(data);
};
