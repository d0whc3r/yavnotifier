import * as yav from '../src';
import semver from 'semver';

const testOptions = {
  pkg: 'ava',
  lower: '0.0.1',
  greater: '999.999.999',
  latest: '',
  unknown: 'klafkdsñfañasdfkfdskalsdfñ1111112222'
};
let output = '';
let outputError = '';
const storeLogError = (input: string) => {
  outputError += input;
  return input;
};
const storeLog = (input: string) => {
  output += input;
  return input;
};

// @ts-ignore
global.console = {
  log: jest.fn(storeLog),
  error: jest.fn(storeLogError)
};

it('basic', () => {
  expect(yav).toBeTruthy();
  expect(yav.latest).toBeTruthy();
  expect(yav.isUpdated).toBeTruthy();
  expect(yav.notify).toBeTruthy();
});
it('latest version', async () => {
  testOptions.latest = await yav.latest(testOptions.pkg);
  expect(testOptions.latest).toBeTruthy();
  expect(semver.gt(testOptions.latest, testOptions.lower));
});

describe('isUpdated function', () => {
  it('isUpdated with lower version', async () => {
    const updated = await yav.isUpdated(testOptions.pkg, testOptions.lower);
    expect(updated).toBe(false);
  });
  it('isUpdated with greater version', async () => {
    const updated = await yav.isUpdated(testOptions.pkg, testOptions.greater);
    expect(updated).toBe(false);
  });
  it('isUpdated with exact version', async () => {
    const updated = await yav.isUpdated(testOptions.pkg, testOptions.latest);
    expect(updated).toBe(true);
  });
});

describe('notify function', () => {
  beforeEach(() => {
    output = '';
    outputError = '';
    // @ts-ignore
    global.console.log.mockClear();
    // @ts-ignore
    global.console.error.mockClear();
  });
  it('notify with lower version', async () => {
    await yav.notify(testOptions.pkg, testOptions.lower);
    expect(global.console.log).toHaveBeenCalledTimes(1);
    expect(output).toContain('Update available for package');
  });
  it('notify with lower version and custom message', async () => {
    const message = 'Update now!';
    await yav.notify(testOptions.pkg, testOptions.lower, message);
    expect(global.console.log).toHaveBeenCalledTimes(1);
    expect(output).toContain(message);
  });
  it('notify with greater version', async () => {
    await yav.notify(testOptions.pkg, testOptions.greater);
    expect(global.console.log).toHaveBeenCalledTimes(0);
    expect(output).toBe('');
  });
  it('notify with exact version', async () => {
    await yav.notify(testOptions.pkg, testOptions.latest);
    expect(global.console.log).toHaveBeenCalledTimes(0);
    expect(output).toBe('');
  });
});

describe('unknown package', () => {
  beforeEach(() => {
    output = '';
    outputError = '';
    // @ts-ignore
    global.console.log.mockClear();
    // @ts-ignore
    global.console.error.mockClear();
  });
  it('latest version', () => {
    const notFound = yav.latest(testOptions.unknown);
    expect(notFound).rejects.toBeTruthy();
  });
  it('isUpdated', () => {
    const notFound = yav.isUpdated(testOptions.unknown, testOptions.lower);
    expect(notFound).rejects.toBeTruthy();
  });
  it('notify', (done) => {
    yav.notify(testOptions.unknown, testOptions.lower).then(() => {
      expect(global.console.log).toHaveBeenCalledTimes(0);
      expect(output).toBe('');
      expect(global.console.error).toHaveBeenCalledTimes(1);
      expect(outputError).toContain('Error in check for update');
      done();
    });
  });
  it('notify with await', async () => {
    await yav.notify(testOptions.unknown, testOptions.lower);
    expect(global.console.log).toHaveBeenCalledTimes(0);
    expect(output).toBe('');
    expect(global.console.error).toHaveBeenCalledTimes(1);
    expect(outputError).toContain('Error in check for update');
  });
});
