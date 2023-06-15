import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { forbidenWordValidator } from 'src/app/shared/validators/forbidenWordValidator';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.sass']
})
export class ExplorerComponent {
  searchTextControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    forbidenWordValidator('doublevpartners')
  ]);
}
