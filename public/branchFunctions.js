import { branchData, branchNodeInfo } from "./branchInfo.js";

export function createBranch(branchSvgElement, branchSize) {
	const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
	path.setAttribute("stroke", "black");
	path.setAttribute("fill", "transparent");

	const canvasWidth = parseInt(branchSvgElement.getAttribute("width"));
	let d = "";
	let circlePosition = { x: 0, y: 0 };

	for (let i = 0; i < branchSize; i++) {
		d += `M ${canvasWidth / 2} ${i * branchData.mainBranchLength} L ${
			canvasWidth / 2
		} ${(i + 1) * branchData.mainBranchLength}`;
		if (i % 2 == 0) {
			d += `H ${canvasWidth / 2 - branchData.nodeBranchLength}`;

			circlePosition.x =
				canvasWidth / 2 -
				(branchData.nodeBranchLength + branchData.nodeCircleRadius);
			circlePosition.y = branchData.mainBranchLength * (i + 1);

			drawNode(
				branchSvgElement,
				circlePosition.x,
				circlePosition.y,
				branchNodeInfo[i]
			);
		} else {
			d += `H ${canvasWidth / 2 + branchData.nodeBranchLength}`;

			circlePosition.x =
				canvasWidth / 2 +
				(branchData.nodeBranchLength + branchData.nodeCircleRadius);
			circlePosition.y = branchData.mainBranchLength * (i + 1);

			drawNode(
				branchSvgElement,
				circlePosition.x,
				circlePosition.y,
				branchNodeInfo[i]
			);
		}
		drawSubNodePath(branchSvgElement, circlePosition.x, circlePosition.y, i);
	}
	d += `M ${canvasWidth / 2} ${branchSize * branchData.mainBranchLength} L ${
		canvasWidth / 2
	} ${(branchSize + 1) * branchData.mainBranchLength}`;
	path.setAttribute("d", d);
	branchSvgElement.append(path);
}

function drawSubNodePath(branchSvgElement, x, y, nodeIndex) {
	if (branchNodeInfo[nodeIndex].subNodes.length == 0) return;
	const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
	path.setAttribute("stroke", "black");
	path.setAttribute("fill", "transparent");

	let d = "";
	const subNodeLength = branchNodeInfo[nodeIndex].subNodes.length;
	if (nodeIndex % 2 == 0) {
		for (let i = 0; i < subNodeLength; i++) {
			const newXPosition =
				x - (branchData.subNodeBranchLength * i + branchData.nodeBranchLength);
			d += `M ${newXPosition} ${y} L ${
				newXPosition - branchData.subNodeBranchLength
			} ${y}`;

			if (i % 2 == 0) {
				const subNodePosition = {
					x: newXPosition - branchData.subNodeBranchLength,
					y: y - branchData.nodeBranchLength,
				};
				d += `L ${subNodePosition.x} ${subNodePosition.y}M ${
					newXPosition - branchData.subNodeBranchLength
				} ${y}`;

				drawNode(
					branchSvgElement,
					subNodePosition.x,
					subNodePosition.y - branchData.nodeCircleRadius,
					branchNodeInfo[nodeIndex].subNodes[i]
				);
			} else {
				const subNodePosition = {
					x: newXPosition - branchData.subNodeBranchLength,
					y: y + branchData.nodeBranchLength,
				};
				d += `L ${subNodePosition.x} ${subNodePosition.y}M ${
					newXPosition - branchData.subNodeBranchLength
				} ${y}`;

				drawNode(
					branchSvgElement,
					subNodePosition.x,
					subNodePosition.y + branchData.nodeCircleRadius,
					branchNodeInfo[nodeIndex].subNodes[i]
				);
			}
		}
		d += `L ${
			x -
			(branchData.nodeBranchLength +
				branchData.subNodeBranchLength * (subNodeLength + 1))
		} ${y}`;
	} else {
		for (let i = 0; i < subNodeLength; i++) {
			const newXPosition =
				x + branchData.subNodeBranchLength * i + branchData.nodeBranchLength;

			d += `M ${newXPosition} ${y} L ${
				newXPosition + branchData.subNodeBranchLength
			} ${y}`;
			if (i % 2 == 0) {
				const subNodePosition = {
					x: newXPosition + branchData.subNodeBranchLength,
					y: y - branchData.nodeBranchLength,
				};
				d += `L ${subNodePosition.x} ${subNodePosition.y} M ${
					newXPosition + branchData.subNodeBranchLength
				} ${y}`;
				drawNode(
					branchSvgElement,
					subNodePosition.x,
					subNodePosition.y - branchData.nodeCircleRadius,
					branchNodeInfo[nodeIndex].subNodes[i]
				);
			} else {
				const subNodePosition = {
					x: newXPosition + branchData.subNodeBranchLength,
					y: y + branchData.nodeBranchLength,
				};
				d += `L ${subNodePosition.x} ${subNodePosition.y} M ${
					newXPosition + branchData.subNodeBranchLength
				} ${y}`;
				drawNode(
					branchSvgElement,
					subNodePosition.x,
					subNodePosition.y + branchData.nodeCircleRadius,
					branchNodeInfo[nodeIndex].subNodes[i]
				);
			}
		}
		d += ` L ${
			x +
			branchData.nodeBranchLength +
			branchData.subNodeBranchLength * (subNodeLength + 1)
		} ${y}`;
	}
	path.setAttribute("d", d);
	branchSvgElement.append(path);
}

function drawNode(branch, x, y, data) {
	const circle = document.createElementNS(
		"http://www.w3.org/2000/svg",
		"circle"
	);
	circle.setAttribute("cx", x);
	circle.setAttribute("cy", y);
	circle.setAttribute("r", branchData.nodeCircleRadius);
	circle.setAttribute("stroke", "black");
	circle.setAttribute("fill", "transparent");

	const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
	text.setAttribute("x", x);
	text.setAttribute("y", y);

	const textNode = document.createTextNode(data.content);
	text.appendChild(textNode);

	const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
	g.setAttribute("id", data.id);
	g.append(circle);
	g.append(text);

	branch.append(g);
}
