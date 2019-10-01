import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PermissionsService } from '../permissions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cdate',
  templateUrl: './cdate.component.html',
  styleUrls: ['./cdate.component.css']
})
export class CdateComponent implements OnInit {
  cdateForm: FormGroup;

  name = 'Angular';

  get date() {
    const dateInput = this.cdateForm.controls.bbdate.value;
    return new Date(dateInput);
  }

  get discountOn() {
    const oldDate = new Date(this.date);
    oldDate.setDate(oldDate.getDate() - this.cdate + 1);
    // return { d1: this.date, d2: oldDate };
    return oldDate;
  }

  get cdate() {
    return this.cdateForm.controls.cdate.value;
  }

  get discountOnString() {
    let mm = this.discountOn.getMonth()+1;
    let dd = this.discountOn.getDate();
    return `${dd}/${mm}`
  }

  ngOnInit() {
    if (!this.ps.role) {
      this.router.navigate(['/login']);
    }
    this.cdateForm = this.fb.group({
      bbdate: [Date.now(), [ Validators.required ]],
      cdate: [1]
    });
  }

  constructor(
    private fb: FormBuilder,
    private ps: PermissionsService,
    private router: Router ) { }
}
