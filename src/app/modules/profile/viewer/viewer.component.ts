import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GithubService } from 'src/app/shared/services/github.service';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.sass']
})
export class ViewerComponent implements OnInit {
  userData: any = {};
  reposList: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private readonly githubService: GithubService
  ) { }

  ngOnInit(): void {
    const login = this.route.snapshot.paramMap.get('login') || '';

    this.githubService.getUser(login).then(user => {
      this.userData = user;
    }).catch(error => {
      console.log(error);
    });

    this.githubService.getUserRepos(login).then(repos => {
      this.reposList = repos as any[];
    })
  }
}
