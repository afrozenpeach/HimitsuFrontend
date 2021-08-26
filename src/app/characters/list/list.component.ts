import { Component, OnInit } from '@angular/core';
import { MysqlService } from '../../services/mysql.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  characters: any[] = [];

  constructor(private mysql: MysqlService) { }

  ngOnInit(): void {
    this.getCharacters();
  }

  private getCharacters() {
    this.mysql.getCharacters().then((response: any) => {
      this.characters = response;
    });
  }

}
