import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll() {
    return this.db.list('/categories', (ref) => ref.orderByChild('name')).snapshotChanges().pipe(
      map(results => results.map(result => {
        const value: any = result.payload.val();
        const key = result.payload.key;
        return { ...value, key }
      })),
    );
  }
}
