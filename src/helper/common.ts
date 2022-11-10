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
