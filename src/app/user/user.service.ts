import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:8080/user'; // Adjust if necessary

  constructor(private httpClient: HttpClient) { }

  // Get all users
  public getAllUsersService(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.url);
  }

  // Add a new user
  public addUserService(user: User): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.httpClient.post<User>(this.url, user, { headers });
  }

  // Update an existing user
  public updateUserService(user: User): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.httpClient.put<User>(`${this.url}/${user.userid}`, user, { headers });
  }

  // Delete an existing user
  public deleteUserService(userid: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/${userid}`);
  }
}
