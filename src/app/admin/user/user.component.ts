
import { Component, Inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { from } from 'rxjs';

import { UserService, User } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, AfterViewInit {
  deleteItemsList = new Set();
  userForm: FormGroup;
  users = new MatTableDataSource<User>();
  displayedColumns: string[] = ['delete', 'email', 'store', 'role'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
    ) {
  }

  ngAfterViewInit() {
    this.users.sort = this.sort;
  }

  initPluForm() {
    this.userForm = this.fb.group({
      email: ['', Validators.required],
      store: ['', [Validators.pattern('[0-9]+'), Validators.required]],
      role: ['', Validators.required],
      password: ''
    });
  }

  addUser(): void {
    const newUser = {
      email: this.userForm.controls.email.value,
      store: this.userForm.controls.store.value,
      role: this.userForm.controls.role.value,
      password: this.userForm.controls.password.value
    };

    this.userService.addUser(newUser).subscribe( result => {
      this.getUsers();
    });
  }

  deleteUsers() {
    from(Array.from(this.deleteItemsList.values()))
    .subscribe(
      next => {
        this.userService.deleteUser(next).subscribe(
          () => {
            this.getUsers();
          }
        );
      },
      error => console.error(error),
      () => { console.log('complete'); }
    );
  }

  populateForm(row) {
    this.userForm.patchValue({...row});
    console.log(row);
  }

  public clearForm() {
    const cleanSheet = {
      email: '',
      store: '',
      role: '',
      password: ''
    };
    this.userForm.setValue(cleanSheet);
  }

  deleteAddUsers(user) {
    user.checked = !user.checked;
    if (user.checked) {
      this.deleteItemsList.add(user._id);
    } else {
      this.deleteItemsList.delete(user._id);
    }
    console.log(this.deleteItemsList);
  }

  getUsers(): void {
    this.userService.getAllUsers().subscribe( result => this.users.data = result);
  }

  ngOnInit() {
    this.initPluForm();
    this.getUsers();
  }

}

