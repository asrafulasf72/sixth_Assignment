const categoriesContainer=document.getElementById("categories-container")
const allPlanttreeContainer=document.getElementById("card-container")
const cartContainer=document.getElementById("cart-container")
const totalPriceContainer = document.getElementById("total-Price-Container")
const treeDetailsContainer = document.getElementById("tree-details-container")
let CartArr= [];

/*Manage Spiner Here */

const manageSpinner=()=>{
     allPlanttreeContainer.innerHTML=`
            <div id="Spinner" class="flex justify-center items-center min-h-[200px]">
                   <span class="loading loading-dots loading-xl"></span>
            </div
     
     `
}

const showError =()=>{
    allPlanttreeContainer.innerHTML=`
       <div class="bg-sky-200 font-medium text-xl p-3 rounded-2xl h-30 flex justify-center items-center">
             <p class="text-center"> Somthing Want Wrong Please Check your Network Connection Or Click Again</P>
       </div>
    `
}

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
          <li id="${categorie.id}" class="hover:bg-green-400 rounded-[0.3rem] p-1.5 cursor-pointer border-1 border-gray-200 shadow-md">${categorie.category_name}</li>
        `
     })

     categoriesContainer.addEventListener('click', (e)=>{
       const alllistItem=document.querySelectorAll("li")
        alllistItem.forEach(li=>{
           li.classList.remove('active')
        })
          if(e.target.localName ==='li'){
            manageSpinner()
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
   displayAllPlantsTree(allPlants);
};

loadAllPlanttree();

const displayAllPlantsTree=(plants)=>{
   allPlanttreeContainer.innerHTML=""
      plants.forEach(plant =>{
        allPlanttreeContainer.innerHTML += `
              <div class="bg-white rounded-[6px] space-y-3 shadow-sm">
                          <div class="">
                             <img class=" w-full h-[186px] rounded-t-[6px]" src="${plant.image}" alt="">
                          </div>
                          <div class="px-4">
                              <h2 onclick="modalHandler(${plant.id})" class="text-2xl font-bold">${plant.name}</h2>
                              <p class="text-[1rem] font-medium line-clamp-3">${plant.description}</p>
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
        showError()
     })
}

const loadTreeCategory =(plantsId)=>{
   allPlanttreeContainer.innerHTML=""
   plantsId.forEach(plantId=>{
      allPlanttreeContainer.innerHTML+=`
             <div class=" bg-white rounded-[6px] space-y-3 shadow-sm h-[410px]">
                          <div class="">
                             <img class=" w-full h-[186px] rounded-t-[6px]" src="${plantId.image}" alt="">
                          </div>
                          <div class="px-4">
                              <div><h2 onclick="modalHandler(${plantId.id})" class="text-2xl font-bold ">${plantId.name}</h2></div>
                              <p class="text-[1rem] font-medium line-clamp-3">${plantId.description}</p>
                          </div>
                          <div class=" flex justify-between px-4">
                             <button class="bg-green-200 rounded-[6px] p-1">${plantId.category}</button>
                             <p><i class="fa-solid fa-bangladeshi-taka-sign font-light"></i><span class="font-semibold">${plantId.price}</span></p>
                          </div>
                          <div class="px-4">
                             <button class=" bg-green-700 p-2 rounded-3xl w-full text-[1rem] text-white font-medium ">Add to cart</button>
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
        const cartPrice=parseInt(e.target.parentNode.parentNode.children[2].children[1].innerText);

        const existingItem= CartArr.find(item=>item.name === cartName);

        if(existingItem){
          existingItem.quantity +=1;
        }else{
          CartArr.push({
            name:cartName,
            price:cartPrice,
            quantity: 1
          })
        }
        alert(cartName + " has been added to the cart")
    displayYourCart(CartArr)
}


const displayYourCart=(CartArr)=>{
   cartContainer.innerHTML="";
   let total=0;
     CartArr.forEach((cart, index)=>{

      const newTotal=cart.price*cart.quantity;
         total+=newTotal;
      cartContainer.innerHTML+=`
             <div class="bg-[#cff0dc] rounded-xl p-2 my-2 flex justify-between items-center">
                                <div>
                                      <h1 class="text-[1rem] font-medium">${cart.name}</h1>
                                 <p><i class="fa-solid fa-bangladeshi-taka-sign font-light"></i>${cart.price} x ${cart.quantity}=${newTotal}</p>
                                </div>
                                <button onclick="removeYourCart(${index})"><i class="fa-solid fa-xmark"></i></button>
                             </div>
      
      `
     })
     if(CartArr.length>0){
      totalPriceContainer.innerHTML=""
  totalPriceContainer.innerHTML+=`
        <div class="bg-gray-100 rounded-xl p-2 my-2 text-center font-semibold">
        <p>Total: <i class="fa-solid fa-bangladeshi-taka-sign"></i> ${total}</p>
      </div>
   `
}else{
   totalPriceContainer.innerHTML=""
}
};


const removeYourCart=(index)=>{
   if(CartArr[index].quantity>1){
      CartArr[index].quantity-=1;
   }else{
      CartArr.splice(index,1);
   }
     
     displayYourCart(CartArr);
}

const modalHandler= async(id)=>{
     const url=`https://openapi.programming-hero.com/api/plant/${id}`
     const res = await fetch(url)
     const details = await res.json()
     displayDetailsTree(details.plants)
}

const displayDetailsTree =(treeDetails)=>{
      treeDetailsContainer.innerHTML=`
          <div class="space-y-3">
               <h1 class="text-2xl font-bold">${treeDetails.name}</h1>
               <img class="w-[100%] h-60 p-4 rounded-2xl" src="${treeDetails.image}" alt="">
               <h2 class="text-xl font-bold">Category: ${treeDetails.category}</h2>
               <p> <span class="text-xl font-bold"> Price: </span> <i class="fa-solid fa-bangladeshi-taka-sign font-light"></i>${treeDetails.price}</p>
               <p> <span class="text-xl font-bold">Description:</span> ${treeDetails.description}</p>
          </div>
      
      `
     
      document.getElementById("my_modal_5").showModal();
}
