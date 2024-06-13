import { IPv6Validation } from './ipv6-validation.helpers';

describe('IPv6Validation', () => {
  const ipv6Validation = new IPv6Validation();

  it('should verify that there is a / and containers number range 1-128, negative', () => {
    expect(ipv6Validation.isValidIPv6('2356:0001:23:456::')).toBeFalsy();
    // Number above 128
    expect(ipv6Validation.isValidIPv6('2356:0001:23:456::/129')).toBeFalsy();
    // Number below 1
    expect(ipv6Validation.isValidIPv6('2356:0001:23:456::/0')).toBeFalsy();
    // NaN
    expect(ipv6Validation.isValidIPv6('2356:0001:23:456::/a')).toBeFalsy();
    expect(ipv6Validation.isValidIPv6('2356:0001:23:456::/64addedText')).toBeFalsy();
  });

  it('should have one within array and value is 0', () => {
    expect(ipv6Validation.isValidIPv6('0::/4')).toBeTruthy();
  });

  it('should verify that there is only one :: in the string, negative', () => {
    expect(ipv6Validation.isValidIPv6('2356:0001:23:456/64')).toBeFalsy();
    expect(ipv6Validation.isValidIPv6('2356:0001:23:456/128')).toBeFalsy();
    expect(ipv6Validation.isValidIPv6('2356::0001:23::456/128')).toBeFalsy();
  });

  it('should make sure all subsequent blocks are zeros, negative', () => {
    expect(ipv6Validation.isValidIPv6('2354::1234:0::00::/14')).toBeFalsy();
  });

  it('should make sure that if there are numbers following this one are zero, negative', () => {
    expect(ipv6Validation.isValidIPv6('2354:0:0:0::/8')).toBeFalsy();
  });

  it('should test trailing zeros, successful', () => {
    expect(ipv6Validation.isValidIPv6('2354:0000:0:00::/14')).toBeTruthy();
  });

  it('should test trailing zeros, negative', () => {
    expect(ipv6Validation.isValidIPv6('2387:1000:000:00::/19')).toBeFalsy();
  });

  it('should be truthy', () => {
    const testArray: string[] = [
      '2356:0001:23:456::/64',
      '8000:0000:0:0::/1',
      '4000:0000:0:0::/2',
      '2000:0000:0:0::/3',
      '1000:0000:0:0::/4',
      '8800:0000:0:0::/5',
      '4C00:0000:0:0::/6',
      '2400:0000:0:0::/7',
      '1F00:0000:0:0::/8',
      '1F00:0000:0:0::/100',
      '0:0000:0:0::/8',
      '1111:0000:0000:0000:0000::/64',
      '0:0::/63',
      '::635/128',
      '999:556:000:999:888:8788::/128',
      '999:556:000:999:888:8788:1234::/128',
      '999:556:000:999:888:8788:8745:659/128',
      '25:6987:56:635:345:657:345:765/128',
      '2354::0000:0:00/128',
    ];

    testArray.forEach((str) => {
      expect(ipv6Validation.isValidIPv6(str)).toBeTruthy();
    });
  });

  it('should be falsy', () => {
    const testArray = [
      '999:556:000:999:888:8788:1234/128',
      '999:556::665:/128',
      '0:0:0:0:0:0:0:0:0::/128',
      '0:FFFFF::/32',
      '0000:CAT::/32',
      '0000:-325::/32',
      '0:0:0:0:0:0:0:0::/128',
      '25:6987:56:635:345:657:345:765::/128',
      '25:6987:56:635:345:657:345:765:234/128',
      '::345l/128',
    ];

    testArray.forEach((str) => {
      expect(ipv6Validation.isValidIPv6(str)).toBeFalsy();
    });
  });
});
