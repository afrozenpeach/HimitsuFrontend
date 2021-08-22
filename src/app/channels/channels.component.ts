import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MysqlService } from '../services/mysql.service';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {

  channels: any[] = [];

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

  private getChannels(category) {
    this.mysql.getChannels(category).then((response: any) => {
      this.channels = response;
    });
  }

}
