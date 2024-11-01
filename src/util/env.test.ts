import { getEnv, getEnvWithDefaultValue } from './env';

describe('env util tests', () => {
  describe('getEnv', () => {
    describe('given an existing env variable', () => {
      beforeAll(() => (process.env['dummy'] = 'foo'));
      it('return the env variable value', () => {
        expect(getEnv('dummy')).toEqual('foo');
      });
    });

    describe('given a missing env variable', () => {
      it('throw error', () => {
        expect(() => getEnv('some_value')).toThrow('Missing env variable: some_value');
      });
    });
  });

  describe('getEnvWithDefaultValue', () => {
    describe('given an existing env variable', () => {
      beforeAll(() => (process.env['dummy'] = 'foo'));
      it('return the env variable value', () => {
        expect(getEnvWithDefaultValue('dummy')).toEqual('foo');
      });
    });

    describe('given a missing env variable', () => {
      it('return the default value provided', () => {
        expect(getEnvWithDefaultValue('some_value', 'i am default')).toEqual('i am default');
      });
    });
  });
});
