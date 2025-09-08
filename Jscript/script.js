const categoriesContainer=document.getElementById("categories-container")
const allPlanttreeContainer=document.getElementById("card-container")
const cartContainer=document.getElementById("cart-container")
let CartArr= [];

const loadaCategoriesContainer= async()=>{
       const url='https://openapi.programming-hero.com/api/categories'
       const res= await fetch(url)
       const data= await res.json();
       const allCategories=data.categories;
      //  console.log(allCategories)
       DispalyCategories(allCategories);
        
};

loadaCategoriesContainer();

const DispalyCategories=(categories)=>{
     categories.forEach(categorie=>{
        categoriesContainer.innerHTML+=`
          <li id="${categorie.id}" class="hover:bg-green-400 rounded-[0.3rem] p-1.5 cursor-pointer ">${categorie.category_name}</li>
        `
     })

     categoriesContainer.addEventListener('click', (e)=>{
       const alllistItem=document.querySelectorAll("li")
        alllistItem.forEach(li=>{
           li.classList.remove('active')
        })
          if(e.target.localName ==='li'){
             e.target.classList.add('active')
             loadTreeCategorieById(e.target.id)
          }
     })
}

const loadAllPlanttree= async()=>{
  const url='https://openapi.programming-hero.com/api/plants'
  const res= await fetch(url)
  const data= await res.json();
  const allPlants=data.plants;
   displayPlantsTree(allPlants);
};

loadAllPlanttree();

const displayPlantsTree=(plants)=>{
   allPlanttreeContainer.innerHTML=""
      plants.forEach(plant =>{
        allPlanttreeContainer.innerHTML += `
              <div class="bg-white rounded-[6px] space-y-3 shadow-sm">
                          <div class="">
                             <img class=" w-full h-[186px] rounded-t-[6px]" src="${plant.image}" alt="">
                          </div>
                          <div class="px-4">
                              <h2 class="text-2xl font-bold">${plant.name}</h2>
                              <p class="text-[1rem] font-medium">This all Product description given by me so that i can the real card design...</p>
                          </div>
                          <div class=" flex justify-between px-4">
                             <button class="bg-green-200 rounded-[6px] p-1">${plant.category}</button>
                             <p><i class="fa-solid fa-bangladeshi-taka-sign font-light"></i><span class="font-semibold">${plant.price}</span></p>
                          </div>
                          <div class="px-4">
                             <button class="bg-green-700 p-2 rounded-3xl w-full text-[1rem] text-white font-medium mb-2">Add to cart</button>
                          </div>
                      </div> 
        
        `
      })
}

const loadTreeCategorieById=(Categoryid)=>{
     const url=`https://openapi.programming-hero.com/api/category/${Categoryid}`
     fetch(url)
     .then((res)=>res.json())
     .then(data => {
      const PlantCategory=data.plants
      loadTreeCategory(PlantCategory)

     })
     .catch(err=>{
        console.log(err)
     })
}

const loadTreeCategory =(plantsId)=>{
   allPlanttreeContainer.innerHTML=""
   plantsId.forEach(plantId=>{
      allPlanttreeContainer.innerHTML+=`
             <div class="Cart bg-white rounded-[6px] space-y-3 shadow-sm">
                          <div class="">
                             <img class=" w-full h-[186px] rounded-t-[6px]" src="${plantId.image}" alt="">
                          </div>
                          <div class="px-4">
                              <div><h2 class="text-2xl font-bold">${plantId.name}</h2></div>
                              <p class="text-[1rem] font-medium">${plantId.description}</p>
                          </div>
                          <div class=" flex justify-between px-4">
                             <button class="bg-green-200 rounded-[6px] p-1">${plantId.category}</button>
                             <p><i class="fa-solid fa-bangladeshi-taka-sign font-light"></i><span class="font-semibold">${plantId.price}</span></p>
                          </div>
                          <div class="px-4">
                             <button class="a bg-green-700 p-2 rounded-3xl w-full text-[1rem] text-white font-medium ">Add to cart</button>
                          </div>
                      </div>
      
      
      `
   })
}

// Add Conatiner Your Cart Section

allPlanttreeContainer.addEventListener('click', (e) => {
    if (e.target.innerText == "Add to cart") {
        yourCartHandler(e)
    }
});

const yourCartHandler=(e)=>{
    
       const cartName=e.target.parentNode.parentNode.children[1].children[0].innerText
        const cartPrice=e.target.parentNode.parentNode.children[2].children[1].innerText

        CartArr.push({
           name:cartName,
           price:cartPrice
        })
        alert(cartName + " has been added to the cart")
    displayYourCart(CartArr)
}


const displayYourCart=(CartArr)=>{
   cartContainer.innerHTML=""
     CartArr.forEach(cart=>{
      cartContainer.innerHTML+=`
             <div class="bg-[#cff0dc] rounded-xl p-2 my-2 flex justify-between items-center">
                                <div>
                                      <h1 class="text-[1rem] font-medium">${cart.name}</h1>
                                 <p><i class="fa-solid fa-bangladeshi-taka-sign font-light"></i>${cart.price}</p>
                                </div>
                                <button><i class="fa-solid fa-xmark"></i></button>
                             </div>
      
      `
     })
}