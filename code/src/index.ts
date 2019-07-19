// @ts-ignore
import latestVersion = require('latest-version');
import boxen from 'boxen';
import * as semver from 'semver';
import chalk from 'chalk';

export async function latest(name: string) {
  return latestVersion(name);
}

export async function isUpdated(name: string, version: string) {
  const lversion = await latest(name);
  return semver.eq(lversion, version);
}

export async function notify(name: string, version: string, message: string = 'Update available for package') {
  try {
    const lversion = await latest(name);
    const update = semver.gt(lversion, version);
    if (update) {
      const diff = semver.diff(lversion, version);
      const msg = `${message} ${chalk.underline.cyan.bold(name)} ${chalk.dim(version)}${chalk.reset(' → ')}${chalk.green(lversion)} ${chalk.gray(
        `(${diff})`
      )}`;

      const box = boxen(msg, {
        padding: 1,
        margin: 1,
        align: 'center',
        borderColor: 'yellow',
        borderStyle: boxen.BorderStyle.Round
      });
      console.log(box);
    }
  } catch (e) {
    console.error('Error in check for update', e.message);
  }
}
