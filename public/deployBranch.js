import { createBranch } from "./branchFunctions.js";
import { branchData } from "./branchInfo.js";

const branch = document.createElementNS("http://www.w3.org/2000/svg", "svg");
const branchSize = branchData.noNodes;
branch.setAttribute("width", branchData.dimensions.width);
branch.setAttribute("height", branchData.dimensions.height);

createBranch(branch, branchSize);

document.getElementById("svg-container").append(branch);
