import { Inject } from "@angular/core";
import { Component } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { BehaviorSubject, Observable } from "rxjs";

@Component({
    selector: 'app-material-modal',
    template: ` <div class="col-xl-12">
      <div class="col-xl-12">
        <br />
        <h1 mat-dialog-title class="text-danger">Erreur {{ data.name }}</h1>
        <div mat-dialog-content>
          <p>{{ data.rapport }} </p>
        </div>
        <div mat-dialog-actions>
          <button mat-button ></button>
          <button mat-button [mat-dialog-close]="" cdkFocusInitial>
            Ok
          </button>
        </div>
        <br />
      </div>
    </div>`,
})
export class DialogComponent {
    animalSubject = new BehaviorSubject<string>('');
    constructor(
        public dialogRef: MatDialogRef<DialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        public dialog: MatDialog
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    openDialogg(name: string, rapport: string): void {
        const dialogRef = this.dialog.open(DialogComponent, {
            width: '280px',
            data: { name: name, rapport: rapport },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.animalSubject.next(result);
            }
        });
    }
}

export interface DialogData {
    rapport: string;
    name: string;
}

