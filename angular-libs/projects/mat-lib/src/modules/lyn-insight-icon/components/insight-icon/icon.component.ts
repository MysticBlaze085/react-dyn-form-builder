import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IIconModel, InsightColorEnums, InsightIconEnums } from '../../models';

import { TooltipPosition } from '@angular/material/tooltip';

@Component({
  selector: 'lyn-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent implements OnChanges {
  /**
   * Mat Tooltip positioning
   */
  @Input() public matTooltipPosition: TooltipPosition = 'above';
  /**
   * Icon configuration object
   */
  @Input() public iconConfig: IIconModel = {
    icon: InsightIconEnums.INFO,
    color: InsightColorEnums.INFO,
    class: InsightColorEnums.INFO,
    text: '',
  };

  public ngOnChanges({ iconConfig }: SimpleChanges) {
    if (iconConfig?.currentValue) {
      this.iconConfig = iconConfig.currentValue;
    }
  }
}
