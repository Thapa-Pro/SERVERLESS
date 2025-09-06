# top10Books
✅ Steps Done Here:

Project Setup

Created project folder with serverless.yml, functions/, data/, responses/.

Installed Serverless Framework.

Configured AWS role (BasicLambdaRole4BookAPI) with correct permissions.

Data Layer

data/index.mjs → holds the in-memory array of books (id, title, author, year, genre).

Helper for Responses

responses/index.mjs → has sendResponse(status, data) function.

This ensures all functions return same format (statusCode, body).

Implemented Lambda Functions

GetBooks → returns the entire book list.

GetBookById → fetches a single book by id.

PostBook → adds a new book (reads JSON body, pushes into array).

DeleteBook → removes a book by id.

Connected via Serverless Framework

serverless.yml maps each function to API Gateway route:

GET /api/books → GetBooks

GET /api/books/{id} → GetBookById

POST /api/books → PostBook

DELETE /api/books/{id} → DeleteBook

Deployment

Ran serverless deploy successfully → created Lambda functions and API Gateway automatically in AWS.

Testing with Insomnia

Verified all endpoints:

List books

Get by ID

Add new book

Delete book

Responses returned in consistent JSON format.
