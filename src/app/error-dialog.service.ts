import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ErrorDialogComponent } from './error-dialog/error-dialog.component';

export interface DialogData {
  title: string;
  message: string;
}


@Injectable()
export class ErrorDialogService {

  public show(data: DialogData) {
    const dialogRef = this.errDialog.open(ErrorDialogComponent, { data });
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }

  constructor(public errDialog: MatDialog) { }

}
