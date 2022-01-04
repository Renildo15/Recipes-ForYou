const search = document.getElementById("search");
const submit = document.getElementById("submit");
const mealsEl = document.getElementById("meals");
const resultHeading = document.getElementsByClassName("result-heading");

function searchMeal(e){
    e.preventDefault();

    const term = search.value;

    if(term.trim()){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then((res) => res.json())
        .then((data) => {
            resultHeading.innerHTML = `<h2>Search Result For ${term} : </h2>`;
            if(data.meals == null) {
                resultHeading.innerHTML = `<h2> There are No Search results for ${term}</h2>`;
            }else{
                mealsEl.innerHTML = data.meals
                .map(
                    (meal) => `
                    <div class="meal">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                    <div class="meal-info" data-mealID="${meal.idMeal}">
                     <h3>${meal.strMeal}</h3>
                    </div>
                    </div>
                    `
                )
                .join("");
            }
        })
    }else{
        alert("please enter a search value");
    }
}

submit.addEventListener("submit", searchMeal);