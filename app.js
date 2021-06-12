const inquirer = require("inquirer");
const fs = require("fs");
const engineer = require("./library/engineer");
const intern = require("./library/intern");
const manager = require("./library/manager");


const employees = [];

function initApp(){
    startHtml();
    addMember();
};

function addMember(){
    inquirer.prompt([{
       
        
        message: "enter team memeber name",
        name: "name",
    },

    {
        type: "list",
        message: "select the members role",
        choices: [
            "engineer",
            "intern",
            "manager"
        ],
        name: "role"
    },

    {
        message: "enter members id",
        name: "id"
    },
        
    {
        message: "enter members email",
        name: "email"
    },
        
    ])

    .then(function({name, role, id, email}){
        let roleInfo = "";
        if(role === 'engineer') { 
            roleInfo = "github username";
            } else if (role === 'intern') {
                roleInfo = "school name";

            }else {
                roleInfo = "office number"
            }
        
        inquirer.prompt([{
            message: `enter members ${roleInfo}`,
            name: 'roleInfo'
        },
        {
            type: "list",
            message: "would you like to add new members?",
            choices: [
                "yes",
                "no"
            ],
            name: "moreMembers"
        }
    ])
    .then(function({roleInfo, moreMembers}) {
        let newMember;
        if(role === "engineer") {
            newMember = new engineer(name, id, email, roleInfo);
        } else if(role === "intern") {
            newMember = new intern(name, id, email, roleInfo);
        } else {
            newMember = new manager(name, id, email, roleInfo);
        }
        employees.push(newMember);
        addHtml(newMember)
        .then(function() {
            if (moreMembers === "yes"){
                addMember();
            } else {
                finishHtml();
            }
        })
    })

    })
}

function startHtml() {
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" >
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" >
        <title>Team Profile</title>
    </head>
    <body>
        <nav class="navbar navbar-dark bg-dark mb-5">
            <span class="navbar-brand mb-0 h1 w-100 text-center">Team Profile</span>
        </nav>
        <div class="container">
            <div class="row">`;
    fs.writeFile("./output/team.html", html, function(err) {
        if (err) {
            console.log(err);
        }
    });
    console.log("start");
}

function addHtml(member) {
    return new Promise(function(resolve, reject) {
        const name = member.getName();
        const role = member.getRole();
        const id = member.getId();
        const email = member.getEmail();
        let data = "";
        if (role === "Engineer") {
            const gitHub = member.getGithub();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Engineer</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">GitHub: ${gitHub}</li>
            </ul>
            </div>
        </div>`;
        } else if (role === "Intern") {
            const school = member.getSchool();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Intern</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">School: ${school}</li>
            </ul>
            </div>
        </div>`;
        } 
        console.log("adding team member");
        fs.appendFile("./output/team.html", data, function (err) {
            if (err) {
                return reject(err);
            };
            return resolve();
        });
    });
    
            
    
        
    
    
}

function finishHtml() {
    const html = ` </div>
    </div>
    
</body>
</html>`;

    fs.appendFile("./output/team.html", html, function (err) {
        if (err) {
            console.log(err);
        };
    });
    console.log("end");
}


initApp();

