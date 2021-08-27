import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MysqlService } from 'src/app/services/mysql.service';
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

  public doFilter = (event: Event) => {
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
