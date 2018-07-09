function showRepositories(event, data) {
  var repos = JSON.parse(this.responseText) //JS needs to know it's working with a JSON object
  console.log(repos)
  //line below - data attribute to hold repo name (r.name) to reduce query id attributes and make it easy to pass data
  //onclick - explicit passing of this to getCommits(), which is another XHR request
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a> </li>').join('')}</ul>` //maps through all the repo and gets the name of the object
  document.getElementById("repositories").innerHTML = repoList
}

function showCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("commits").innerHTML = commitsList
}

function getRepositories() {
  const req = new XMLHttpRequest() //create new instance of XMLHttp
  req.addEventListener("load", showRepositories); //listener listens to load event then give the listener a callback function
  req.open('get', 'https://api.github.com/users/ynebuhs/repos') //open takes the HTTP verb and URI for request
  req.send() //request is being sent - this fetches data from the remote source without reloading page - can see in Inspect > Network > response
}

function getCommits(el) {
  const name = el.dataset.repo //grabs data-repo value from dataset
  const req = new XMLHttpRequest()
  req.addEventListener("load", showCommits)
  req.open("get", "https://api.github.com/repos/ynebuhs/" + name + '/commits')
  req.send()
}