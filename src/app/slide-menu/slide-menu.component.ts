import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {MenuController, ModalController} from '@ionic/angular';
import {LoginPage} from '../login/login.page';
import {RegisterPage} from '../register/register.page';

@Component({
    selector: 'app-slide-menu',
    templateUrl: './slide-menu.component.html',
    styleUrls: ['./slide-menu.component.scss'],
})
export class SlideMenuComponent implements OnInit {

    menuPages = [
        {
            title: 'Dashboard',
            url: '/dashboard',
            icon: 'home-outline'
        },
        {
            title: 'Profile',
            url: '/profile',
            icon: 'person-outline'
        },
        {
            title: 'Orders',
            url: '/orders',
            icon: 'clipboard-outline'
        },
        {
            title: 'Settings',
            url: '/settings',
            icon: 'settings-outline'
        }
    ];

    get user() {
        return this.userService.user;
    }

    constructor(private userService: UserService,
                private router: Router,
                private menu: MenuController,
                private modalController: ModalController) {
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

    async toRegister() {
        const modal = await this.modalController.create({
            component: RegisterPage,
            cssClass: 'medium-modal'
        });
        return await modal.present();
    }

    toLogout() {
        this.userService.logout();
    }
}