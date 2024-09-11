import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  showForm = false;
  isEditing = false;
  newUser: User = {
    userid: '',
    uname: '',
    email: '',
    upassword: '',
    urole: ''
  };
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.retrieveUsers();
  }

  retrieveUsers(): void {
    this.userService.getAllUsersService()
      .subscribe({
        next: (data: User[]) => {
          this.users = data;
          console.log('Users retrieved:', data);
        },
        error: (e) => console.error('Error retrieving users', e)
      });
  }

  editUser(user: User): void {
    this.newUser = { ...user };
    this.isEditing = true;
    this.showForm = true;
  }

  onAddUser(): void {
    if (this.isEditing) {
      this.userService.updateUserService(this.newUser)
        .subscribe({
          next: (updatedUser: User) => {
            const index = this.users.findIndex(u => u.userid === updatedUser.userid);
            if (index !== -1) {
              this.users[index] = updatedUser;
            }
            console.log('User updated:', updatedUser);

            this.resetForm();
          },
          error: (e) => console.error('Error updating user', e)
        });
    } else {
      this.userService.addUserService(this.newUser)
        .subscribe({
          next: (addedUser: User) => {
            this.users.push(addedUser);
            console.log('User added:', addedUser);

            this.resetForm();
          },
          error: (e) => console.error('Error adding user', e)
        });
    }
  }

  deleteUser(userid: string): void {
    this.userService.deleteUserService(userid)
      .subscribe({
        next: () => {
          this.users = this.users.filter(user => user.userid !== userid);
          console.log('User deleted:', userid);
        },
        error: (e) => console.error('Error deleting user', e)
      });
  }

  resetForm(): void {
    this.newUser = { userid: '', uname: '', email: '', upassword: '', urole: '' };
    this.showForm = false;
    this.isEditing = false;
  }
}
