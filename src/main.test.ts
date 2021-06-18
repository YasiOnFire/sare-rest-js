import { SareClient } from './main'
import { ERROR_MESSAGES } from './types/errors.enum';

describe('CORE TESTS', () => {
  it('SareClient should be defined', () => {
    expect(SareClient).toBeDefined()
  });
  
  it('should construct SareClient instance', () => {
    const sc = new SareClient({
      apiKey: '4321-4321-4321-4321',
      uid: '3001'
    })
    expect(sc.apiKey).toBe('4321-4321-4321-4321')
    expect(sc.uid).toBe('3001')
  });


  it('should throw ApiKey Error on set', () => {
    const sc = new SareClient({
      apiKey: '4321-4321-4321-4321',
      uid: '3001'
    })
    
    expect(() => {sc.apiKey = 'asdfasdf'}).toThrowError(ERROR_MESSAGES.INAVALID_API_KEY_FORMAT)
  });

  it('should set new apiKey', () => {
    const sc = new SareClient({
      apiKey: '4321-4321-4321-4321',
      uid: '3001'
    })
    sc.apiKey = '1234-1234-1234-1234'
    expect(sc.apiKey).toBe('1234-1234-1234-1234')
  });

  
  it('should throw UID Error on set', () => {
    const sc = new SareClient({
      apiKey: '4321-4321-4321-4321',
      uid: '3001'
    })
    
    expect(() => {sc.uid = "0"}).toThrowError(ERROR_MESSAGES.INAVALID_UID_FORMAT)
  });

  it('should set new UID', () => {
    const sc = new SareClient({
      apiKey: '4321-4321-4321-4321',
      uid: '3001'
    })
    sc.uid = '2001'
    expect(sc.uid).toBe('2001')
  });
})
