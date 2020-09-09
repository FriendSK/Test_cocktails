import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SVG_ICONS } from '../../app/app.config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  svgIconPath1: string = SVG_ICONS.cocktailTitle;
  svgIconPath2: string = SVG_ICONS.cocktail;
}
