import latestVersion from 'latest-version';
import boxen from 'boxen';
import * as semver from 'semver';
import chalk from 'chalk';

/**
 * Get the latest version of a package
 * @param {string} name Name of the package to get the latest version
 * @returns {Promise<string>} Promise with latest version as result
 */
export async function latest(name: string) {
  return latestVersion(name);
}

/**
 * Check if a package and version is the latest
 * @param {string} name Name of the package to check
 * @param {string} version Version to check if it is the latest
 * @returns {Promise<boolean>} Promise with boolean true if its the latest version or false otherwise
 */
export async function isUpdated(name: string, version: string) {
  const lversion = await latest(name);
  return semver.eq(lversion, version);
}

/**
 * Show a notification if there is a newest version for package
 * @param {string} name Name of the package to check
 * @param {string} version Version to check if it is the latest
 * @param {string} message (optional) Message to show in the notification
 * @returns {Promise<void>}
 */
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
