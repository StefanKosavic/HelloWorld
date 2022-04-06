The goal of this assignment is to implement a simple Node.js WEB-based application that provides the various translations of ‘Hello World’ string.
The application should support the following functionalities (ordered from basic to complex):

1. Simple Node.js web application using Express.

2. Has /hello-rest REST endpoint which returns a simple JSON with message ‘Hello World’ string.

3. Has /hello endpoint which returns a HTML page with ‘Hello World’ string displayed as ‘h1’ title.

4. Has in-memory loki.js database started with initial set of 10 different strings per language (‘Hello World’ in 10 different languages) and 
 /hello, /hello-rest endpoints return the string determined by language parameter passed inside the query (if no language param in query – default to English)

5. Has /secure/hello endpoint that requires user to log in with username and password

6. Has a secured ‘Admin’ page that allows the user to add new Language-Message pairs into the database

7. Uses a standalone DB instead of in-memory (loki.js) DB
