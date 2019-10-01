import { Component, Inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { from } from 'rxjs';

import { PluService, Product } from '../plu.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

interface DialogData {
  url: string;
  label: string;
}

@Component({
  selector: 'app-admin-dialog',
  templateUrl: './dialog-picture.html',
  styleUrls: ['./plu.component.css']
})
export class AdminComponentPhotoDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}

@Component({
  selector: 'app-plu',
  templateUrl: './plu.component.html',
  styleUrls: ['./plu.component.css']
})
export class PluComponent implements OnInit, AfterViewInit {
  deleteItemsList = new Set();
  pluForm: FormGroup;
  pluProducts = new MatTableDataSource<Product>();
  pluDisplayedColumns: string[] = ['delete', 'barcode', 'plu', 'name', 'url'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private fb: FormBuilder,
    private pluService: PluService,
    public dialog: MatDialog) {
  }

  ngAfterViewInit() {
    this.pluProducts.sort = this.sort;
  }

  initPluForm() {
    this.pluForm = this.fb.group({
      barcode: ['', Validators.required],
      plu: ['', [Validators.pattern('[0-9]+'), Validators.required]],
      name: ['', Validators.required],
      url: ''
    });
  }

  addPluProduct(): void {
    const newProduct = {
      barcode: this.pluForm.controls.barcode.value,
      plu: this.pluForm.controls.plu.value,
      name: this.pluForm.controls.name.value,
      url: this.pluForm.controls.url.value
    };

    const plu = this.pluForm.controls.plu.value;
    const url = this.pluForm.controls.url.value;
    if (!plu) { delete newProduct.plu; }
    if (!url) { delete newProduct.url; }

    console.log(newProduct);
    this.pluService.addProduct(newProduct).subscribe( result => {
      this.getPluProducts();
      console.log('Result: ' + JSON.stringify(result));
    });
  }

  deleteProducts() {
    from(Array.from(this.deleteItemsList.values()))
    .subscribe(
      next => {
        this.pluService.deleteProduct(next).subscribe(
          () => {
            console.log('delete ' + next);
            this.getPluProducts();
          }
        );
      },
      error => console.error(error),
      () => { console.log('complete'); }
    );
  }

  populateForm(row) {
    this.pluForm.patchValue({...row});
    console.log(row);
  }

  public clearForm() {
    const cleanSheet = {
      barcode: '',
      plu: '',
      name: '',
      url: ''
    };
    this.pluForm.setValue(cleanSheet);
  }

  deleteAddProducts(product) {
    product.checked = !product.checked;
    if (product.checked) {
      this.deleteItemsList.add(product._id);
    } else {
      this.deleteItemsList.delete(product._id);
    }
    console.log(this.deleteItemsList);
  }

  getPluProducts(): void {
    this.pluService.getAllProducts().subscribe( result => this.pluProducts.data = result.products);
  }

  openDialog(product) {
    this.dialog.open(AdminComponentPhotoDialogComponent,
      { width: '70vmin',
        data: { url: product.url , label: product.name }});
  }

  get pluBarcode() {
    const barcode = this.pluForm.controls.barcode;
    return (typeof barcode === 'string') ? barcode : '';
  }

  get pluPlu() {
    const plu =  this.pluForm.controls.plu;
    return (typeof plu === 'number') ? plu : '';

  }

  get pluName() {
    const name = this.pluForm.controls.name;
    return (typeof name === 'string') ? name : '';
  }

  get pluUrl() {
    const url = this.pluForm.controls.url;
    return (typeof url === 'string') ? url : '';
  }

  ngOnInit() {
    this.initPluForm();
    console.log('ngOnInit:');
    console.log(this.pluForm);
    this.getPluProducts();
  }

}
