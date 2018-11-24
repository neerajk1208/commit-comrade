#!/usr/bin/env node

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
  message: 'Pause, and make a commit!',
};

const DEFAULT_INTERVAL = 300000; //  5 minutes in milliseconds

const CommitComrade = function () {
  this.config = DEFAULT_NOTIFICATION_CONFIG
  this.interval = DEFAULT_INTERVAL;
};

CommitComrade.prototype.getInterval = function () {
  return this.interval;
};

CommitComrade.prototype.updateInterval = function (intervalInSeconds) {
  const intervalInMilliseconds = intervalInSeconds * 1000;
  this.interval = intervalInMilliseconds;
  return;
};

CommitComrade.prototype.getConfig = function () {
  return this.config;
};

CommitComrade.prototype.updateConfigProperty = function (key, value) {
  if (this.config[key]) {
    this.config[key] = value;
  }
  return;
};

const Helper = new CommitComrade();

const initiateTracker = () => {
  const currentInterval = Helper.getInterval();
  const currentConfig = Helper.getConfig();
  setInterval(() => {
    notifier.notify(currentConfig, (error, response, metadata) => {
      if (response === 'activate') {
        exec('open -a terminal');
      }
    })
  }, currentInterval);
};

const init = () => {
  const questions = [
    {
      name: 'Interval',
      type: 'input',
      message: 'How often would you like to commit? Default interval is 5 minutes.',
      validate: function (minutes) {
        if (minutes.length) {
          const seconds = minutes * 60;
          Helper.updateInterval(seconds)
        }
        initiateTracker();
        return true;
      }
    }
  ];
  inquirer.prompt(questions)
}

init();