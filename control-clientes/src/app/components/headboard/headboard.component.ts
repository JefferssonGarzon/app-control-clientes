import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-headboard',
  templateUrl: './headboard.component.html',
  styleUrls: ['./headboard.component.css']
})
export class HeadboardComponent implements OnInit {

  isMenuCollapsed:boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
