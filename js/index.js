const today = new Date();
const thisYear = today.getFullYear();
console.log("this year",thisYear);
const footer = document.querySelector("footer");//first one of something
const copyright = document.createElement("p");

copyright.innerHTML = `Fany Kreminski &copy${thisYear}`;
footer.appendChild(copyright);

const skills = ["HTML","CSS",".NET","C++","JS","C"];

const skillsSection = document.getElementById("skills");
const skillsList = skillsSection.querySelector("ul");   




for(let i=0; i<skills.length; i++){
    let skill = document.createElement("li");
    skill.innerText = skills[i];
    skillsList.appendChild(skill);
}
 //LEAVE A MESSAGE
const messageForm = document.getElementsByName("leave_message")[0];//<--=document.forms.leave_message -->
messageForm.addEventListener('submit', e => {
    e.preventDefault();

    
    const usersName = e.target.user_name.value;//target=form
    const usersEmail = e.target.email.value;
    const usersMessage = e.target.user_message.value;

    console.log(usersName, usersEmail, usersMessage);

    const messageSection = document.getElementById("messages");//could be queryselector too
    const messageList = messageSection.querySelector("ul");
    const newMessage = document.createElement("li");
   

    newMessage.innerHTML = `
    <a href = "mailto:${usersEmail}">${usersName}</a>
    <span> says: ${usersMessage}</span>
    `;

    const removeButton = document.createElement("button");
    removeButton.innerText = "remove";
    removeButton.type = "button";

    removeButton.setAttribute("style", "color:#FEF;background:#333;");

    removeButton.addEventListener("click", (event) => {
        const entry = event.target.parentNode;
        entry.remove();
        if (messageList.childElementCount === 0) {
            messageSection.style.display = "none";
        }
    });

    messageSection.style.display = "block";
    newMessage.appendChild(removeButton);
    messageList.appendChild(newMessage);
    

    messageForm.reset();

});

//using Ajax//

/* var githubRequest = new XMLHttpRequest();
githubRequest.open("GET","https://api.github.com/users/Kremifany/repos");
githubRequest.send();
githubRequest.onload = function(){
    var repositories = JSON.parse(this.response);
    console.log(repositories);  
    const projectSection = document.getElementById("projects");
    const projectList = projectSection.querySelector("ul"); 
    for(i=0; i<repositories.length;i++){
        const project = document.createElement("li");
        const projectLink = document.createElement("a");        
        projectLink.innerText = repositories[i].name;
        projectLink.href = repositories[i].html_url;
        projectLink.target = "_blank";


        projectList.appendChild(projectLink);
        projectList.appendChild(project);

        project.style.listStyleType = "none";
        project.style.borderBottom = "2px solid pink";
        project.style.margin = "1 rem 0";
    } 
}*/


//utility function for getting date from github data
const dateFixer = (date) => {
    return date.slice(0, 10);
};

fetch("https://api.github.com/users/Kremifany/repos")
 .then((response) => {
    if (response.ok) {
        return response.json();
      }
      throw new Error('Something went wrong');//in case the repo is not there
 })
 .then((repositories) => {
    //selecting ul in projects section
   let projectSection = document.getElementById('projects');
   const projectList = projectSection.querySelector("ul"); 
   //iterating over repositories array to display repo data
   for (let i=0; i < repositories.length; i++) {
    console.log(repositories);
    const project = document.createElement("li");

    const projectLink = document.createElement("a"); 
    projectLink.innerText = repositories[i].name;
    projectLink.href = repositories[i].html_url;
    projectLink.target = "_blank";

    const projectDescription = document.createElement("p");
    projectDescription.innerText = repositories[i].description;
    
    const projectDate = document.createElement("p");
    projectDate.innerText = `last update on ${dateFixer(repositories[i].pushed_at)}`;

    const projectLanguage = document.createElement("p");
    projectLanguage.innerText = repositories[i].language;

    project.appendChild(projectLink);
    project.appendChild(projectDescription);
    project.appendChild(projectDate);
    project.appendChild(projectLanguage);

    projectList.appendChild(project);

    project.style.listStyleType = "none";
    project.style.borderBottom = "1px solid black";
    project.style.margin = "1 rem 0";
   }
 })

 .catch((error) => {
    const projectSection = document.getElementById('projects');
    const errorMessage = document.createElement("h1");
    errorMessage.innerText = `There was an error! Github error message: ${error.message}`;
    projectSection.appendChild(errorMessage);
});


 
 

