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

  public doGlobalFilter = (event: Event) => {
    this.characters.filterPredicate = (data, filter) => {
        const dataStr = Object.keys(data).reduce((currentTerm, key) => (
            currentTerm + data[key] + '◬'
        ), '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
    };

    this.characters.filter = (event.target as HTMLInputElement).value.trim().toLocaleLowerCase();
  };

  public doCharacterNameFilter = (event: Event) => {
    this.characters.filterPredicate = (data, filter) => (data.name?.toLocaleLowerCase().includes(filter));

    this.characters.filter = (event.target as HTMLInputElement).value.trim().toLocaleLowerCase();
  };

  public doPlayerFilter = (event: Event) => {
    this.characters.filterPredicate = (data, filter) => (data.player?.toLocaleLowerCase().includes(filter));

    this.characters.filter = (event.target as HTMLInputElement).value.trim().toLocaleLowerCase();
  };

  public doHometownFilter = (event: Event) => {
    this.characters.filterPredicate = (data, filter) => (
      data.hometown.toLocaleLowerCase().includes(filter) || data.country?.toLocaleLowerCase().includes(filter)
    );

    this.characters.filter = (event.target as HTMLInputElement).value.trim().toLocaleLowerCase();
  };

  public doHouseFilter = (event: Event) => {
    this.characters.filterPredicate = (data, filter) => (data.house?.toLocaleLowerCase().includes(filter));

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
