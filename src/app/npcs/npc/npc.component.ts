import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MysqlService } from 'src/app/services/mysql.service';

@Component({
  selector: 'app-npc',
  templateUrl: './npc.component.html',
  styleUrls: ['./npc.component.scss']
})
export class NpcComponent implements OnInit {

  npc: any;
  npcId: any;

  constructor(
    private mysql: MysqlService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(params => {
        this.npcId = params.get('npc');
      }
    );

    this.getNPC();
  }

  private getNPC() {
    this.mysql.getNPC(this.npcId).then((response: any) => {
      this.npc = response;
      if (this.npc.npcNotes) {
        this.npc.npcNotes = this.sanitizer.bypassSecurityTrustHtml(this.npc.npcNotes);
      }
    });
  }

}
