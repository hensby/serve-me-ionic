import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {VendorOrderPage} from './vendor-order.page';
import {RouterModule} from '@angular/router';
import {BidPipe} from '../pipes/bid.pipe';
import {BidingComponent} from './biding/biding.component';
import {CompletedComponent} from './completed/completed.component';
import {PendingComponent} from './pending/pending.component';
import {ProgressingComponent} from './progressing/progressing.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([{path: '', component: VendorOrderPage}])
    ],
    declarations: [
        VendorOrderPage,
        BidPipe,
        BidingComponent,
        CompletedComponent,
        PendingComponent,
        ProgressingComponent,
    ]
})
export class VendorOrderPageModule {
}