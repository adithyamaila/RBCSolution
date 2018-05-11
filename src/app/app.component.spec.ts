import { TestBed, async } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { UsersService } from './users.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { User, Address } from './user.model';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        UsersService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  describe('validateNewUser - Test city is unique', function() {
    it('should return true when city is unique', async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();

      app.users = [new User(new Address('Toronto'), 'DeadPool', 'DeadPool@pool.com')];
      app.users.push(new User(new Address('Gotham'), 'Batman', 'batman@pool.com'));
      app.users.push(new User(new Address('Crypton'), 'Superman', 'Superman@pool.com'));
      expect(app.validateNewUser({name: 'abc', email: 'abc@pool.com', city: 'NY' })).toBeTruthy();
    }));
    it('should return false when city is not unique', async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();

      app.users = [new User(new Address('Toronto'), 'DeadPool', 'DeadPool@pool.com')];
      app.users.push(new User(new Address('Gotham'), 'Batman', 'batman@pool.com'));
      app.users.push(new User(new Address('Crypton'), 'Superman', 'Superman@pool.com'));
      expect(app.validateNewUser({name: 'Crypton', email: 'abc@pool.com', city: 'Crypton' })).toBeFalsy();

    }));
  });
});
