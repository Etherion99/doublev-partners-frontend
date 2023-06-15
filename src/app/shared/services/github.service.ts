import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private API = 'https://api.github.com';

  constructor(private http: HttpClient) {}

  searchUsers(username: string) {
    return this.http.get(`${this.API}/search/users?q=${username}`);
  }

  getUser(username: string) {
    return this.http.get(`${this.API}/users/${username}`);
  }
}
