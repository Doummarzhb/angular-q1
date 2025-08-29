import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { UsersService , User } from '../../core/state/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  displayedUsers: User[] = [];
  page = 1;
  totalPages = 1;
  pageSize = 3;
  searchControl = new FormControl('');
  searchMode = false;

  displayedColumns: string[] = ['avatar','name','email','id','details'];

  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit() {
    this.loadUsers(this.page);

    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(id => {
        if (!id) { this.searchMode=false; return of(null); }
        this.searchMode = true;
        return this.usersService.getUserById(Number(id));
      })
    ).subscribe(user => {
      if(user) this.displayedUsers = [user];
      else this.displayedUsers = [];
    });
  }

  loadUsers(page: number) {
    this.usersService.getUsers(page, this.pageSize).subscribe(res => {
      this.users = res.data;
      this.totalPages = res.total_pages;
      this.page = page;
      if(!this.searchMode) this.displayedUsers = res.data;
    });
  }

  goToPage(page: number) {
    if(page >=1 && page <= this.totalPages) this.loadUsers(page);
  }

  goToDetail(id: number) {
    this.router.navigate(['/user', id]);
  }
}
