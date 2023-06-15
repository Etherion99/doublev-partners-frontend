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

  searchUsers(login: string) {
    return this.http.get(`${this.API}/search/users?q=${login}&per_page=${this.limit}`);
  }

  async getUser(login: string) {
    return await lastValueFrom(this.http.get(`${this.API}/users/${login}`));
  }

  async getUserRepos(login: string) {
    return await lastValueFrom(this.http.get(`${this.API}/users/${login}/repos?per_page=${this.limit}`));
  }
}
