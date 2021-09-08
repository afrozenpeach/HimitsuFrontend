import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MysqlService } from 'src/app/services/mysql/mysql.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  public character: any;
  public characterId: any;

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

  public getRoute(charType) {
    if (charType === 'pc') {
      return 'characters';
    } else {
      return 'npcs';
    }
  }

  public saveCharacter() {
    this.mysql.putCharacter(this.characterId, this.character)
    .then(() => {
      window.location.href = '/characters/' + this.characterId;
    })
    .catch(error => {
      console.log(error);
      console.log(this.character);
      alert('Error saving: ' + error.error.details[0].message);
    });
  }

  public cancelChanges() {
    window.location.href = '/characters/' + this.characterId;
  }

  private getCharacter() {
    this.mysql.getCharacter(this.characterId).then((response: any) => {
      this.character = response;
    });
  }
}
