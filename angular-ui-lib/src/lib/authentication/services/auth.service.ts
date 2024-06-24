import { FetchTokenConfig, Token, User, UserGrant } from './auth.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { URI, URIAdmin, URIEnums } from '@atlas/globals';
import { catchError, firstValueFrom, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #http = inject(HttpClient);
  #isAuthenticated = signal(false);
  #currentUser = signal<User>({} as User);
  #serviceAccess = signal<UserGrant[]>([]);

  readonly isAuthenticated = computed(() => this.#isAuthenticated());
  readonly currentUser = computed(() => this.#currentUser());
  readonly serviceAccess = computed(() => this.#serviceAccess());

  fetchAdminToken(params: FetchTokenConfig): () => Promise<any> {
    const authToken = localStorage.getItem('access_token');
    if (authToken) {
      const jwt = authToken?.split('.')[1];
      const decodeToken = JSON.parse(atob(jwt || ''));
      //decode jwt token
      if (decodeToken.exp) {
        const tokenExpiresDate = new Date(parseInt(decodeToken.exp) * 1000);
        const currentDate = new Date();
        if (currentDate > tokenExpiresDate) {
          console.debug('Token expired, fetching new token');
          localStorage.removeItem('access_token');
          this.#isAuthenticated.set(false);
          this.#currentUser.set({} as User);
          this.#serviceAccess.set([]);
        }
      }
    }

    const headers = new HttpHeaders({
      'Authorization': 'Basic YXRsYXMtdGVzdC1hZG1pbjpseWxwak1jakN5QUs1bnRTZG84SGMxSXZ2VEFzVkQzWHo4bnFyZDdQNGl5UnVqaE82S3NiT2kxbHVPTlV1YWY2',
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const body = new HttpParams()
      .set('grant_type', 'client_credentials')
      .set(
        'scope',
        `openid email urn:zitadel:iam:user:resourceowner urn:zitadel:iam:org:project:id:${params.atlas_iam_project_id}:aud urn:zitadel:iam:org:project:id:${params.atlas_deploy_project_id}:aud urn:zitadel:iam:org:project:id:${params.atlas_chronicle_iam_project_id}:aud urn:zitadel:iam:org:projects:roles urn:zitadel:iam:user:metadata`
      );
    if (authToken) {
      return () => new Promise<void>((resolve) => resolve());
    } else {
      return () =>
        firstValueFrom(this.#http.post<Token>(`${URIAdmin(URIEnums.INTERNAL_TEST_CLUSTER_US)}`, body.toString(), { headers })).then(
          (token) => {
            localStorage.setItem('access_token', token.access_token);
          }
        );
    }
  }

  fetchCurrentUser(): Promise<User> {
    const authToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'x-atlas-authorization': `Bearer ${authToken}`,
      'content-type': 'application/json',
    });

    return firstValueFrom(
      this.#http.get<User>(`${URI(URIEnums.INTERNAL_TEST_CLUSTER_US)}iam/me`, { headers }).pipe(
        catchError((error) => throwError(() => error)),
        tap((user) => {
          this.#currentUser.set(user);
          this.#isAuthenticated.set(true);
          this.#serviceAccess.set(user.grants);
        })
      )
    );
  }
}
