import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorage } from 'ngx-webstorage';
import { TypePropertyLocalStorage } from '@enums/localstorage.enum';
import { AppRoutes } from '@enums/routes.enum';
import { TokenAuth } from '@interfaces/authentication.interface';
import { User } from '@interfaces/user.interface';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginModalComponent {

  @LocalStorage(TypePropertyLocalStorage.ENLACE_TOKEN) private _token!: TokenAuth | null;
  @LocalStorage(TypePropertyLocalStorage.USER) user!: User | null;

  constructor(private activeModal: NgbActiveModal, private router: Router) { }

  dismiss(): void {
    this.activeModal.dismiss();
  }

  redirectToLogin(): void {
    this._token = null;
    this.user = null;
    this.router.navigate([AppRoutes.AUTH]);
    this.dismiss();
  }

}
