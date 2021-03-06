/*==================
[NodeJS] GitHub Manager - Label - Edit
	Language:
		NodeJS/14.15.0
==================*/
const /* advancedDetermine = require("@hugoalh/advanced-determine"), */
	chalk = require("chalk");
async function labelEditNetwork(repositoryOwner, repositoryName, name, color, description) {
	const passport = require("../../passport/rest.js")(),
		Octokit = require("@octokit/rest").Octokit;
	const octokit = new Octokit(passport);
	let data = await octokit.issues.updateLabel({
		color: color,
		description: description,
		name: name,
		owner: repositoryOwner,
		repo: repositoryName
	}).catch((error) => {
		console.error(`${chalk.bgRed.white.bold("G.O.E.")} ${error} ([NodeJS] GitHub Manager)`);
		process.exit(0);
	});
	if (data.status !== 200) {
		console.warn(`${chalk.bgYellow.black.bold("WARN")} Receive status code ${data.status}! May cause error in the beyond. ([NodeJS] GitHub Manager)`);
	};
};
function labelEdit(repository, name, color, description = "") {
	/*
	if (advancedDetermine.isString(repository) !== true) {
		console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "repository" must be type of string (non-nullable)! ([NodeJS] GitHub Manager)`);
		process.exit(0);
	};
	if (advancedDetermine.isString(name) !== true) {
		console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "name" must be type of string (non-nullable)! ([NodeJS] GitHub Manager)`);
		process.exit(0);
	};
	if (advancedDetermine.isString(color) !== true) {
		console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "color" must be type of string (non-nullable)! ([NodeJS] GitHub Manager)`);
		process.exit(0);
	};
	if (color.search(/^[\da-f][\da-f][\da-f][\da-f][\da-f][\da-f]$/giu) !== 0) {
		console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "color" is not match the require pattern! ([NodeJS] GitHub Manager)`);
		process.exit(0);
	};
	switch (repository.toLowerCase()) {
		case "default":
		case "def":
			console.error(`${chalk.bgRed.white.bold("ERROR")} Cannot modify default label! ([NodeJS] GitHub Manager)`);
			break;
		case "localstorage":
		case "local":
		case "ls":
		case "storage":
			labelEditLocal(name, color, description);
			break;
		default:
			if (repository.search(/\(org(anization)?\)[\w\d\-._]+/giu) === 0) {
				console.error(`${chalk.bgRed.white.bold("ERROR")} Label is not support organization! ([NodeJS] GitHub Manager)`);
				break;
			};
			if (repository.search(/^[\w\d\-._]+\/[\w\d\-._]+$/giu) === 0) {
	*/
				let [repositoryOwner, repositoryName] = repository.split("/");
				return labelEditNetwork(repositoryOwner, repositoryName, name, color.toLowerCase(), description);
	/*
			};
			console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "repository"'s value is not match the require pattern! ([NodeJS] GitHub Manager)`);
			break;
	};
	*/
};
module.exports = labelEdit;
