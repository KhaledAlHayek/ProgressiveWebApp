import { initializeApp } from "firebase/app";
import {
  collection, getFirestore, onSnapshot, addDoc, enableIndexedDbPersistence, doc, deleteDoc
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDiLTBe5Ai87a0GUJLsfs2onv1ZbbA20yU",
  authDomain: "khaled-food-recipes.firebaseapp.com",
  projectId: "khaled-food-recipes",
  storageBucket: "khaled-food-recipes.appspot.com",
  messagingSenderId: "783369283094",
  appId: "1:783369283094:web:b8c4dcf6c18c500dfb3737"
};

initializeApp(firebaseConfig);
const db = getFirestore();
const collectionRef = collection(db, "recipes");

/*
  even when we are offline, firestore still has access to the indexed db, 
  when we back online firestore will sync all the new data to the database
*/
enableIndexedDbPersistence(db).catch(err => {
  if(err.code == "failed-precondition"){
    // Multiple tabs open, persistence can only be enabled in one tab at a time
    console.log("persistence failed");
  }
  else if(err.code == "unimplemented"){
    // the current browser does not support features required to enable persistence
    console.log("persistence is not available");
  }
});


// set a realtime listener for our data
onSnapshot(collectionRef, snapshot => {
  // console.log(snapshot.docChanges());
  snapshot.docChanges().forEach(change => {
    // console.log(change.doc.data(), change.doc.id);
    if(change.type === "added"){
      renderRecipes(change.doc.data(), change.doc.id);
    }
    if(change.type === "removed"){
      removeRecipe(change.doc.id);
    }
  });
})

// update recipes on the page.
const recipesContainer = document.querySelector(".recipes");
const renderRecipes = (data, id) => {
  const html = `
    <div class="recipe" data-id="${id}">
      <img src="./img/dish.png" alt="Dish Image">
      <div class="info">
        <h3>${data.title}</h3>
        <p>${data.ingredients}</p>
      </div>
      <div class="delete-recipe">
        <span class="material-icons" data-id="${id}">delete_outline</span>
      </div>
    </div>
  `;
  recipesContainer.innerHTML += html
}

// add new recipe form
const addRecipeForm = document.forms["add-form"];
addRecipeForm.addEventListener("submit", e => {
  e.preventDefault();
  addDoc(collectionRef, {
    title: addRecipeForm.title.value,
    ingredients: addRecipeForm.ingredients.value
  }).then(() => {
    addRecipeForm.reset();
  }).catch(err => console.log(err));
});

// remove recipe
recipesContainer.addEventListener("click", e => {
  if(e.target.tagName === "SPAN"){
    const id = e.target.dataset.id;
    const docReference = doc(db, "recipes", id);
    deleteDoc(docReference).then(() => {
      console.log("deleted");
    }).catch(err => console.log(err));
  }
});
const removeRecipe = (id) => {
  const recipe = document.querySelector(`.recipe[data-id=${id}]`);
  recipe.remove();
}