export class IPv6Validation {
  /**
   * Runs complete validation check for IPv6 IP address CIDR and AWS rules
   */
  public isValidIPv6(value: string): boolean {
    /**
     * This validation follows the same logic and background as IPv4.
     * IPv4 is simpler and explains the processes better
     * The changes are:
     * - IPv6 is 8 segments of 16 bits and 128 bits in total
     * - IPv6 segments use hexadecimal 0-F(0-15) and are split by :
     * - IPv6 can use one :: to represent one or more segments of zeros
     *     Ex. FF01:0:0:0:0:0:0:101 = FF01::101
     *
     * Notes:
     * 0xy means y is a hexadecimal number where y is any length
     */

    const splitInput = value.split('/');

    // 1. Expand the IP

    // First split by :: so we know where to add sections
    // Then split those arrays by : and convert to numbers to have each segment
    // Ex. FF01:1253::101 -> [[0xFF01, 0x1256], [0x101]]
    const ipDoubleSplit = splitInput[0].split('::').map((p) => (p === '' ? [] : p.split(':').map((s) => +`0x${s}`)));

    // Ensure we have at most one ::
    if (ipDoubleSplit.length > 2) {
      return false;
    }

    // Start by taking the part before ::
    const ipArr = ipDoubleSplit[0];
    // Then if we have ::
    if (ipDoubleSplit.length === 2) {
      // Check how many segments need to be added
      const toAdd = 8 - ipDoubleSplit[1].length - ipArr.length;
      // If it is zero then return false because :: should not have been used
      if (toAdd === 0) {
        return false;
      }
      // Add the segments of 0's
      for (let i = 0; i < toAdd; i++) {
        ipArr.push(0);
      }
      // Add the rest of the IP after the ::
      ipArr.push(...ipDoubleSplit[1]);
    }

    // 2. Check the segments
    // Ensure that there are 8 segments with each between 0 and ffff (inclusive)
    if (ipArr.length !== 8 || ipArr.some((s) => isNaN(s) || s < 0 || s > 0xffff)) {
      return false;
    }

    // 3. Check the postfix
    const postfix = +splitInput[1];
    // Ensure we have one postfix that is only digits and between 1 and 128 (inclusive)
    if (splitInput.length !== 2 || !/^\d+$/.exec(splitInput[1]) || postfix < 1 || postfix > 128) {
      return false;
    }

    // 4. Check the don't care bits

    // Move the ip into an array of ints
    // Issue is javascript limits bitwise operations to 32 bits
    // Every item is two segments of the ip in order
    const ipInts = [(ipArr[0] << 16) | ipArr[1], (ipArr[2] << 16) | ipArr[3], (ipArr[4] << 16) | ipArr[5], (ipArr[6] << 16) | ipArr[7]];

    // Check if the ip has an item in the array that has non zero no check bits
    const isInvalid = ipInts.some((s, i) => {
      // Create a bit mask to get the bits CIDR ignores for but only within this array item
      const mask = IPv6Validation.createMask(i, postfix);

      // If the mast AND s is not zero then it is invalid
      return (mask & s) != 0;
    });
    return !isInvalid;
  }

  private static createMask(i: number, postfix: number): number {
    // Create a mask for an array item
    // Think of it as creating the full mask then isolating the part that the item covers

    // Calculate the shift based on the array index
    const shift = postfix - i * 32;

    // Do a shortcut if we can
    if (shift > 31) {
      return 0;
    }
    if (shift <= 0) {
      return 4294967295;
    }

    // Else just do the shift 4294967295 is 32 1's in binary
    return 4294967295 >>> shift;
  }
}
