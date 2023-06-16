import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GithubService } from 'src/app/shared/services/github.service';
import { forbidenWordValidator } from 'src/app/shared/validators/forbidenWordValidator';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.sass']
})
export class ExplorerComponent {
  searchTextControl = new FormControl('', [
    Validators.minLength(4),
    forbidenWordValidator('doublevpartners')
  ]);

  users: any[] = [];

  chartConfig = {
    showXAxis: true,
    showYAxis: true,
    showLegend: true,
    showXAxisLabel: true,
    xAxisLabel: 'Usuario',
    showYAxisLabel: true,
    yAxisLabel: 'Seguidores'
  };

  chartView: [number, number] = [800, 400];
  chartData: any[] = [];

  constructor(
    private readonly githubService: GithubService,
    private router: Router
  ) {

  }

  search() {
    if (this.searchTextControl.valid) {
      this.githubService.searchUsers(this.searchTextControl.value || '').subscribe((data: any) => {
        this.users = data['items'].map((item: any) => {
          item['score'] = Math.floor(Math.random() * (50 - 20 + 1)) + 20;
          return item;
        });

        this.getUsersFollowers();
      });
    } else {
      this.users = [];
      this.chartData = [];
    }
  };

  async getUsersFollowers() {
    this.users = await Promise.all(this.users.map(async user => {
      const userData: any = await this.githubService.getUser(user.login);
      user['followers'] = userData['followers'];

      return user;
    }));

    this.createFollowersChart();
  }

  createFollowersChart() {
    this.chartData = this.users.map(user => ({
      name: user.login,
      value: user.followers
    }));
  }

  openViewer(user: any) {
    this.router.navigateByUrl(`/profile/viewer/${user.login}?score=${user.score}`);
  }
}