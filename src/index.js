

 // index.js

// Callbacks
const handleClick = (ramen) => {
  const ramenDetail = document.getElementById('ramen-detail');
  ramenDetail.innerHTML = `
    <img src='${ramen.image}'/>
    <h2>${ramen.name}</h2>
    <h3>${ramen.restaurant}</h3>
  `;
  const rating = document.getElementById('rating-display');
  const comment = document.getElementById('comment-display');
  rating.textContent = ramen.rating;
  comment.textContent = ramen.comment;
};

const addSubmitListener = () => {
  const newRamenForm = document.getElementById('new-ramen');
  newRamenForm.addEventListener('submit', event => {
    event.preventDefault();

    const name = document.getElementById('new-name').value;
    const image = document.getElementById('new-image').value;
    const rating = document.getElementById('new-rating').value;
    const comment = document.getElementById('new-comment').value;

    const ramen = { name, image, rating, comment };
    displayRamens(ramen);
  });
};

const displayRamens = () => {
  fetch('http://localhost:3000/ramens')
  .then(res => res.json())
  .then(ramenData => displayRamensOnDiv((ramenData)))
};

const displayRamensOnDiv = (ramensArray) => {
  let ramenDiv = document.querySelector('#ramen-menu');

  ramensArray.forEach(item => {
     // Log each ramen item
     console.log(item);
    let imagesRamen = document.createElement('img');
    imagesRamen.src = item.image;
    imagesRamen.alt = item.name;
    ramenDiv.appendChild(imagesRamen);

    imagesRamen.addEventListener('click', () => {
      console.log(`Clicked on ${item.name}`); // Log the click event
      handleClick(item);
      
    });
  });
};


const main = () => {
  displayRamens();
  addSubmitListener();
};

document.addEventListener('DOMContentLoaded', main); // Call main when DOM is loaded

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};

