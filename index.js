let movieJson;

function describeMovie() {
    try{
        const movieSelection = document.querySelector("#movieSelection").selectedIndex;
        document.querySelector("#moviePeople").innerHTML = "";
        let movie = movieJson.at(movieSelection-1);
        document.querySelector("#movieTitle").innerHTML = `Title: ${movie.title}`;
        document.querySelector("#movieImage").src = movie.image;
        document.querySelector("#movieDescription").innerHTML = `<strong>Description</strong>: ${movie.description}`;
        document.querySelector("#movieDirector").innerHTML = `<strong>Director</strong>: ${movie.director}`;
        document.querySelector("#movieProducer").innerHTML = `<strong>Producer</strong>: ${movie.producer}`;
        document.querySelector("#movieReleaseDate").innerHTML = `<strong>Release Date</strong>: ${movie.release_date}`;
        document.querySelector("#movieRottenTomatoes").innerHTML = `<strong>Rotten Tomatoes Score</strong>: ${movie.rt_score}`;
        document.querySelector("#movieRuntime").innerHTML = `<strong>Runtime</strong>: ${movie.running_time} minutes`;

        document.querySelector("#moviePeopleLabel").style.display = "block";
        movie.people.forEach(personUrl => {
            let request = new XMLHttpRequest();
            request.open("GET", personUrl, true);
            request.send();
            request.onload = function() {
                if (request.status < 200 && request.status >= 400) {
                    console.log(`Error ${request.status}: ${request.statusText}`);
                    document.querySelector("#moviePeopleLabel").style.display = "none";
                    return;
                }
                let person = JSON.parse(this.response);
                if (person !== undefined) {
                    if (!(person instanceof Array)) {
                        let newPersonElement = document.createElement("li");
                        newPersonElement.appendChild(document.createTextNode(person.name));
                        document.querySelector("#moviePeople").appendChild(newPersonElement);
                        return;
                    }
                    person.forEach(subPerson => {
                        let newPersonElement = document.createElement("li");
                        newPersonElement.appendChild(document.createTextNode(subPerson.name));
                        document.querySelector("#moviePeople").appendChild(newPersonElement);
                    })
                    return;
                }
                document.querySelector("#moviePeopleLabel").style.display = "none";
            }
        })
    }catch(e){
        console.log(e);
        document.querySelector("#movieTitle").innerHTML = `Error: ${e}`;

    }

}

function movieQuery(){
    let request = new XMLHttpRequest();
    request.open("GET", "https://ghibliapi.herokuapp.com/films", true);
    request.send();
    request.onload = function() {
        if (request.status < 200 && request.status >= 400) {
            console.log(`Error ${request.status}: ${request.statusText}`);
            return;
        }
        movieJson = JSON.parse(this.response);
        movieJson.forEach(movie => {
            let newMovieElement = document.createElement("option");
            newMovieElement.appendChild(document.createTextNode(movie.title));
            document.querySelector("#movieSelection").appendChild(newMovieElement)
        })
    }
}

movieQuery()
