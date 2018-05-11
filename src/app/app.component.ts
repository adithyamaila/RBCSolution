import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { User } from './user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  users: User[];
  currentUser: User;
  changeDetector: Boolean = false;
  isValidUser: Boolean = true;

  constructor(private usersService: UsersService) {
  }

  ngOnInit(): void {
    this.usersService.getUsers()
      .subscribe(receivedUsers => {
        this.users = receivedUsers;
       this.currentUser = {};
      });
  }

  changeCurrentUser(event: MouseEvent, user: User) {
    if (event) {
      this.currentUser = user;
      console.log('current User' + this.currentUser.address.city);
    }
  }

  validateNewUser(user: any): Boolean {
    for (let i = 0; i < this.users.length; ++i) {
      if (user.city === this.users[i].address.city) {
        // this.isValidUser = false;
        alert('City Name should be unique!!');
        return false;
      }
    }
    return true;
  }
}
