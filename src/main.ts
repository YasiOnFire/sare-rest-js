import { ERROR_MESSAGES } from "./types/errors.enum"
import { SareClientOptions } from "./types/sare-client-options.type"
import { isApiKey, isEmail, isUID, isURI } from "./utils/validations"
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"
import { AddEmailDTO } from "./types/add-email.dto"

export class SareClient {
  private _apiKey: string
  private _uid: string
  private _uri = 'https://s.enewsletter.pl/api/v1/'
  private _instance!: AxiosInstance
  private _defaultHeaders: AxiosRequestConfig["headers"] = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
  
  constructor(opts: SareClientOptions) {
    if (!isApiKey(opts.apiKey)) throw new Error(ERROR_MESSAGES.INAVALID_API_KEY_FORMAT)
    if (!isUID(opts.uid)) throw new Error(ERROR_MESSAGES.INAVALID_UID_FORMAT)
    
    this._apiKey = opts.apiKey
    this._uid = opts.uid
    this._uri = opts.uri || this._uri

    this.setup()
  }

  public get apiKey() : string {
    return this._apiKey
  }
  
  public set apiKey(apiKey : string) {
    if (!isApiKey(apiKey)) throw new Error(ERROR_MESSAGES.INAVALID_API_KEY_FORMAT)
    this._apiKey = apiKey
    this.setup()
  }
  
  public get uid() : string {
    return this._uid
  }
  
  public set uid(uid : string) {
    if (!isUID(uid)) throw new Error(ERROR_MESSAGES.INAVALID_UID_FORMAT)
    this._uid = uid
    this.setup()
  }
  
  public get uri() : string {
    return this._uri
  }
  
  public set uri(uri : string) {
    if (!isURI(uri)) throw new Error(ERROR_MESSAGES.INAVALID_URI_FORMAT)
    this._uri = uri.substr(-1) !== '/' ? uri : uri.substring(0, uri.length - 1)
    this.setup()
  }

  private setup(): void {
    this._instance = axios.create({
      baseURL: `${this._uri}${this._uid}`,
      headers: {
        ...this._defaultHeaders,
        'ApiKey': this._apiKey
      }
    })
  }
  
  /**
   * Retrieve email data
   * @param email
   */
  public async getEmailData(email: string): Promise<AxiosResponse<unknown>> {
    if (!isEmail(email)) throw new Error(ERROR_MESSAGES.INAVALID_EMAIL_FORMAT)
    try {
      const { data } = await this._instance.get(`/email/by_email/${email}`)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  /**
   * Adds/Updates email and props to SARE account
   * @param payload
   */
  public async addOrUpdateEmail(payload: AddEmailDTO): Promise<AxiosResponse<unknown>> {
    if (!payload.emails || payload.emails.find(e => !isEmail(e.email))) throw new Error(ERROR_MESSAGES.INAVALID_EMAIL_FORMAT)
    try {
      const { data } = await this._instance.post(`/email/add`, payload)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }
}
