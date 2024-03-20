import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-large-button',
  template: `
    <button class="large-button">
      <ng-content></ng-content>
    </button>
    `,
  styles: [`
    .large-button {
      width: 5em;
      height: 3em;
      border: none;
      border-radius: 3px;
      color: #023047;
      font-weight: bolder;
    }

    .large-button:hover {
      color: #c7c7c7;
    }
  `]
})
export class LargeButtonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
