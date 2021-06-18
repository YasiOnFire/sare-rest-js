/**
 * This file is the entrypoint of browser builds.
 * The code executes when loaded in a browser.
 */
import * as sareRest from './main'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).sareRest = sareRest 
