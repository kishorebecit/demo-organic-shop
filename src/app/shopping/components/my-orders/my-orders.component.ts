import { AuthService } from '../../../shared/services/auth.service';
import { OrderService } from '../../../shared/services/order.service';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
  orders$;

  constructor(private orderService: OrderService, private authService: AuthService) {

    this.orders$ = this.authService.user$.pipe(
      switchMap(user => orderService.getOrdersByUser(user.uid))
    );
  }

  ngOnInit(): void {
  }

}
