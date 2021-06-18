/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const isApiKey = (apiKey: string): boolean => /\d{4}-\d{4}-\d{4}-\d{4}/.test(apiKey)
export const isUID = (uid: string): boolean => /\d{3,}/.test(uid)
