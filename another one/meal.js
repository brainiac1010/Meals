const loadMeals = (search) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.meals) {
                displayMeals(data.meals);
            } else {
                console.error('No meals found');
                displayMeals([]);
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

const displayMeals = (items) => {
    const displayContainer = document.getElementById('meal-container');
    displayContainer.innerHTML = '';

    if (items.length === 0) {
        displayContainer.innerHTML = '<p>No meals found.</p>';
        return;
    }

    for (const item of items) {
        const newItem = document.createElement('div');
        newItem.classList.add('card');
        newItem.innerHTML = `
            <img src="${item.strMealThumb}" class="card-img-top" alt="${item.strMeal}">
            <div class="card-body">
                <h5 class="card-title">${item.strMeal}</h5>
                <h6 class="card-subtitle mb-2 text-muted">Location: ${item.strArea}</h6>
                <p class="card-text">${item.strInstructions.slice(0, 200)}${item.strInstructions.length > 200 ? '...' : ''}</p>
                <button class="btn btn-primary" onclick="showFullInstructions(event, '${item.idMeal}')">More Details</button>
            </div>`;
        displayContainer.appendChild(newItem);
    }
}

const searchfood = () => {
    const searchField = document.getElementById('searchbox');
    const searchText = searchField.value.trim(); 
    loadMeals(searchText);
    searchField.value = '';
}

document.addEventListener('DOMContentLoaded', () => loadMeals(''));

const loadmealdetails = (idMeal) => {
    const url2 = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;

    fetch(url2)
        .then(rest => rest.json())
        .then(data => displayMealsDetails(data.meals[0]));
}

const displayMealsDetails = (meal) => {
    const detailContainer = document.getElementById('detail-container');
    detailContainer.innerHTML = '';

    const mealDiv = document.createElement('div');
    mealDiv.classList.add('card', 'selected-card');
    mealDiv.innerHTML = `
        <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
        <div class="card-body">
     <br>
          <h5 class="card-title">${meal.strMeal}</h5>
          
             <h6>Recipe:</h6>
          <p class="card-text">${meal.strInstructions}</p>
          
          <a href="${meal.strSource}" target="_blank" class="btn btn-primary">Recipe Source</a>
        </div>`;
    
    detailContainer.appendChild(mealDiv);
}

const showFullInstructions = (event, idMeal) => {
    
    const previousSelected = document.querySelector('.selected-card');
    if (previousSelected) {
        previousSelected.remove();
    }

    
    event.stopPropagation();
    
   
    loadmealdetails(idMeal);
}
