import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private API: string = 'https://api.github.com';
  private limit: number = 10;

  constructor(private http: HttpClient) {}

  searchUsers(username: string) {
    return this.http.get(`${this.API}/search/users?q=${username}&per_page=${this.limit}`);
  }

  async getUser(username: string) {
    return await lastValueFrom(this.http.get(`${this.API}/users/${username}`));
  }
}
