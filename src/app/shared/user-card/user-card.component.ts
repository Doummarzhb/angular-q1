import { Component, Input } from '@angular/core';
import { User } from '../../core/state/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent {
  @Input() user!: User;
  constructor(private router: Router) {}
  goToDetail() { this.router.navigate(['/users', this.user.id]); }
}
