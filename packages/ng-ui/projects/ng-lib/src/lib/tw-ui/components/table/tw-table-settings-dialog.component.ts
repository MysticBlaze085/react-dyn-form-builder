import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { SettingsIconComponent } from './utils';

@Component({
    selector: 'tw-table-settings-dialog',
    standalone: true,
    imports: [CommonModule, SettingsIconComponent, DialogComponent],
    template: `
        <adk-settings-icon (click)="openDialog('Sign In', 'Enter your email and password to Sign In.')"> </adk-settings-icon>
        <tw-dialog
            [isOpen]="isDialogOpen"
            [title]="dialogTitle"
            [content]="dialogContent"
            (close)="isDialogOpen = false"
            (isOpenChange)="isDialogOpen = $event"
        ></tw-dialog>
    `,
    styles: [
        `
            :host {
                display: block;
                width: 100%;
            }
        `,
    ],
})
export class TwTableSettingsDialogComponent {
    isDialogOpen = false;
    dialogTitle = '';
    dialogContent = '';

    openDialog(title: string, content: string) {
        this.dialogTitle = title;
        this.dialogContent = content;
        this.isDialogOpen = true;
    }
}
