const categoriesContainer=document.getElementById("categories-container")
const allPlanttreeContainer=document.getElementById("card-container")


const loadaCategoriesContainer= async()=>{
       const url='https://openapi.programming-hero.com/api/categories'
       const res= await fetch(url)
       const data= await res.json();
       const allCategories=data.categories;
       DispalyCategories(allCategories);
        
};

const DispalyCategories=(categories)=>{
     categories.forEach(categorie=>{
        categoriesContainer.innerHTML+=`
          <li onclick="loadCategories(${categorie.category_name})" class="hover:bg-green-400 rounded-[0.3rem] p-1.5 cursor-pointer ">${categorie.category_name}</li>
        `
     })
}

const loadAllPlanttree= async()=>{
  const url='https://openapi.programming-hero.com/api/plants'
  const res= await fetch(url)
  const data= await res.json();
  const allPlants=data.plants;
   displayPlantsTree(allPlants);
};

const displayPlantsTree=(plants)=>{
      plants.forEach(plant =>{
        allPlanttreeContainer.innerHTML += `
              <div class="bg-white rounded-[6px] space-y-3 shadow-sm">
                          <div class="">
                             <img class=" w-full h-48 " src="${plant.image}" alt="">
                          </div>
                          <div class="px-4">
                              <h2 class="text-2xl font-bold">${plant.name}</h2>
                              <p class="text-[1rem] font-medium">This all Product description given by me so that i can the real card design...</p>
                          </div>
                          <div class=" flex justify-between px-4">
                             <button class="bg-green-200 rounded-[6px] p-1">${plant.category}</button>
                             <p>$<span>${plant.price}</span></p>
                          </div>
                          <div class="px-4">
                             <button class="bg-green-700 p-2 rounded-3xl w-full text-[1rem] text-white font-medium mb-2">Add to cart</button>
                          </div>
                      </div> 
        
        `
      })
}

const loadCategories=(id)=>{
   const url=`https://openapi.programming-hero.com/api/category/${id}`
   fetch(url)
   .then(res => res.json())
   .then(data => console.log(data.category_name))
}

loadaCategoriesContainer();
loadAllPlanttree();
