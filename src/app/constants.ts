import { environment } from 'src/environments/environment';

export class Constants {
  public static clientRoot = environment.clientRoot; // 'http://localhost:4200/';

  public static apiRoot = environment.apiUrl; // 'https://localhost:44392/';
  public static stsAuthority = environment.stsUrl; // 'https://localhost:5001';
  public static clientId = 'bikestoreclient';
}
