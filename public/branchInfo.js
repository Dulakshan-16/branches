export const branchNodeInfo = [
	{
		id: "node1",
		content: "test1",
		subNodes: [
			{
				id: "subnode1",
				content: "sub-node-test1",
			},
			{
				id: "subnode2",
				content: "sub-node-test2",
			},
			{
				id: "subnode3",
				content: "sub-node-test3",
			},
		],
	},
	{
		id: "node2",
		content: "test2",
		subNodes: [
			{
				id: "subnode1",
				content: "sub-node-test1",
			},
			{
				id: "subnode2",
				content: "sub-node-test2",
			},
		],
	},
	{
		id: "node3",
		content: "test3",
		subNodes: [
			{
				id: "subnode1",
				content: "sub-node-test1",
			},
		],
	},
	{
		id: "node4",
		content: "test4",
		subNodes: [
			{
				id: "subnode1",
				content: "sub-node-test1",
			},
			{
				id: "subnode2",
				content: "sub-node-test2",
			},
			{
				id: "subnode3",
				content: "sub-node-test3",
			},
			{
				id: "subnode4",
				content: "sub-node-test4",
			},
		],
	},
	{
		id: "node5",
		content: "test5",
		subNodes: [],
	},
];

export const branchData = {
	nodeBranchLength: 50,
	nodeCircleRadius: 50,
	mainBranchLength: 160,
	subNodeBranchLength: 100,
	noNodes: branchNodeInfo.length,
};
branchData.dimensions = getDimensions(branchData.noNodes);

function getDimensions(len) {
	let width =
		Math.ceil(len / 2) *
		(branchData.nodeBranchLength +
			branchData.nodeCircleRadius +
			getMaxSubNodes() * branchData.mainBranchLength) *
		2;
	let height = (len + 1) * branchData.mainBranchLength;
	return { width, height };
}

function getMaxSubNodes() {
	let max = 0;
	for (let i = 0; i < branchData.noNodes; i++) {
		if (max < branchNodeInfo[i].subNodes.length) {
			max = branchNodeInfo[i].subNodes.length;
		}
	}
	return max;
}
