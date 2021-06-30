#!/usr/bin/env node
const commandLineParser = require("@hugoalh/command-line-parser"),
	header = require("../lib/internal/header.js"),
	internalConsole = require("../lib/internal/console.js"),
	internalFlag = require("../lib/internal/flag.js"),
	languageService = require("../lib/language/main.js"),
	sessionCode = require("../lib/internal/session-code.js");
let commandLine = commandLineParser(process.argv.slice(2));
if (commandLine.flag.includes("silent") === false) {
	console.log(header);
};
if (commandLine.fault.length > 0) {
	commandLine.fault.forEach((element) => {
		internalConsole.warning(`${languageService.warningUnknownInput_1}${element}${languageService.warningUnknownInput_2}`);
	});
};
commandLine.flag.push(`command_${sessionCode}`);
if (commandLine.action.length === 0 && commandLine.fault.length === 0 && commandLine.flag.length === 1 && Object.keys(commandLine.option).length === 0) {
	commandLine.flag.push(`${internalFlag.wizard}`);
	require("../lib/wizard/main.js")(commandLine);
} else {
	require("../lib/direct/main.js")(commandLine);
};
