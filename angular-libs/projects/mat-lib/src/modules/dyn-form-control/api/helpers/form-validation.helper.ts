import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { IPv4Validation } from './ipv4-validation.helpers';
import { IPv6Validation } from './ipv6-validation.helpers';

export class FormValidationHelper {
  /**
   * Validate base url patter,
   * first character must start with a '/'
   * last character must not end with a '/'
   */
  public baseUrlPatternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }
      const lengthValue = control.value.length;
      const firstCharacter = control.value[0] === '/';
      const lastCharacter = control.value[lengthValue - 1] === '/';
      if (!firstCharacter) {
        return firstCharacter ? null : { customInvalidMessage: { message: 'Base path must start with a /' } };
      }
      if (lastCharacter) {
        return { customInvalidMessage: { message: 'Base path must not end with a /' } };
      }
      return null;
    };
  }
  /**
   * Validates no empty spaces
   */
  public noWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }
      const isWhitespace = (control.value || '').match(/\s/g);
      const isValid = !isWhitespace;
      return isValid ? null : { customInvalidMessage: { message: 'Remove empty spaces' } };
    };
  }

  /**
   * No Special Characters
   */
  public domainNameNoSpecialCharacters(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }

      const removePeriod = [...control.value].filter((str) => str !== '.').join('');
      const isSpecialCharacters = /^([a-zA-Z0-9]+)$/.test(removePeriod);

      const isValid = isSpecialCharacters;
      return isValid ? null : { customInvalidMessage: { message: 'Can only use letter and/or numbers.' } };
    };
  }
  /**
   * Warning message validation without setting form to INVALID
   */
  public httpsIconHintValidation(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }
      const value = control.value.toLowerCase();
      const isHttps = /^(https:\/\/)(?!www\.)([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(\S*)$/;
      return isHttps.test(value) ? null : { customHintIcon: true };
    };
  }
  /**
   * Validate Https and Http
   */
  public httpsOrHttpValidation(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }
      const value = control.value.toLowerCase(); // Convert to lowercase for case insensitivity
      const urlPattern = /^(https?:\/\/)?(?!www\.)([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(\S*)$/;
      // Regular expression pattern to match IP address with an optional port number
      const pattern = /^(https?:\/\/)?(?!www\.)([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+)(:[0-9]+)?(\/.*)?$/;

      return (urlPattern.test(value) && value.includes('http')) || (pattern.test(value) && value.includes('http'))
        ? null
        : { customInvalidMessage: { message: 'Fully qualified URL path required.' } };
    };
  }
  /**
   * Validates Https only
   */
  public httpsValidation(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }
      const isHttps = (control.value || '').indexOf('https://') === 0;
      return isHttps ? null : { customInvalidMessage: { message: 'Fully qualified URL path required.' } };
    };
  }
  /**
   * Max character length allowed
   */
  public maxCharacterLength(maxLength: number) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }

      const isLength = Object.keys(control.value || '').length <= maxLength;
      return isLength ? null : { customInvalidMessage: { message: `Reached max characters of ${maxLength}` } };
    };
  }
  /**
   * Validate IPV4 IP Address
   */
  public ipv4Address() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        control.markAsPristine();
        return null;
      }

      const isArray = Array.isArray(control.value) ? '' : control.value;
      const validateNetworkPrefix = new IPv4Validation().isValidIPv4(isArray);
      const isValid = validateNetworkPrefix;

      return isValid ? null : { customInvalidMessage: { message: 'Invalid IPv4 Address Format' } };
    };
  }
  /**
   * Validate IPV6 IP Address
   */
  public ipv6Address() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        control.markAsPristine();
        return null;
      }

      const isArray = Array.isArray(control.value) ? '' : control.value;
      const validateNetworkPrefix = new IPv6Validation().isValidIPv6(isArray);
      const isValid = validateNetworkPrefix;

      return isValid ? null : { customInvalidMessage: { message: 'Invalid IPv6 Address Format' } };
    };
  }
  /**
   * Greater then 1 no less the 1, 0 or negative number
   */
  public greaterThanOrEqualOne() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }
      const isNumber = typeof (control.value || 0) === 'number';
      const isGreaterThanOne = isNumber && (control.value || 0) >= 1;
      return isGreaterThanOne ? null : { customInvalidMessage: { message: `Value must be 1 or greater.` } };
    };
  }
  /**
   * Seconds 1000 - 3000 validator
   */
  public validateSeconds(numberOne: number, numberTwo: number) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }
      const isValueZero = (control.value || 0) === 0 ? numberOne : control.value || 0;
      const isConditional = isValueZero >= numberOne && isValueZero <= numberTwo;
      return isConditional
        ? null
        : {
            customInvalidMessage: {
              message: `Value must be greater than or equal too ${numberOne} or must be less than or equal to ${numberTwo}.`,
            },
          };
    };
  }
  /**
   * Valid URL validator
   **/
  public urlValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const urlPattern = /^(?:(ftp|http|https):\/\/)?(www\.)?[^\s/$.?#].[^\s]*$/i;

      if (!control.value || urlPattern.test(control.value)) {
        return null; // Valid URL
      } else {
        return {
          customInvalidMessage: {
            message: 'Invalid URL',
          },
        };
      }
    };
  }
  /**
   * Validate Base
   */
  public base64Validator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      let isValid = false;
      if (value) isValid = this.isValidPublicKeyBase64(value);
      return isValid ? null : { customInvalidMessage: { message: 'Public Key format entered is invalid' } };
    };
  }
  /**
   *
   * @param str
   * @returns
   */
  public isValidPublicKeyBase64(str: string) {
    const beginPublicKey = '---- BEGIN PUBLIC KEY ----';
    const endPublicKey = '---- END PUBLIC KEY ----';

    // Check if the headers and footers exist
    if (!str.includes(beginPublicKey) || !str.includes(endPublicKey)) {
      return false;
    }

    // Remove headers/footers and line breaks
    const base64String = str.replace(beginPublicKey, '').replace(endPublicKey, '').replace(/\n/g, '');
    try {
      window.atob(base64String);
      return true;
    } catch (e) {
      return false;
    }
  }
}
