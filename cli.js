const path = require('path');
const inquirer = require('inquirer');
const notifier = require('node-notifier');
const term = require('terminal-kit').terminal;
const args = require('minimist')(process.argv.slice(2));
const { exec } = require('child_process');