export interface SareClientOptions {
  /**
   * SARE account ID
   */
  uid: string;
  /**
   * Account API-KEY
   * @see https://dev.sare.pl/rest-api/other/index.html
   */
  apiKey: string;
  /**
   * SARE API URI
   * @default https://s.enewsletter.pl/api/v1/
   */
  uri?: string;
}
