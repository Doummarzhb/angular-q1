import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { UsersService , User } from '../../core/state/users.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user?: User;

  constructor(private route: ActivatedRoute, private router: Router, private usersService: UsersService) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.usersService.getUserById(id).subscribe(u => this.user = u);
  }

  back() {
    this.router.navigate(['/']);
  }
}
