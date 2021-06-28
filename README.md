# SARE Rest API - JavaScript Wrapper

## Installation
```bash
yarn add sare-rest-js # or npm i sare-rest-js
```

```javascript
const { SareClient } = require('sare-rest-js')
// or
import { SareClient } from 'sare-rest-js'
```

or include from cdn:
```html
<script src="https://cdn.sareapps.pl/sare-rest.min.js">
```
### Methods
- addOrUpdateEmail(payload: AddEmailDTO): Promise<any>
  - Adds/Updates email and props to SARE account
- getEmailData(email: string): Promise<any>
  - Retrieve email data from db

## Documentation
- 

## Usage

```javascript
// create SareClient instance
const sareClient = new SareClient({
  apiKey: 'b462eef0-d84d-11eb-b8bc-0242ac130003', // your API KEY
  uid: '12345', // your SARE User ID
  // optional
  // uri: 'https://s.enewsletter.pl/api/v1/'
})
```

```javascript
// get lead data from db
sareClient.getEmailData('test@example.com')
  .then(data => {
    console.log(data)
  })
  .catch(err => {
    console.error(err)
  })


// add/update leads with data
sareClient.addOrUpdateEmail({
    emails: [{
      email: 'test@example.com',
      status: 8,
      mail_type: ["HTML", 'text'],
      groups: [1,21,341]
    }]
  })
  .then(data => {
    console.log(data)
  })
  .catch(err => {
    console.error(err)
  })
```

### Resources
- [Knowledge base](https://sare.pl/baza-wiedzy/)


---
See more at [sare.pl](https://sare.pl)
