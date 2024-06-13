/**
 * IPv4 Validation helper class checks validity of an IP address
 */
export class IPv4Validation {
  /**
   * Runs complete validation check for IPv4 IP address CIDR and AWS rules
   */
  public isValidIPv4(value: string): boolean {
    // 1. Check the IP format
    const splitInput = value.split('/');
    const ipArr = splitInput[0].split('.').map((s) => +s);

    // Run a digit regex check and ensure segments are all less than or equal to 255 (regex will take care of negative numbers)
    // Unfortunately, the regex is required to ensure the user can't enter hexadecimal(0xa1)
    // The regex says there must be four groups of at least one digit optionally followed by the postfix that is any number of digits
    if (!/^\d+\.\d+\.\d+\.\d+(?:\/\d+)?$/.exec(value) || ipArr.some((s) => s < 0 || s > 255)) {
      return false;
    }

    // 2. Check the CIDR postfix
    const postfix = +splitInput[1];
    // Ensure we have more just one postfix and the postfix is less than or equal to 32
    // AWS does not allow us to have a CIDR postfix of 0
    if (splitInput.length != 2 || postfix < 1 || postfix > 32) {
      return false;
    }

    /**
     * 3. Check the don't care bits
     *
     * Background:
     * Strictly speaking x.x.x.x is not an IP address but rather an human friendly representation.
     * An IP address is simply 32 bits.
     * CIDR notation is used to specify an IP range by saying how many bits matter.
     * For example x.x.x.x/20 means that only the first 20 bits have to match and it does not care about the rest.
     * As part of the CIDR RFC, any of the don't care bits have to be 0. We can check just those bits by using bitwise AND.
     * https://cidr.xyz has a good visualization.
     */

    // Convert the IP into its raw binary form
    // This is done by taking each segment of 8 bits and putting them right after each other
    // For example 1.2.4.8 -> 00000001 00000010 00000100 00001000 (spaces left for readability)
    const ipInt = ipArr.reduce((i, s) => (i << 8) | s, 0);

    // Create a bit mask to get the don't care bits
    // The bit mask will have 0 where the bits matter and 1 where CIDR ignores the bits
    // Ex. for /28 four bits are not checked so the mask will be 00000000 00000000 00000000 00001111 (spaces for readability)
    const mask = (1 << (32 - postfix)) - 1;

    // AND the bits of the mask and the IP together
    // Using AND will return only the bits that are 1 in both the mask and IP
    // So in this case, any bit in the output is a don't care bit that is 1 meaning it is invalid
    // If no bits are one then we get 0 and the input is valid
    return (mask & ipInt) == 0;
  }
}
