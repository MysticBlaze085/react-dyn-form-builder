import { UntypedFormBuilder, Validators } from '@angular/forms';

import { FormValidationHelper } from './form-validation.helper';

describe('FormValidationHelper', () => {
  let validationHelper: FormValidationHelper;
  let fb: UntypedFormBuilder;

  beforeEach(() => {
    fb = new UntypedFormBuilder();
    validationHelper = new FormValidationHelper();
  });

  describe('baseUrlPatternValidator', () => {
    it('should validate baseUrlPatternValidator invalid', () => {
      const form = fb.group({
        test: [null, [Validators.required, validationHelper.baseUrlPatternValidator()]],
      });
      form.patchValue({ test: 'base' });
      expect(form.get('test')?.valid).toBeFalsy();
    });
    it('should validate baseUrlPatternValidator invalid customer validation message', () => {
      const form = fb.group({
        test: [null, [Validators.required, validationHelper.baseUrlPatternValidator()]],
      });
      form.patchValue({ test: '/base/' });
      expect(form.get('test')?.valid).toBeFalsy();
    });
    it('should validate baseUrlPatternValidator valid', () => {
      const form = fb.group({
        test: [null, [Validators.required, validationHelper.baseUrlPatternValidator()]],
      });
      form.patchValue({ test: '/base' });
      expect(form.get('test')?.valid).toBeTruthy();
    });
  });

  describe('noWhitespaceValidator', () => {
    it('should validate noWhitespaceValidator invalid', () => {
      const form = fb.group({
        test: [null, [Validators.required, validationHelper.noWhitespaceValidator()]],
      });
      form.patchValue({ test: ' base ' });
      expect(form.get('test')?.valid).toBeFalsy();
    });
    it('should validate noWhitespaceValidator valid', () => {
      const form = fb.group({
        test: [null, [Validators.required, validationHelper.noWhitespaceValidator()]],
      });
      form.patchValue({ test: 'base' });
      expect(form.get('test')?.valid).toBeTruthy();
    });
  });

  describe('domainNameNoSpecialCharacters', () => {
    it('should validate domainNameNoSpecialCharacters invalid', () => {
      const form = fb.group({
        test: [null, [Validators.required, validationHelper.domainNameNoSpecialCharacters()]],
      });
      form.patchValue({ test: 'lyniate%$#' });
      expect(form.get('test')?.valid).toBeFalsy();
    });
    it('should validate domainNameNoSpecialCharacters valid', () => {
      const form = fb.group({
        test: [null, [Validators.required, validationHelper.domainNameNoSpecialCharacters()]],
      });
      form.patchValue({ test: 'lyniate' });
      expect(form.get('test')?.valid).toBeTruthy();
    });
  });

  describe('httpsIconHintValidation', () => {
    it('should validate httpsIconHintValidation invalid', () => {
      const form = fb.group({
        test: [null, [Validators.required, validationHelper.httpsIconHintValidation()]],
      });
      form.patchValue({ test: 'http://lyniate.com' });
      expect(form.get('test')?.valid).toBeFalsy();
    });
    it('should validate httpsIconHintValidation valid', () => {
      const form = fb.group({
        test: [null, [Validators.required, validationHelper.httpsIconHintValidation()]],
      });
      form.patchValue({ test: 'https://lyniate.com' });
      expect(form.get('test')?.valid).toBeTruthy();
    });
  });

  // needs to be revisited with a new implementation
  describe('httpsOrHttpValidation', () => {
    it('should validate httpsOrHttpValidation invalid', () => {
      const form = fb.group({
        test: [null, [Validators.required, validationHelper.httpsOrHttpValidation()]],
      });
      form.patchValue({ test: 'lyniate.com' });
      expect(form.get('test')?.valid).toBeFalsy();
    });
    it('should validate httpsOrHttpValidation invalid', () => {
      const form = fb.group({
        test: [null, [Validators.required, validationHelper.httpsOrHttpValidation()]],
      });
      form.patchValue({ test: 'http://lyniate.com' });
      expect(form.get('test')?.valid).toBeTruthy();
    });
    //Icon push is broken at the moment
    it('should validate httpsIconHintValidation valid', () => {
      const form = fb.group({
        test: [null, [Validators.required, validationHelper.httpsOrHttpValidation()]],
      });
      form.patchValue({ test: 'https://lyniate.com' });
      expect(form.get('test')?.valid).toBeTruthy();
    });
  });

  describe('httpsValidation', () => {
    it('should validate httpsValidation invalid', () => {
      const form = fb.group({
        test: [null, [Validators.required, validationHelper.httpsValidation()]],
      });
      form.patchValue({ test: 'http://lyniate.com' });
      expect(form.get('test')?.valid).toBeFalsy();
    });
    it('should validate httpsIconHintValidation valid', () => {
      const form = fb.group({
        test: [null, [Validators.required, validationHelper.httpsValidation()]],
      });
      form.patchValue({ test: 'https://lyniate.com' });
      expect(form.get('test')?.valid).toBeTruthy();
    });
  });

  describe('maxCharacterLength', () => {
    it('should validate maxCharacterLength invalid', () => {
      const form = fb.group({
        test: [null, [Validators.required, validationHelper.maxCharacterLength(5)]],
      });
      form.patchValue({ test: 'testing' });
      expect(form.get('test')?.valid).toBeFalsy();
    });
    it('should validate httpsIconHintValidation valid', () => {
      const form = fb.group({
        test: [null, [Validators.required, validationHelper.maxCharacterLength(5)]],
      });
      form.patchValue({ test: 'tests' });
      expect(form.get('test')?.valid).toBeTruthy();
    });
  });

  describe('ipv4Address', () => {
    it('should validate ipv4Address invalid', () => {
      const form = fb.group({
        test: [null, [Validators.required, validationHelper.ipv4Address()]],
      });
      form.patchValue({ test: '125.0.0.0/1' });
      expect(form.get('test')?.valid).toBeFalsy();
    });
    it('should validate httpsIconHintValidation valid', () => {
      const form = fb.group({
        test: [null, [Validators.required, validationHelper.ipv4Address()]],
      });
      form.patchValue({ test: '192.0.2.44/32' });
      expect(form.get('test')?.valid).toBeTruthy();
    });
  });

  describe('ipv6Address', () => {
    it('should validate ipv6Address invalid', () => {
      const form = fb.group({
        test: [null, [Validators.required, validationHelper.ipv6Address()]],
      });
      form.patchValue({ test: '192.0.1.00/24' });
      expect(form.get('test')?.valid).toBeFalsy();
    });
    it('should validate httpsIconHintValidation valid', () => {
      const form = fb.group({
        test: [null, [Validators.required, validationHelper.ipv6Address()]],
      });
      form.patchValue({ test: '2356:0001:23:456::/64' });
      expect(form.get('test')?.valid).toBeTruthy();
    });
  });

  describe('base64Validator', () => {
    const isValid = `---- BEGIN PUBLIC KEY ----
    AAAAB3NzaC1kc3MAAACBAPY8ZOHY2yFSJA6XYC9HRwNHxaehvx5wOJ0rzZdzoSOXxbET
    W6ToHv8D1UJ/z+zHo9Fiko5XybZnDIaBDHtblQ+Yp7StxyltHnXF1YLfKD1G4T6JYrdH
    YI14Om1eg9e4NnCRleaqoZPF3UGfZia6bXrGTQf3gJq2e7Yisk/gF+1VAAAAFQDb8D5c
    vwHWTZDPfX0D2s9Rd7NBvQAAAIEAlN92+Bb7D4KLYk3IwRbXblwXdkPggA4pfdtW9vGf
    J0/RHd+NjB4eo1D+0dix6tXwYGN7PKS5R/FXPNwxHPapcj9uL1Jn2AWQ2dsknf+i/FAA
    vioUPkmdMc0zuWoSOEsSNhVDtX3WdvVcGcBq9cetzrtOKWOocJmJ80qadxTRHtUAAACB
    AN7CY+KKv1gHpRzFwdQm7HK9bb1LAo2KwaoXnadFgeptNBQeSXG1vO+JsvphVMBJc9HS
    n24VYtYtsMu74qXviYjziVucWKjjKEb11juqnF0GDlB3VVmxHLmxnAz643WK42Z7dLM5
    sY29ouezv4Xz2PuMch5VGPP+CDqzCM4loWgV
    ---- END PUBLIC KEY ----`;
    const isInvalid1 = `   AAAAB3NzaC1kc3MAAACBAPY8ZOHY2yFSJA6XYC9HRwNHxaehvx5wOJ0rzZdzoSOXxbET
    W6ToHv8D1UJ/z+zHo9Fiko5XybZnDIaBDHtblQ+Yp7StxyltHnXF1YLfKD1G4T6JYrdH
    YI14Om1eg9e4NnCRleaqoZPF3UGfZia6bXrGTQf3gJq2e7Yisk/gF+1VAAAAFQDb8D5c
    vwHWTZDPfX0D2s9Rd7NBvQAAAIEAlN92+Bb7D4KLYk3IwRbXblwXdkPggA4pfdtW9vGf
    J0/RHd+NjB4eo1D+0dix6tXwYGN7PKS5R/FXPNwxHPapcj9uL1Jn2AWQ2dsknf+i/FAA
    vioUPkmdMc0zuWoSOEsSNhVDtX3WdvVcGcBq9cetzrtOKWOocJmJ80qadxTRHtUAAACB
    AN7CY+KKv1gHpRzFwdQm7HK9bb1LAo2KwaoXnadFgeptNBQeSXG1vO+JsvphVMBJc9HS
    n24VYtYtsMu74qXviYjziVucWKjjKEb11juqnF0GDlB3VVmxHLmxnAz643WK42Z7dLM5
    sY29ouezv4Xz2PuMch5VGPP+CDqzCM4loWgV`;
    const isInvalid2 = `---- BEGIN PUBLIC KEY ----
    AA&AAB3%NzaC1kc3MAAACBAPY8ZOHY2yFSJA6XYC9HRwNHxaehvx5wOJ0rzZdzoSOXxbET
    W6ToHv8D1UJ/z+zHo9Fiko5XybZnDIaBDHtblQ+Yp7StxyltHnXF1YLfKD1G4T6JYrdH
    YI14Om1eg9e4NnCRleaqoZPF3UGfZia6bXrGTQf3gJq2e7Yisk/gF+1VAAAAFQDb8D5c
    vwHWTZDPfX0D2s9Rd7NBvQAAAIEAlN92+Bb7D4KLYk3IwRbXblwXdkPggA4pfdtW9vGf
    J0/RHd+NjB4eo1D+0dix6tXwYGN7PKS5R/FXPNwxHPapcj9uL1Jn2AWQ2dsknf+i/FAA
    vioUPkmdMc0zuWoSOEsSNhVDtX3WdvVcGcBq9cetzrtOKWOocJmJ80qadxTRHtUAAACB
    AN7CY+KKv1gHpRzFwdQm7HK9bb1LAo2KwaoXnadFgeptNBQeSXG1vO+JsvphVMBJc9HS
    n24VYtYtsMu74qXviYjziVucWKjjKEb11juqnF0GDlB3VVmxHLmxnAz643WK42Z7dLM5
    sY29ouezv4Xz2PuMch5VGPP+CDqzCM4loWgV
    ---- END PUBLIC KEY ----`;

    it('should validate base64Validator invalid1', () => {
      const form = fb.group({
        test: [null, [Validators.required, validationHelper.base64Validator()]],
      });
      form.patchValue({ test: isInvalid1 });
      expect(form.get('test')?.valid).toBeFalsy();
    });
    it('should validate base64Validator invalid2', () => {
      const form = fb.group({
        test: [null, [Validators.required, validationHelper.base64Validator()]],
      });
      form.patchValue({ test: isInvalid2 });
      expect(form.get('test')?.valid).toBeFalsy();
    });
    it('should validate base64Validator valid', () => {
      const form = fb.group({
        test: [null, [Validators.required, validationHelper.base64Validator()]],
      });
      form.patchValue({ test: isValid });
      expect(form.get('test')?.valid).toBeTruthy();
    });
  });
});
