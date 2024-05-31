let searchInput = document.getElementById("searchInput");
let value = document.getElementById("searchInput").value;
let searchBtn = document.getElementById("searchBtn");
let results_heading = document.querySelector(".results-heading");

const getData = (value) => {
    results_heading.innerHTML = `<h1 class="heading">Showing results for - ${value}</h1> <hr class="line"/>`;
    return new Promise((resolve, reject) => {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    reject('Error in response: ' + response.statusText);
                }
            })
            .then((jsonData) => {
                console.log(jsonData.meals);
                let div1 = document.createElement("div");
                div1.innerHTML = `
            <h1 class="heading">Showing Results For - ${value}</h1>
            <hr class="line"/>`;
                document.querySelector(".show-meal").innerHTML = "";
                jsonData.meals.forEach(data => {
                    console.log(data);
                    let div = document.createElement("div");
                    div.classList.add("card");
                    div.innerHTML = `
                <img src="${data.strMealThumb}" alt="img">
                <h4 class="recipe-heading">${data.strMeal}</h4>
                <button type="button" class="btn button" data-bs-toggle="modal" data-bs-target="#exampleModal${data.idMeal}">
                Get Recipe
                </button>
                <div class="modal fade" id="exampleModal${data.idMeal}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title heading fs-5" id="exampleModalLabel">${data.strMeal}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    <h3 class="heading">Recipe</h3>
                    <p>${data.strInstructions}</p>
                    </div>
                    </div>
                </div>
                </div>`;
                    document.querySelector(".show-meal").appendChild(div);
                });
                resolve();
            })
            .catch((error) => {
                console.error('Error in fetching data: ', error);
                document.querySelector('.show-meal').innerHTML = `<h1 class="heading">Meal Not Found...</h1>`;
                reject();
            });
    });
};

searchBtn.addEventListener('click', function () {
    let searchValue = searchInput.value;
    if (searchValue == "") {
        alert("Search Value is empty! Please enter a value to continue.");
    } else {
        getData(searchValue);
    }
});