import { Component, OnInit } from '@angular/core';
import { MysqlService } from '../../services/mysql/mysql.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth/auth.service';

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
    private authService: AuthService,
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

  public getRoute(charType) {
    if (charType === 'pc') {
      return 'characters';
    } else {
      return 'npcs';
    }
  }

  public canEdit() {
    return this.authService.hasValidToken();
  }

  private getCharacter() {
    this.mysql.getCharacter(this.characterId).then((response: any) => {
      this.character = response;

      if (this.character.noncombat) {
        this.character.noncombat = this.sanitizer.bypassSecurityTrustHtml(this.character.noncombat);
      }

      if (this.character.identifiers) {
        this.character.identifiers = this.sanitizer.bypassSecurityTrustHtml(this.character.identifiers);
      }
    });
  }

}
