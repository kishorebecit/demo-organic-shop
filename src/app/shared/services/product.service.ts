import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product);
  }

  getAll(): Observable<Product[]> {
    return this.db.list('/products').snapshotChanges().pipe(
      map(results => results.map(result => {
        const value: any = result.payload.val();
        const key = result.payload.key;
        return { ...value, key }
      })),
    );
  }
  get(id: string) {
    return this.db.object('/products/' + id).valueChanges().pipe(
      tap(product => console.log('Product details', product))
    );
  }

  update(productId: string, product: any) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId: string) {
    return this.db.object('/products/' + productId).remove();
  }
}
