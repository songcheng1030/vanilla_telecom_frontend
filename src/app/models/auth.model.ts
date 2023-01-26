export class AuthModel {
  access_token: string;
  expires_at: string;
  session_id: string;

  setAuth(auth: any) {
    this.access_token = auth.access_token;
    this.expires_at = auth.expires_at;
    this.session_id = auth.session_id;
  }
}
