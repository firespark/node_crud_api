# CRUD API
Simple CRUD API implementation with typescript

### Usage 
#### Clone this repository
    git clone https://github.com/firespark/node_crud_api.git
#### Change branch if you on Main branch
    git checkout node_crud_api
#### Install dependencies
    npm install
#### Choose way to run
##### In development mode
    npm run start:dev
##### In production mode
    npm run start:prod
##### Test scenarios
    npm test
##### Run with clusters
    npm run start:multi

### API
- **GET** `api/users` is used to get all persons
- **GET** `api/users/{userId}` 
- **POST** `api/users` is used to create record about new user and store it in database
- **PUT** `api/users/{userId}` is used to update existing user
- **DELETE** `api/users/{userId}` is used to delete existing user from database

### User
```typescript
    type User = {
      id?: string,
      username: string,
      age: number,
      hobbies: Array<string>
    }
```