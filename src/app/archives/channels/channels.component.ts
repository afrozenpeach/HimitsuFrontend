import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { MysqlService } from '../../services/mysql.service';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {

  channels = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['date', 'location', 'characters'];

  category: any;

  constructor(
    private mysql: MysqlService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.category = params.category;

      this.getChannels(this.category);
    });
  }

  public doGlobalFilter = (event: Event) => {
    this.channels.filterPredicate = (data, filter) => {
        const dataStr = Object.keys(data).reduce((currentTerm, key) => (
            currentTerm + data[key] + '◬'
        ), '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
    };

    this.channels.filter = (event.target as HTMLInputElement).value.trim().toLocaleLowerCase();
  };

  public doCharacterFilter = (event: Event) => {
    this.channels.filterPredicate = (data, filter) => (data.characters?.join()?.toLocaleLowerCase().includes(filter));

    this.channels.filter = (event.target as HTMLInputElement).value.trim().toLocaleLowerCase();
  };

  public doLocationFilter = (event: Event) => {
    this.channels.filterPredicate = (data, filter) => (data.location?.toLocaleLowerCase().includes(filter));

    this.channels.filter = (event.target as HTMLInputElement).value.trim().toLocaleLowerCase();
  };

  private getChannels(category) {
    this.mysql.getChannels(category).then((response: any) => {
      this.channels = new MatTableDataSource<any>(response);
    });
  }

}
