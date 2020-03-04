import {HttpParams} from '@angular/common/http';

export class BidRequest {
    uid: number;
    orderId: number;
    priceMin: number;
    priceMax: number;
    // from 0 to max, 0 was the first page
    page: number;
    size: number;
    // for example sort=["id,asc","price,desc"]
    sort: string[];

    toParam(): HttpParams {
        const params = new HttpParams();
        Object.entries(this).forEach(
            ([key, value]) => params.set(key, value)
        );
        return params;
    }
}