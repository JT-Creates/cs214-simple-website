"use strict";

const switcher = document.querySelector(".btn");
switcher.addEventListener("click", function() {
    let cur_theme = (document.body.classList.value == "theme-1") ? "theme-1" : ((document.body.classList.value == "theme-2") ? "theme-2" : "theme-3");
    let new_theme = (document.body.classList.value == "theme-1") ? "theme-2" : ((document.body.classList.value == "theme-2") ? "theme-3" : "theme-1");
    document.body.classList.toggle(cur_theme);
    document.body.classList.toggle(new_theme);
    const className = document.body.className;
    
    switch (className) {
        case "theme-3":
            this.textContent = "Normal";
            break;
        case "theme-2":
            this.textContent = "Light";
            break;
        default:
            this.textContent = "Dark";
    }
    console.log('current class name: ' + className);
});
let projects = [];
const past_code_projects_req = new XMLHttpRequest();
past_code_projects_req.open('GET', "https://www.jtscodes.com/temp_sitemap.json", true);
past_code_projects_req.send();
function get_items(data) {
    for(var items in data) {
        let item = data[items];
        if (item.keywords.toString().match(/(project|assignment|exercise)/i)) {
            projects[projects.length] = item;
            console.log(item);
        }
        if (data[items].sitemap !== undefined) {
            console.log("Level:\t" + (data[items].title || ""));
            get_items(data[items].sitemap);
            console.log("end of Level:\t" + (data[items].title || ""));
        }
    }
}
past_code_projects_req.onload = function() {
    if(past_code_projects_req.status === 200) {
        let data = JSON.parse(past_code_projects_req.response).sitemap;
        get_items(data);
    } else {
        projects[0] = {"description": "no projects found"};
    }
    let pg_elm = document.getElementById("past_cp_list");
    for(let project in projects) {
        let item = document.createElement("li");
        item.innerText = ((projects[project].description.match(projects[project].name)) ? "" : projects[project].name + " - ") + projects[project].description + " ";
        item.innerHTML += "<a href='" + projects[project].url + "' title='" + projects[project].title + "'>Go to " + projects[project].title + "</a>";
        pg_elm.appendChild(item);
    }
};