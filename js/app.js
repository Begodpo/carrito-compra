// Variables

const cart = document.querySelector("#carrito");
const cartContainer = document.querySelector("#lista-carrito tbody");
const emptyCartBtn = document.querySelector("#vaciar-carrito");
const coursesList = document.querySelector("#lista-cursos");
let cartArticles = [];

// Functions

loadEventListeners();

function loadEventListeners() {
  coursesList.addEventListener("click", handleClickAddBtn);
  cart.addEventListener("click", handleClickRemoveCart);
  emptyCartBtn.addEventListener("click", handleClickEmptyCart);

  document.addEventListener("DOMContentLoaded", () => {
    cartArticles = JSON.parse(localStorage.getItem("carrito")) || [];
    cartHTML();
  });
}

function handleClickAddBtn(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const courseSelected = e.target.parentElement.parentElement;
    readDatesCourse(courseSelected);
  }
}

function handleClickRemoveCart(e) {
  const courseId = e.target.getAttribute("data-id");
  if (e.target.classList.contains("borrar-curso")) {
    cartArticles = cartArticles.filter((course) => course.id !== courseId);
    cartHTML();
  }
}

function handleClickEmptyCart() {
  cartArticles = [];
  cleanHTML();
}

function readDatesCourse(course) {
  const infoCourse = {
    image: course.querySelector("img").src,
    title: course.querySelector("h4").textContent,
    price: course.querySelector(".u-pull-right").textContent,
    id: course.querySelector("a").getAttribute("data-id"),
    quantity: 1,
  };

  const exists = cartArticles.some((course) => course.id === infoCourse.id);
  if (exists) {
    const courses = cartArticles.map((course) => {
      if (course.id === infoCourse.id) {
        course.quantity++;

        return course;
      } else {
        return course;
      }
    });
    cartArticles = [...courses];
  } else {
    cartArticles = [...cartArticles, infoCourse];
  }

  cartHTML();
}

function cartHTML() {
  cleanHTML();
  cartArticles.forEach((course) => {
    const { image, title, price, quantity, id } = course;
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>
            <img src="${image}" width="100">
        </td>        
        <td>${title}</td>
        <td>${price}</td>
        <td>${quantity}</td>
        <td><a href="#" class="borrar-curso" data-id="${id}">X</a></td>

        `;
    cartContainer.appendChild(row);
    syncLocalStorage();
  });
}

function syncLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cartArticles));
}

function cleanHTML() {
  cartContainer.innerHTML = "";
}
