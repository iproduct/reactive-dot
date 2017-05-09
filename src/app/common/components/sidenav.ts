import { Component, Input } from '@angular/core';

@Component({
  selector: 'rd-sidenav',
  template: `
    <md-sidenav [opened]="open" [mode]="mode">
      <md-nav-list>
        <ng-content></ng-content>
      </md-nav-list>
    </md-sidenav>
  `,
  styles: [`
    md-sidenav {
      width: 300px;
    }
  `]
})
export class SidenavComponent {
  @Input() open = false;
  @Input() mode = 'side';
}
