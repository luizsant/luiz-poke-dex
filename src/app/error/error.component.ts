import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent implements OnInit {
  hasError: boolean = false;

  handleError() {
    this.hasError = true;
  }
  constructor() {}
  reloadPage() {
    window.location.reload();
  }
  ngOnInit(): void {}
}
