const loadUsers = () => {
    fetch('https://randomuser.me/api/?gender=female&results=10')
        .then(res => res.json())
        .then(data => displaydata(data.results));
}

const displaydata = (users) => {
    const usersContainer = document.getElementById('user-container');

  usersContainer.innerHTML = '';  

    for (const user of users) {
        const userDiv = document.createElement('div');
        userDiv.classList.add('user');
        userDiv.innerHTML = `
 <img src="${user.picture.large}" alt="User Picture">
            <h3>${user.name.first} ${user.name.last}</h3>
            <p>Email: ${user.email}</p>
            <p>Location: ${user.location.city}, ${user.location.country}</p>
            <p>Phone: ${user.phone}</p>
            <p>gender: ${user.gender}</p>
        `;
        usersContainer.appendChild(userDiv);
    }
}

loadUsers();
