import { Component, OnInit, Input , Output, EventEmitter} from '@angular/core';
import { User } from '../user.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  userForm: FormGroup;

  private _user: User;
  get user(): User {
    return this._user;
  }

  @Input()
  set user(newUser: User) {
    this._user = newUser;
    console.log(newUser);
    if (newUser) {
      this.buildUserForm(newUser);
    }
  }

  @Output()
  changeCurrentUser: EventEmitter<User> = new EventEmitter<User>();

  @Output()
  currentUser: EventEmitter<User> = new EventEmitter<User>();

  @Output()
  valueEntered: EventEmitter<any> = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder) {
  }

  buildUserForm(user: User) {
    this.userForm = this.formBuilder.group({
      'name': new FormControl(user.name),
      'email': new FormControl(user.email),
      'city': new FormControl(user.address && user.address.city ? user.address.city : '', Validators.required)
    });
  }

  get city () {
     return this.userForm.get('city');
  }

  public validate(): void {
    this.valueEntered.emit(this.userForm.value);
}

}
