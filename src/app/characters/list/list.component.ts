import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MysqlService } from '../../services/mysql.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  characters = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['icon', 'name', 'nicknames', 'journal', 'player', 'status', 'sect', 'hometown', 'house'];

  constructor(private mysql: MysqlService) { }

  ngAfterViewInit(): void {
    this.getCharacters();
  }

  public doFilter = (event: Event) => {
    this.characters.filter = (event.target as HTMLInputElement).value.trim().toLocaleLowerCase();
  };

  private getCharacters() {
    this.mysql.getCharacters().then((response: any) => {
      this.characters = new MatTableDataSource<any>(response);
      this.characters.paginator = this.paginator;
      this.characters.sort = this.sort;
    });
  }

}
