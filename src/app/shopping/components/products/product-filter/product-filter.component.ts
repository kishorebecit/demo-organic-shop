import { CategoryService } from '../../../../shared/services/category.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent {
  categories$;
  @Input('selectedCategory') selectedCategory;

  constructor(categoryService: CategoryService) {
    this.categories$ = categoryService.getAll();
  }

}
