import { IPv4Validation } from './ipv4-validation.helpers';

describe('IPv4Validation', () => {
  const ipv4Validation = new IPv4Validation();

  it('should check if /num exist', () => {
    expect(ipv4Validation.isValidIPv4('125.36.0.0')).toBeFalsy();
    // NaN
    expect(ipv4Validation.isValidIPv4('125.36.89.0.0/32addedText')).toBeFalsy();
  });

  it('should show less numbers as invalid', () => {
    expect(ipv4Validation.isValidIPv4('125.0.0')).toBeFalsy();
  });

  it('should fail if value is empty', () => {
    expect(ipv4Validation.isValidIPv4('')).toBeFalsy();
  });

  it('should validate array ip address values', () => {
    const testArray: string[] = [
      '125.36.89.0.0/32',
      '125.36.0.0/11',
      '125.36.89.45/24',
      '125.0.0.0/1',
      '172.25.58.0x2/32',
      '172.25.58.-4/32',
      '172.25.58.4/0x3',
      '172.25.58.4/32',
      '125.36.0.0/14',
      '125.36.89.0/24',
    ];

    testArray.forEach((str, i: number) => {
      ipv4Validation.isValidIPv4(str);
      if (i >= 0 && i <= 6) {
        expect(ipv4Validation.isValidIPv4(str)).toBeFalsy();
      }

      if (i > 6) {
        expect(ipv4Validation.isValidIPv4(str)).toBeTruthy();
      }
    });
  });
});
