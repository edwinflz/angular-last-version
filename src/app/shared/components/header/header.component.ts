import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from '@enums/routes.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  imgLogo: string = 'assets/images/svg/logoEplus.svg';
  imgUserDefault: string = 'assets/images/svg/user.svg';

  constructor(
    private router: Router
  ) {}

  redirectHome(): void {
    this.router.navigate([AppRoutes.HOME]);
  }
}
