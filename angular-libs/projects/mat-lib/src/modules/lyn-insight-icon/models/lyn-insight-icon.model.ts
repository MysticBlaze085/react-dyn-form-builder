import { InsightColorTypes, InsightIconTypes } from './lyn-insight-icon.types';

export interface IIconModel {
  class: string;
  color: InsightColorTypes;
  icon: InsightIconTypes;
  text: string | undefined;
}
