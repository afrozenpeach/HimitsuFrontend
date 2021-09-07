import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { AuthConfig, OAuthModule, OAuthModuleConfig, OAuthStorage } from 'angular-oauth2-oidc';
import { AuthGuard } from '../services/auth-guard/auth-guard.service';
import { AuthService } from '../services/auth/auth.service';

// We need a factory since localStorage is not available at AOT build time
export const storageFactory = () => localStorage;

const config: AuthConfig = {
  issuer: 'https://fusionauth.host.lgbt',
  clientId: '16b8edab-5a96-4b6d-a9fc-89e2f4ab3f5a',
  dummyClientSecret: 'Ov6s8-R0tExARstW7Lmu0kuthASoTZNiPlHPL53mXZw',
  redirectUri: window.location.origin,
  logoutUrl: 'TODO/v2/logout?returnTo=' + encodeURIComponent(window.location.origin),
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
  scope: 'openid profile email',
  responseType: 'code'
};

config.logoutUrl = `${config.issuer}v2/logout?client_id=${config.clientId}&returnTo=${encodeURIComponent(config.redirectUri)}`;

const authModuleConfig: OAuthModuleConfig = {
  // Inject "Authorization: Bearer ..." header for these APIs:
  resourceServer: {
    allowedUrls: ['https://fusionauth.host.lgbt'],
    sendAccessToken: true,
  },
};

@NgModule({
  imports: [
    HttpClientModule,
    OAuthModule.forRoot(),
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
})
export class AuthModule {

  constructor(@Optional() @SkipSelf() parentModule: AuthModule) {
    if (parentModule) {
      throw new Error('AuthModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        { provide: AuthConfig, useValue: config },
        { provide: OAuthModuleConfig, useValue: authModuleConfig },
        { provide: OAuthStorage, useFactory: storageFactory },
      ]
    };
  }

}
