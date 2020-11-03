import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MysqlService } from './mysql.service';

describe('MysqlService', () => {
  let service: MysqlService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(MysqlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
