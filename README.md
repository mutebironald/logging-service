**\# Candidate Assessment: Logging HTTP Web Service Development \#\# Objective** 

Design and implement an HTTP web service for logging, integrating with a PostgreSQL database. The service should include user registration, authentication, log submission, and reporting capabilities. 

**\#\# Requirements** 

**\#\#\# Endpoints** 

1\. **\*\*Registration\*\*** 

\- **\*\*Purpose\*\***: Create a new user account in the database. 

\- **\*\*Request\*\***: 

\- Content type: \`application/json\` 

\- Data type: 

\<pre\> 

type RegistrationRequest \= { 

// The email of the user. 

email: string; 

// The password of the user. 

password: string 

} 

\</pre\> 

\- **\*\*Response\*\***: 

\- Status: 200 on success 

2\. **\*\*Authentication\*\*** 

\- **\*\*Purpose\*\***: Verify user credentials and grant access if valid. \- **\*\*Implementation\*\***: Authentication mechanism of you choice (e.g. JWT, cookies). \- **\*\*Request\*\***: 

\- Content type: \`application/json\` 

\- Data type: 

\<pre\> 

type AuthenticationRequest \= { 

// The email of the user. 

email: string; 

// The password of the user. 

password: string 

} 

\</pre\> 

\- **\*\*Response\*\***:  
\- Status: 200 on success 

3\. **\*\*Send Log\*\*** 

\- **\*\*Purpose\*\***: Receive and store log messages (user, timestamp, level, text, has HTTP localhost URLs). 

\- **\*\*Access\*\***: Authenticated users only. 

\- **\*\*Request\*\***: 

\- Maximum size: 5 megabytes 

\- Content type: \`application/json\` 

\- Data type: 

\<pre\> 

type LogLevel \= "info" | "warning" | "error"; 

type LogMessage \= { 

// The date and time of the log message. 

timestamp: string; 

// The level of the log message. 

level: LogLevel; 

// The text of the log message. 

text: string 

}; 

type SendLogRequest \= Array\<LogMessage\>; 

\</pre\> 

\- Each request may contain one or more log messages 

\- The service should identify log messages containing HTTP localhost URLs \- The average log message size is around 100 kilobytes 

\- **\*\*Response\*\***: 

\- Status: 200 on success 

4\. **\*\*Reporting\*\***: 

\- **\*\*Purpose\*\***: Generate a report on logs within a specified period. \- **\*\*Access\*\***: Authenticated admin users only. 

\- **\*\*Request\*\***: 

\- Content type: \`application/json\` 

\- Data type: 

\<pre\> 

type ReportingRequest \= { 

// The start date (including) of the period. 

startDate?: string; 

// The end date (including) of the period. 

endDate?: string 

} 

\</pre\> 

\- **\*\*Response\*\***: 

\- Content type: \`application/json\` 

\- Data type:  
\<pre\> 

type ReportingResponse \= { 

// The start date of the period. 

startDate?: string; 

// The end date of the period. 

endDate?: string; 

// The count of 'warning' log messages in the period. 

warningCount: number; 

// The count of 'error' log messages in the period. 

errorCount: number; 

// The count of log messages with HTTP localhost URLs in the period. 

messageWithUrlCount: number 

} 

\</pre\> 

\- Status: 200 on success 

**\#\#\# Additional Considerations:** 

\- Encoding: \`UTF-8\` 

\- Database: \`PostgreSQL\` 

\- Date/Time format: As specified here 

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global\_Objects/Date\# date\_time\_string\_format. 

\- The platform/language is any of: 

\- \`Node.js/TypeScript\` 

\- \`NET/C\#\` 

\- \`Rust\` 

**\#\#\# Optionals (if you feel challenged not enough):** 

\- Create a Docker compose/Podman Quadlet file(s) for the web service and the database \- Create an implementation of the web service in different languages and compare them (upsides/downsides) 

**\#\#\# Evaluation Criteria:** 

\- Correctness and completeness of implementation 

\- Code quality and organization 

\- Efficiency and performance 

\- Error handling and security 

\- Adherence to best practices 

\- Documentation and clarity  
**\#\#\# Submission:** 

Candidates should provide the following: 

\- Source code 

\- Instructions for setup and execution 

\- Any relevant documentation or explanations 

**\*\*Note\*\***: This assessment is designed to evaluate your development skills and problem-solving abilities. Feel free to make reasonable assumptions and demonstrate your proficiency in building robust and scalable web services. 

**\*\*Good luck\!\*\***
