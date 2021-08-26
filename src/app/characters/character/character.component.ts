import { Component, OnInit } from '@angular/core';
import { MysqlService } from '../../services/mysql.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  character: any;
  characterId: any;

  constructor(
    private mysql: MysqlService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(params => {
        this.characterId = params.get('character');
      }
    );

    this.getCharacter();
  }

  private getCharacter() {
    this.mysql.getCharacter(this.characterId).then((response: any) => {
      this.character = response;
      this.character.noncombat = this.sanitizer.bypassSecurityTrustHtml(this.character.noncombat);
    });
  }

}
