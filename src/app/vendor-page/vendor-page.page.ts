import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {ToastService} from '../services/toast.service';
import {VendorService} from '../services/vendor.service';
import {FilterService} from '../services/filter.service';
import {TypePage} from '../dashboard/type/type.page';
import {PricePage} from '../dashboard/price/price.page';
import {OrderService} from '../services/order.service';
import {OrderRequest} from '../classes/spec/order-request';
import {OrderStatus} from '../classes/order-status';
import {Order} from '../classes/order';
import {RequestDetailsPage} from './request-details/request-details.page';

@Component({
    selector: 'app-vendor-page',
    templateUrl: './vendor-page.page.html',
    styleUrls: ['./vendor-page.page.scss'],
})
export class VendorPagePage implements OnInit {
    filterRequest: OrderRequest;

    constructor(private modalController: ModalController,
                private toastService: ToastService,
                private vendorService: VendorService,
                private filterService: FilterService,
                private orderService: OrderService) {
        this.filterRequest = new OrderRequest();
        // plz review OrderRequest, there shows some specification
    }

    get requests() {
        return this.orderService.orders;
        // return this.filterService.getVendorList();
    }

    getOrders(status: OrderStatus) {
        this.filterRequest.status = status;
        this.orderService.getOrders(this.filterRequest);
    }

    ngOnInit() {
        this.getOrders(OrderStatus.Biding);
    }

    async typeModal() {
        const modal = await this.modalController.create({
            component: TypePage
        });
        return await modal.present();
    }

    async priceModal() {
        const modal = await this.modalController.create({
            component: PricePage
        });
        return await modal.present();
    }

    doRefresh(event) {
        this.getOrders(OrderStatus.Biding);
        setTimeout(() => {
            this.toastService.presentToast('updated', 2000).then(() => {
            });
            event.target.complete();
        }, 1000);
    }

    doSearch(event) {
        this.toastService.presentToast('your input: ' + event.target.value, 2000).then(() => {
        });
    }


    async requestDetailsModal(event, request) {
        console.log(request);
        const modal = await this.modalController.create({
            component: RequestDetailsPage,
            componentProps: {
                request
            }
        });
        modal.onDidDismiss().then((data) => {
            console.log(data);
            if (data.data) {
                this.getOrders(OrderStatus.Biding);
            }
        });
        return await modal.present();
    }

    public get_best_bid(order: Order): number {
        if (order.bids && order.bids.length) {
            const best = order.bids
                .map(x => x.price)
                .reduce((acc, cv) => {
                    return acc < cv ? acc : cv;
                }, Number.POSITIVE_INFINITY);
            return best;
        }
        return 0;
    }
}
