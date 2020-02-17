import {Component, OnInit} from '@angular/core';
import {OrderService} from '../services/order.service';
import {Order} from '../classes/order';
import {OrderStatus} from '../classes/order-status';
import {ToastService} from '../services/toast.service';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.page.html',
    styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

    orders: Order[];

    constructor(private orderService: OrderService,
                private toastService: ToastService) {
    }

    ngOnInit() {
        this.getOrders(OrderStatus.waiting);
    }

    getOrders(status: OrderStatus) {
        this.orders = this.orderService.getOrders(status);
    }

    segmentChanged(ev: any) {
        this.getOrders(ev.detail.value as OrderStatus);
    }

    doRefresh(event) {
        setTimeout(() => {
            this.toastService.presentToast('updated', 2000).then(() => {
            });
            event.target.complete();
        }, 1000);
    }
}
