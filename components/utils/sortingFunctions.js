export const byId = (a, b) => {
	return b?.id - a?.id;
};

export const byIdReverse = (a, b) => {
	return a?.id - b?.id;
};

export const byDate = (a, b) => {
	return a.id > b.id;
};

export const byStatus = (a, b) => {
	return a.id > b.id;
};

export const byName = (a, b) => {
	return a.id > b.id;
};

const functionList = {
	byId,
	byIdReverse
};

export const getSortingFunction = (name) => {
	let sortingFunction = functionList[name];
	return sortingFunction;
};