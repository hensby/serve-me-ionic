import {Component, OnInit} from '@angular/core';
import {VersionService} from '../services/version.service';
import {ToastService} from "../services/toast.service";

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
    get shouldUpdate(): boolean {
        return this.versionService.shouldUpdate;
    }

    notify = false;
    vibrate = false;
    autoCheck = false;

    constructor(private versionService: VersionService,
                private toastService: ToastService) {
    }

    ngOnInit() {
    }

    appUpdate() {
        this.versionService.checkAppUpdate();
    }

    notifyToggle() {
        this.notify = !this.notify;
        this.toastService.presentToast('Notification ' + (this.notify ? 'enable' : 'disable') + ' successfully', 2000).then(r => {
        });
    }

    vibrateToggle() {
        this.vibrate = !this.vibrate;
        this.toastService.presentToast('Vibration ' + (this.vibrate ? 'enable' : 'disable') + ' successfully', 2000).then(r => {
        });
    }

    autoCheckToggle() {
        this.autoCheck = !this.autoCheck;
        this.toastService.presentToast('AutoCheckUpdate ' + (this.autoCheck ? 'enable' : 'disable') + ' successfully', 2000).then(r => {
        });
    }
}
