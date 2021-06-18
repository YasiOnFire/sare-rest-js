import { ERROR_MESSAGES } from "./types/errors.enum";
import { SareClientOptions } from "./types/sare-client-options.type";
import { isApiKey, isUID } from "./utils/validations";

export class SareClient {
  private _apiKey: string
  private _uid: string
  private _userAgent = 'sare/sdk;js'

  constructor(opts: SareClientOptions) {
    if (!isApiKey(opts.apiKey)) throw new Error(ERROR_MESSAGES.INAVALID_API_KEY_FORMAT)
    if (!isUID(opts.uid)) throw new Error(ERROR_MESSAGES.INAVALID_UID_FORMAT)

    this._apiKey = opts.apiKey
    this._uid = opts.uid

    this.setup()
  }

  public get apiKey() : string {
    return this._apiKey
  }
  
  public set apiKey(apiKey : string) {
    if (!isApiKey(apiKey)) throw new Error(ERROR_MESSAGES.INAVALID_API_KEY_FORMAT)
    this._apiKey = apiKey;
  }
  
  public get uid() : string {
    return this._uid
  }
  
  public set uid(uid : string) {
    if (!isUID(uid)) throw new Error(ERROR_MESSAGES.INAVALID_UID_FORMAT)
    this._uid = uid;
  }
  
  public get userAgent() : string {
    return this._userAgent
  }
  
  public set userAgent(_userAgent : string) {
    this._userAgent = _userAgent;
  }

  public setup(): void {
    console.log('setup');
  }
  
  
}
