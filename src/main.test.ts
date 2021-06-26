import 'dotenv/config'
import { SareClient } from './main'
import { ERROR_MESSAGES } from './types/errors.enum';

describe('CORE TESTS', () => {
  it('SareClient should be defined', () => {
    expect(SareClient).toBeDefined()
  });
  
  it('should construct SareClient instance', () => {
    const sc = new SareClient({
      apiKey: '12345678-4321-4321-4321-123456789012',
      uid: (process.env.UID as string)
    })
    expect(sc.apiKey).toBe('12345678-4321-4321-4321-123456789012')
    expect(sc.uid).toBe((process.env.UID as string))
  });
  
  it('should throw on invalid apikey on SareClient instance construct', () => {
    expect(() => {
      new SareClient({
        apiKey: '12345678-4321-4321-4321-12345678901',
        uid: (process.env.UID as string)
      })
    }).toThrowError(ERROR_MESSAGES.INAVALID_API_KEY_FORMAT)
  });

  it('should throw on invalid uid on SareClient instance construct', () => {
    expect(() => {
      new SareClient({
        apiKey: '12345678-4321-4321-4321-123456789012',
        uid: '0'
      })
    }).toThrowError(ERROR_MESSAGES.INAVALID_UID_FORMAT)
  });

  it('should throw ApiKey Error on set', () => {
    const sc = new SareClient({
      apiKey: '12345678-4321-4321-4321-123456789012',
      uid: (process.env.UID as string)
    })
    
    expect(() => {sc.apiKey = 'asdfasdf'}).toThrowError(ERROR_MESSAGES.INAVALID_API_KEY_FORMAT)
  });

  it('should set new apiKey', () => {
    const sc = new SareClient({
      apiKey: '12345678-4321-4321-4321-123456789012',
      uid: (process.env.UID as string)
    })
    sc.apiKey = '87654321-4321-4321-4321-210987654321'
    expect(sc.apiKey).toBe('87654321-4321-4321-4321-210987654321')
  });

  
  it('should throw UID Error on set', () => {
    const sc = new SareClient({
      apiKey: '12345678-4321-4321-4321-123456789012',
      uid: (process.env.UID as string)
    })
    
    expect(() => {sc.uid = "0"}).toThrowError(ERROR_MESSAGES.INAVALID_UID_FORMAT)
  });

  it('should set new UID', () => {
    const sc = new SareClient({
      apiKey: '12345678-4321-4321-4321-123456789012',
      uid: (process.env.UID as string)
    })
    sc.uid = '2001'
    expect(sc.uid).toBe('2001')
  });

  it('should throw uri Error on set', () => {
    const sc = new SareClient({
      apiKey: '12345678-4321-4321-4321-123456789012',
      uid: (process.env.UID as string)
    })
    
    expect(() => {sc.uri = "www.invalid.com"}).toThrowError(ERROR_MESSAGES.INAVALID_URI_FORMAT)
  });

  it('should set new URI without slash', () => {
    const sc = new SareClient({
      apiKey: '12345678-4321-4321-4321-123456789012',
      uid: (process.env.UID as string)
    })
    sc.uri = 'https://s10.sare.pl/'
    expect(sc.uri).toBe('https://s10.sare.pl')
  });

  it('should set new URI', () => {
    const sc = new SareClient({
      apiKey: '12345678-4321-4321-4321-123456789012',
      uid: (process.env.UID as string)
    })
    sc.uri = 'https://s10.sare.pl'
    expect(sc.uri).toBe('https://s10.sare.pl')
  });
})
describe('GET EMAIL DATA', () => {
  let sc: SareClient
  beforeEach(() => {
    sc = new SareClient({
      apiKey: (process.env.API_KEY as string),
      uid: (process.env.UID as string)
    })
  })
  it('should throw on invalid email', () => {
    return expect(sc.getEmailData('test')).rejects.toThrow()
  })
  it('should throw on email non existent', () => {
    return expect(sc.getEmailData('none@none.com')).rejects.toThrow()
  })
  it('should read email data', () => {
    return sc.getEmailData('test@sare.pl').then(data => {
      expect((data as unknown as Record<string, unknown>).code).toBe(200)
    })
  })
})

describe('ADD/UPDATE EMAIL DATA', () => {
  let sc: SareClient
  beforeEach(() => {
    sc = new SareClient({
      apiKey: (process.env.API_KEY as string),
      uid: (process.env.UID as string)
    })
  })
  it('should throw on no emails', () => {
    return expect(sc.addOrUpdateEmail({
      emails: []
    })).rejects.toThrow()
  })
  it('should throw on invalid email', () => {
    return expect(sc.addOrUpdateEmail({
      emails: [{email:'test'}]
    })).rejects.toThrow()
  })
  it('should add/update email data', () => {
    return sc.addOrUpdateEmail({
      // only_add_to_groups: true,
      update_on_duplicate: true,
      update_status_on_duplicate: true,
      emails: [{
        email: 'test@sare.pl',
        status: 8,
        mail_type: ["HTML", 'text'],
        groups: [1,21,341]
      }]
    }).then(data => {
      expect((data as unknown as Record<string, unknown>).code).toBe(200)
    })
  })
})
