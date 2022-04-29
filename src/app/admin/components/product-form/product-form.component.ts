import { ProductService } from '../../../shared/services/product.service';
import { CategoryService } from '../../../shared/services/category.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product: any = {};
  productId: string;

  constructor(
    categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.categories$ = categoryService.getAll();
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) this.productService.get(this.productId).pipe(take(1)).subscribe(p => {
      this.product = p;
    });
  }

  ngOnInit(): void {
  }

  save(product: any) {
    console.log('Product', product);
    if (this.productId) {
      this.productService.update(this.productId, product)
    } else {
      this.productService.create(product);
    }
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?'))  return;

    this.productService.delete(this.productId);
    this.router.navigate(['/admin/products']);
  }

}
