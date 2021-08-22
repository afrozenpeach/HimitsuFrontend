import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MysqlService } from '../services/mysql.service';
import { toHTML } from 'discord-markdown';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class MessagesComponent implements OnInit {

  messages: any[] = [];

  private channel: any;
  private channels = {
    '737358686967693313': 'main-plot-discussion',
    '737359478378463324': 'forest-nobles-discussion',
    '737359557705072660': 'floran-court-discussion',
    '737359591737917471': 'hanalan-commons-discussion',
    '737360129090912326': 'kanemoria-general-discussion',
    '737359694947024896': 'atsiria-general-discussion',
    '737360162821636228': 'kanemoria-fayre-discussion',
    '737363943890354236': 'north-dentoria-and-frostlands-discussion',
    '737364007626997813': 'east-and-west-dentoria-discussion',
    '737363825224974346': 'korin-discussion',
    '737364105949741077': 'eblar-and-southern-dentoria-discussion'
  };

  constructor(
    private mysql: MysqlService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.channel = params.channel;

      this.mysql.getChannels(undefined).then((response: any) => {
        response.forEach(c => {
          Object.defineProperty(this.channels, c[3], { value: {name: c[2], id: c[0]}, writable: false });
        });

        this.getMessages(this.channel);
      });
    });
  }

  private getMessages(channel) {
    const vm = this;

    this.mysql.getMessages(channel).then((response: any) => {
      this.messages = response;

      this.messages.forEach(m => {
        m[3] = toHTML(m[3], {
          discordCallback: {
            channel: node => {
              if (typeof vm.channels[node.id] === 'object') {
                return '<a href="/channel/' + vm.channels[node.id].id + '">#' + vm.channels[node.id].name + '</a>';
              } else {
                return '<a href="https://discord.com/channels/737344328581513268/' + node.id + '">#' + vm.channels[node.id] + '</a>';
              }
            }
          },
          cssModuleNames: {}
        });
      });
    });
  }

}
