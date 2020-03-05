import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {AlertController, MenuController, ModalController} from '@ionic/angular';
import {LoginPage} from '../login/login.page';
import {ToastService} from '../services/toast.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {VendorRegistrationModule} from '../vendor-registration/vendor-registration.module';
import {UpdateaddressPage} from '../address/updateaddress/updateaddress.page';

@Component({
    selector: 'app-slide-menu',
    templateUrl: './slide-menu.component.html',
    styleUrls: ['./slide-menu.component.scss'],
})
export class SlideMenuComponent implements OnInit {
    @Input() menuId: string;
    @Input() contentId: string;

    defaultPhoto = '../../assets/img/avatar.png';

    get user() {
        return this.userService.user;
    }

    get afUser() {
        return this.afAuth.auth.currentUser;
    }

    constructor(private userService: UserService,
                private router: Router,
                private menu: MenuController,
                private toastService: ToastService,
                private afAuth: AngularFireAuth,
                private modalController: ModalController,
                private alertController: AlertController) {
    }

    ngOnInit() {
        this.menu.enable(true, 'first').then(r => {
        });
    }

    async toLogin() {
        const modal = await this.modalController.create({
            component: LoginPage,
            cssClass: 'medium-modal'
        });
        return await modal.present();
    }

    verifyEmail() {
        this.userService.verifyEmail().then(() => {
            this.toastService.presentToast('email send successfully', 2000).then(r => {
            }).then(() => {
                console.log('this.verifyEmail().then.then() trigged');
            });
        }).catch(() => {
        });
    }

    toLogout() {
        this.userService.logout();
        this.jump('');
    }

    jump(path: string) {
        this.router.navigate([path]).then(() => {
        });
    }

    vendor(event: CustomEvent) {
        if (this.userService.vendorView) {
            this.userService.vendorView = false;
            this.jump('/dashboard');
            return;
        }
        if (this.userService.isVendor) {
            this.userService.vendorView = true;
            this.jump('/vendor-page');
        } else {
            this.handleButtonClick(
                () => {
                    console.log('agree');
                    this.jump('/vendor-registration');
                },
                () => {
                    console.log('disagree');
                });
        }
    }

    async updateAddress() {
        const modal = await this.modalController.create({
            component: UpdateaddressPage
        });
        modal.onDidDismiss().then((data) => {
            console.log('dissmisss');
            console.log(data);
        });
        return await modal.present();
    }

    async handleButtonClick(agree, disagree) {
        const alert = await this.alertController.create({
            header: 'You are not a vendor',
            message: 'Do you want to register as a Vendor?',
            buttons: [{
                text: 'Agree',
                role: 'agree',
                handler: agree
            }
                , {
                    text: 'Disgree',
                    role: 'Disgree',
                    handler: disagree
                }]
        });

        await alert.present();
    }


}
