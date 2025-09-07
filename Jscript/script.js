const categoriesContainer=document.getElementById("categories-container")
const allTreePlants=document.getElementById('AllPlants')

const LoadaCategoriesContainer= async()=>{
       const url='https://openapi.programming-hero.com/api/categories'
       const res= await fetch(url)
       const data= await res.json();
       const allCategories=data.categories;
       DispalyCategories(allCategories);
        
};



const DispalyCategories=(categories)=>{
     categories.forEach(categorie=>{
        categoriesContainer.innerHTML+=`
          <li class="hover:bg-green-400 rounded-[0.3rem] p-1.5 cursor-pointer ">${categorie.category_name}</li>
        `
     })
}

LoadaCategoriesContainer();