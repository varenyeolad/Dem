import { Component, Input } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-small-button',
  template: `
    <button class="small-button" [type]="type" [disabled]="disabled">
      <ng-content></ng-content>
    </button>
    `,
  styles: [`
    .small-button {
      height: 2em;
      border: none;
      border-radius: 3px;
      background: none;
      color: white;
      font-weight: bolder;
    }

    .small-button:hover {
      color: #c7c7c7;
    }
  `]
})
export class SmallButtonComponent {

  @Input()
  type!: string;
  @Input()
  disabled!: boolean | null;

}
