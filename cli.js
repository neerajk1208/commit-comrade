#!/usr/bin/env node

const path = require('path');
const inquirer = require('inquirer');
const notifier = require('node-notifier');
const args = require('minimist')(process.argv.slice(2));
const { exec } = require('child_process');

const DEFAULT_NOTIFICATION_CONFIG = {
  title: 'Commit Comrade',
  subtitle: '',
  sound: true,
  wait: true,
  closeLabel: 'Close',
  actions: 'Okay!',
  message: 'Take a second, and make a commit!',
};

const DEFAULT_INTERVAL = 5000;

const CommitComrade = function () {
  this.config = DEFAULT_NOTIFICATION_CONFIG
  this.interval = DEFAULT_INTERVAL;
};

const Helper = new CommitComrade();
console.log('hello world: ', Helper.config);