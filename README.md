## Getting Started
---
## Project Title - # DocsBuilder
---
## Project Description

**1. Objective**

 A web-based application to create legal and official documents based on predesigned templates. The convenience provided is unprecedented as the users will have the ability to create a well formatted document just by filling in a few minor and essential details. The application will boast of features like version control to track changes made to the document and revert back to an older version if needed.
 
**2. Description**

Creating documents has always been a painstaking task but at the same time it is something that is done by everybody on almost a regular basis. In almost every type of document, the format remains more or less the same and there are only a few details that need to be changed and for those few details most of the people create their documents from scratch. Secondly, most of the people don't understand the minute details of documents. So, it will be very helpful if we could provide them with a simple solution. Doc builder is a modest attempt in that direction.

The core of every document is made of a static part, which by its very nature remains unchanged for everyone. The other part, which can be called the dynamic part, is susceptible to change. It is the static part that we are targeting. The information needed to be filled in the dynamic part is collected through a simple and interactive query form. The query form then sends this data to the backend logic which affixes them to their predefined positions, using XML Parsing, to create a well formatted document. The interactive query form also hides the subtleties of the document which is to be created and help users concentrate their attention to the really needed details. The feature of saving the changes made allow users to track important changes made to their documents (an example could be a change in the rent in a rent agreement)

In short, Doc Builder is a web-based application which consists of a collection of templates of various documents ranging from a simple leave application to a sophisticate legal documentation. The users are not bothered with a lot of technical and legal jargons. They will be prompted to fill in a simple form about their personal details and some specifics needed for the creation of the very document they demand. The simple form presented is all that is needed to create a well formatted document of any type. The application also features a way to track changes made to a particular document (saved as different versions of the document) and roll back any change that is erroneously made. The application can be used conveniently by any individual or corporate and can be fine-tuned according to their need.

## Prerequisites

* `node`, `npm`, `mongodb` installed into local pc
*  Any Browser (Google Chrome)
*  An account on Cloudinary for image upload
*  Any Text Editor for code editing

## Installing

1. Clone project from github.
    For example :-   
    Open terminal or cmd prompt   
    ```git
    git clone https://github.com/kundan048/docbuilder.git
    ```
    after downloading type   
    `cd docbuilder`
2. Install node module type 
    `npm install`   
3. Now Create `.env` file (for external mongodb link or cloudinary images) and add these details
    CODE = external_mongo_link   
    mailPass = mail_password_for_nodemailer   
    CLOUDINARY_NAME = check_account_for_name   
    CLOUDINARY_KEY = check_account_for_key   
    CLOUDINARY_SECRET = check_account_for_secret    
    
4. Save it and Open `app.js` file and check port number
   ```javascript
   app.listen(process.env.PORT || 3000, function(){
    console.log(`Server is listening on 3000`);
   });
   ```
   (if you want to run on different port change 3000 to some other port).
5. Now Open terminal or cmd prompt from docbuilder folder
6. Run app 
   ```node app.js```   
7. Open Browser and navigate to [localhost:3000](localhost:3000)


**Structure of Program**
```
Tools-
          Frontend: HTML, CSS, Bootstrap, JavaScript.
	        Backend: Node.js 
	        Database: MongoDB
	        Frontend libraries: JQuery, EJS.
          Backend libraries: Express.js, Mongoose, Passport, Passport-local, Passport-local-mongoose.
          Server: Heroku (Cloud Application Platform)

Software Requirements -
          Text editor either Notepad or Sublime Text
          Web browsers (Google Chrome, Internet Explorer, Mozilla Firefox)
```
**Future Scope of Project**

The development of this project surely prompts many new areas of investigation. The application can be enhanced further by adding the feature of user customized documents. Document auto generation can be added by web data extraction (web scraping) and user request. A rating mechanism can be devised to help users get the highest rated template of any document. Speech recognition APIs can be used to increase user convenience and speed of document generation.

# Thank You

[Visit Website](https://docsbuilder.herokuapp.com/)
![Image](https://docsbuilder.herokuapp.com/img/portfolio-3.jpg)

