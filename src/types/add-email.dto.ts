export interface AddEmailDTO {
  /**
   * @description
   * if set to true, does not move leads to a new group(s), but rather adds to it
   * @default false
   */
  only_add_to_groups?: boolean
  /**
   * @description
   * if set to true, will update lead data if already in db
   * @default false
   */
  update_on_duplicate?: boolean
  /**
   * @description
   * if set to true, will update lead status if already in db
   * @default false
   */
  update_status_on_duplicate?: boolean
  /**
   * @description
   * if set to true, will send confirmation email
   * @default false
   */
  send_confirmation?: boolean
  emails: Email[]
}

export interface Email {
  email: string
  /**
   * @description
   * required if no email provided
   * should include prefix
   */
  gsm?: string
  /**
   * @description
   * 2 - Removed manually
   * 3 - Removed automatically
   * 4 - Remove requested
   * 5 - Not verified
   * 6 - Not confirmed
   * 7 - Blocked
   * 8 - Confirmed
   * @default 6
   * @see https://sare.pl/baza-wiedzy/2018/04/16/adresy-rodzaje-statusow/
   */
  status?: 2 | 3 | 4 | 5 | 6 | 7 | 8
  /**
   * @description
   * group numbers to add/move to
   */
  groups?: number[]
  name?: string
  /**
   * Used to assign different communication scenarios
   * @see https://sare.pl/baza-wiedzy/2017/04/04/do-czego-sluza-scenariusze-subskrypcji/
   */
  interface?: number
  mail_type?: ["text" | "HTML", ("text" | "HTML")?]
  comment?: string
  prop?: {
    prop1?: string
    prop2?: string
    prop3?: string
    prop4?: string
    prop5?: string
    prop6?: string
    prop7?: string
    prop8?: string
    prop9?: string
  }
  /**
   * @see https://sare.pl/baza-wiedzy/2018/03/15/personalizacja/
   */
  prop_cust?: Record<string, unknown>
}
