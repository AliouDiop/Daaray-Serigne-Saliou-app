import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-orphelin',
  templateUrl: './orphelin.component.html',
  styleUrls: ['./orphelin.component.scss']
})
export class OrphelinComponent implements OnInit {
  registrationForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

}
