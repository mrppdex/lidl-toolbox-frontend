import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PermissionsService } from '../permissions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css']
})
export class DiscountComponent implements OnInit {
  discountForm: FormGroup;
  reduced = 0;
  discount = 0.3;

  constructor(
    private fb: FormBuilder,
    private ps: PermissionsService,
    private router: Router) { }

  onChange() {
    this.reduced = +this.discountForm.controls.price.value * (1 - this.discount);
  }

  get price() {
    return this.discountForm.controls.price.value;
  }

  get reducedPrice() {
    return (Math.round(this.reduced * 100) / 100).toFixed(2);
  }

  changeDiscount(group) {
    this.discount = +group.value;
    this.onChange();
  }

  ngOnInit() {
    if (!this.ps.role) {
      this.router.navigate(['/login']);
    }
    this.discountForm = this.fb.group({
      price: ['0', [
        Validators.pattern('[0-9]+\.?[0-9]{0,2}'),
        Validators.required]]
    });
  }

}
