const axios = require('axios');
const fs    = require('fs');

const usersApiUrl = 'https://jsonplaceholder.typicode.com/users';
const postsApiUrl = 'https://jsonplaceholder.typicode.com/posts';
const fileName = 'users.html';


// Fetch from both endpoints
Promise.all([axios.get(usersApiUrl), axios.get(postsApiUrl)]).then((result)=>{

  let users = result[0].data;
  let posts = result[1].data;
  
  let usersTable = buildTable('Users', users , [ 'name', 'username' , 'email' ,'phone' ]);
  let postsTable = buildTable('Posts', posts , [ 'title', 'body']);

  let header = `<link rel="stylesheet" type="text/css" href="style.css">
    <title> Task 01 </title>`;


  fs.writeFile(fileName, buildHtml(header, usersTable+postsTable), function(err) {
    if(err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  }); 

}).catch( (error)=>{
  console.log('There was a problem! Please try again');
})


function buildHtml(header,body) {

  return `
<!DOCTYPE html>
<html>
  <head>
    ${header}
  </head>
  <body>
    ${body}
  </body>
</html>`.trim();

}


function buildTable( name, data, columns){ 

  //Indention on html tags may be a little bit confusing. It is for more readeble html file.

  let header = '';
  let body   = '';

  for( let col of columns){
    header += `
          <th>${col}</th>`;
  }


  for( let datum of data ){

    body += `
        <tr>`;

    for(let col of columns){

      if( typeof datum[col] !== 'undefined' ){
        body+= `
          <td> ${datum[col]}</td>`;
      }
    }

    body += `
        </tr>`;
    
  }

  return  `
    <h2>${name}</h2>
    <table>
      <thead>
        <tr>${header}
        </tr>
      </thead>
      <tbody>${body}
      </tbody>
    </table>`
}