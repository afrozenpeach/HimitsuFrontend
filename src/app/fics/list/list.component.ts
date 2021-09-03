import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MysqlService } from 'src/app/services/mysql.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  fics = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['title', 'author', 'date', 'mainCharacters', 'summary'];

  constructor(private mysql: MysqlService) { }

  ngAfterViewInit(): void {
    this.getFics();
  }

  public doGlobalFilter = (event: Event) => {
    this.fics.filterPredicate = (data, filter) => {
        const dataStr = Object.keys(data).reduce((currentTerm, key) => (
            currentTerm + data[key] + '◬'
        ), '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
    };

    this.fics.filter = (event.target as HTMLInputElement).value.trim().toLocaleLowerCase();
  };

  public doTitleFilter = (event: Event) => {
    this.fics.filterPredicate = (data, filter) => (data.title?.toLocaleLowerCase().includes(filter));

    this.fics.filter = (event.target as HTMLInputElement).value.trim().toLocaleLowerCase();
  };

  public doAuthorFilter = (event: Event) => {
    this.fics.filterPredicate = (data, filter) => (data.author?.toLocaleLowerCase().includes(filter));

    this.fics.filter = (event.target as HTMLInputElement).value.trim().toLocaleLowerCase();
  };

  public doMainCharactersFilter = (event: Event) => {
    this.fics.filterPredicate = (data, filter) => (data.mainchars?.toLocaleLowerCase().includes(filter));

    this.fics.filter = (event.target as HTMLInputElement).value.trim().toLocaleLowerCase();
  };

  public doSummaryFilter = (event: Event) => {
    this.fics.filterPredicate = (data, filter) => (data.summary?.toLocaleLowerCase().includes(filter));

    this.fics.filter = (event.target as HTMLInputElement).value.trim().toLocaleLowerCase();
  };

  public getDate(year, month, day) {
    return new Date(year + '/' + month + '/' + day).toLocaleDateString();
  }

  private getFics() {
    this.mysql.getFics().then((response: any) => {
      this.fics = new MatTableDataSource<any>(response);
      this.fics.paginator = this.paginator;
      this.fics.sort = this.sort;
    });
  }

}
