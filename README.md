# Mixmax-Quote-Slash-Command
Created a slash command for Mixmax that attaches a random quote to your email.

## Running locally

1. Ensure that you have git and node (>=0.12) installed on your system
2. ``` git clone https://github.com/KatyayniG/Mixmax-Quote-Slash-Command.git```
3. Inside the directory, run npm install and then npm start. You shouldn’t see any errors and it should say ```[nodemon] starting `node server.js```
4. Back in Gmail, click the Settings and More link to access the Mixmax Dashboard
5. Click Integrations in the left sidebar
6. Click Add Slash Command and enter the following values:
```
Input Name  | Value
----------- | -----------
Name        | Launch Quote Generator
Command     | quote
Parameter   | [Launch]
Typeahead API URL |	http://localhost:9145/typeahead
Resolver API URL  |	http://localhost:9145/resolver
```

Restart Chrome and follow the directions here: http://sdk.mixmax.com/docs/chrome-insecure-content-https-request-blocked-when-developing-locally 
