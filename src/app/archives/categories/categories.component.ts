import { Component, OnInit } from '@angular/core';
import { MysqlService } from '../../services/mysql.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories: any[] = [];

  constructor(private mysql: MysqlService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories() {
    this.mysql.getCategories().then((response: any) => {
      this.categories = response;
    });
  }

}
