import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  // Fix typo here
})
export class LoginComponent {
  title = 'Welcome to Angular!';
  onButtonClick() { console.log("Event binding"); }
  imageUrl = 'https://angular.io/assets/images/logos/angular/angular.png';
  userName = 'root';
}

