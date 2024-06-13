import { FieldControlModel } from '../../field/api';

export interface Option {
  /**
   * Attribute for cypress
   */
  dataCy?: any;
  /**
   * Disable a selected value
   */
  disabled?: boolean;
  /**
   * Key of a form field that is displayed in dropdown menu
   */
  key: string;
  /**
   * Hides an option
   */
  hidden?: boolean;
  /**
   * Value of a form field
   */
  value: string;
}
export type DropdownOptionModel<TOptionGroup = boolean> = TOptionGroup extends true
  ? {
      isOptionGroup: TOptionGroup;
      /**
       * Option group label
       */
      optgroupLabel: string;
      options: {
        /**
         * Attribute for cypress
         */
        dataCy: string;
        /**
         * Disable a selected value
         */
        disabled?: boolean;
        /**
         * Key of a form field that is displayed in dropdown menu
         */
        key: string;
        /**
         * Hides an option
         */
        hidden?: boolean;
        /**
         * Value of a form field
         */
        value: string;
      }[];
    }
  : {
      isOptionGroup: TOptionGroup;
      /**
       * Attribute for cypress
       */
      dataCy: string;
      /**
       * Disable a selected value
       */
      disabled?: boolean;
      /**
       * Key of a form field that is displayed in dropdown menu
       */
      key: string;
      /**
       * Hides an option
       */
      hidden?: boolean;
      /**
       * Value of a form field
       */
      value: string;
    };

export type DropdownFieldControlModel<TMultiple = boolean> = TMultiple extends true
  ? {
      isSelectAllOptions: TMultiple;
      isMultiple: TMultiple;
      options: DropdownOptionModel[];
      value: string[] | null;
      selectAllDisplay: string;
    } & FieldControlModel<string[] | null>
  : {
      isSelectAllOptions?: TMultiple;
      isMultiple: TMultiple;
      options: DropdownOptionModel[];
      value: string | null;
      selectAllDisplay?: string;
    } & FieldControlModel<string | null>;
