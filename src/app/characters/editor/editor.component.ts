import { Component, OnInit, Type } from '@angular/core';
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

  countries = ['Atsiria', 'Dentoria', 'Hanalan', 'Kanemoria', 'Kilia', 'Korin', 'Megam', 'Romani'].sort();
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novemeber', 'December'];
  zodiacs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
  bloodtypes = ['A', 'AB', 'B', 'B-', 'B+', 'O'].sort();
  players = ['Elzie', 'Elaine', 'Frozen', 'Playerless', 'Meg', 'Rosa', 'Sara', 'Nineveh', 'Dots', 'Mike', 'Silvie', 'Vicki'].sort();
  cupsizes = ['A', 'B', 'C', 'D', 'N/A', 'DD'].sort();
  domhands = ['Right', 'Left', 'Mixed', 'Ambidextrous'];
  orientations = ['Bicurious', 'Straight', 'Gay', 'Bi', 'Asexual', 'Undecided', 'Unknown', 'Bisexual'].sort();
  genders = ['F', 'M', 'N'].sort();
  statuses = ['Normal', 'Dead', 'Missing', 'Incapacitated'].sort();
  sects = ['Unknown', 'Neutral', 'Pillar of Light', 'Messenger of Darkness', 'Silent One'].sort();

  constructor(
    private mysql: MysqlService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(params => {
        this.characterId = params.get('character');
        this.character = {
          picture: null,
          name: null,
          nickname1: null,
          nickname2: null,
          journal: null,
          jobs: null,
          subjobs: null,
          socialclass: null,
          country: null,
          hometown: null,
          house: null,
          birthmonth: null,
          birthdate: null,
          year: null,
          zodiac: null,
          bloodtype: null,
          sect: null,
          status: null,
          player: null,
          queued: null,
          adoptable: null,
          haircolor: null,
          eyecolor: null,
          heightfeet: null,
          heightinches: null,
          heightcms: null,
          build: null,
          skintone: null,
          cupsize: null,
          domhand: null,
          identifiers: null,
          class: null,
          pastclasses: null,
          mountcombat: null,
          orientation: null,
          noncombat: null,
          gender: null,
          // eslint-disable-next-line @typescript-eslint/naming-convention
          Special: ''
        };
      });

    if (this.characterId !== 'new') {
      this.getCharacter();
    }
  }

  public getRoute(charType) {
    if (charType === 'pc') {
      return 'characters';
    } else {
      return 'npcs';
    }
  }

  public saveCharacter() {
    if (this.character.queued) {
      this.character.queued = 1;
    } else {
      this.character.queued = 0;
    }

    if (this.character.adoptable) {
      this.character.adoptable = 1;
    } else {
      this.character.adoptable = 0;
    }

    if (this.character.mountcombat) {
      this.character.mountcombat = 1;
    } else {
      this.character.mountcombat = 0;
    }

    if (this.characterId === 'new') {
      this.mysql.postCharacter(this.character)
      .then(r => {
        window.location.href = '/characters/' + r;
      })
      .catch(theError => {
        console.log({error: theError, character: this.character});
        let message = theError?.error?.details[0]?.message;

        if (!message) {
          message = theError.error;
        }

        alert('Error saving: ' + message);
      });
    } else {
      this.mysql.putCharacter(this.characterId, this.character)
      .then(() => {
        window.location.href = '/characters/' + this.characterId;
      })
      .catch(theError => {
        console.log({error: theError, character: this.character});
        let message = theError?.error?.details[0]?.message;

        if (!message) {
          message = theError.error;
        }

        alert('Error saving: ' + message);
      });
    }
  }

  public cancelChanges() {
    if (this.characterId === 'new') {
      window.location.href = '/characters';
    } else {
      window.location.href = '/characters/' + this.characterId;
    }
  }

  private getCharacter() {
    this.mysql.getCharacter(this.characterId).then((response: any) => {
      this.character = response;
    });
  }
}
