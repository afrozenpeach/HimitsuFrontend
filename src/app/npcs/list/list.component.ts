import { Component, OnInit } from '@angular/core';
import { MysqlService } from 'src/app/services/mysql.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  npcs: any[] = [];

  constructor(private mysql: MysqlService) { }

  ngOnInit(): void {
    this.getNPCs();
  }

  private getNPCs() {
    this.mysql.getNPCs().then((response: any) => {
      this.npcs = response;
    });
  }

}
