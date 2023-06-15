import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { GithubService } from 'src/app/shared/services/github.service';
import { forbidenWordValidator } from 'src/app/shared/validators/forbidenWordValidator';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.sass']
})
export class ExplorerComponent {
  searchTextControl = new FormControl('etherion', [
    Validators.required,
    Validators.minLength(4),
    forbidenWordValidator('doublevpartners')
  ]);

  users: any[] = [];

  constructor(
    private readonly githubService: GithubService
  ) {
    this.search();
  }

  search() {
    console.log('searching', this.searchTextControl.valid);
    if(this.searchTextControl.valid) {
      this.githubService.searchUsers(this.searchTextControl.value || '').subscribe((data: any) => {
        this.users = data['items'];
        console.log(this.users[4]);
      });
    }    
  }
}
