import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hospital-tools';

  highlight: string = '';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router) { }

  ngOnInit(): void {
    this.route('');
  }

  route(path: string): void {
    this.router.navigate([path]);
    this.highlight = path;
  }
}
