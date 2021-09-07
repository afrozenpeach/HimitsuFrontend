import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MysqlService } from 'src/app/services/mysql/mysql.service';
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

  npcs = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['npcName', 'npcStatus', 'npcSect', 'npcCity'];

  constructor(private mysql: MysqlService) { }

  ngAfterViewInit(): void {
    this.getNPCs();
  }

  public doGlobalFilter = (event: Event) => {
    this.npcs.filterPredicate = (data, filter) => {
        const dataStr = Object.keys(data).reduce((currentTerm, key) => (
            currentTerm + data[key] + '◬'
        ), '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
    };

    this.npcs.filter = (event.target as HTMLInputElement).value.trim().toLocaleLowerCase();
  };

  public doNameFilter = (event: Event) => {
    this.npcs.filterPredicate = (data, filter) => (data.npcName?.toLocaleLowerCase().includes(filter));

    this.npcs.filter = (event.target as HTMLInputElement).value.trim().toLocaleLowerCase();
  };

  public doStatusFilter = (event: Event) => {
    this.npcs.filterPredicate = (data, filter) => (data.npcStatus?.toLocaleLowerCase().includes(filter));

    this.npcs.filter = (event.target as HTMLInputElement).value.trim().toLocaleLowerCase();
  };

  public doSectFilter = (event: Event) => {
    this.npcs.filterPredicate = (data, filter) => (data.npcSect?.toLocaleLowerCase().includes(filter));

    this.npcs.filter = (event.target as HTMLInputElement).value.trim().toLocaleLowerCase();
  };

  public doHometownFilter = (event: Event) => {
    this.npcs.filterPredicate = (data, filter) => (
      data.npcCity?.toLocaleLowerCase().includes(filter) || data.npcCountry?.toLocaleLowerCase().includes(filter)
    );

    this.npcs.filter = (event.target as HTMLInputElement).value.trim().toLocaleLowerCase();
  };

  private getNPCs() {
    this.mysql.getNPCs().then((response: any) => {
      this.npcs = new MatTableDataSource<any>(response);
      this.npcs.paginator = this.paginator;
      this.npcs.sort = this.sort;
    });
  }

}
