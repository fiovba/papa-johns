import { deleteProductById, getCategories, getProductByCtg, postNewItem, updateProductById } from "./service.js";

let categdata;
const categList = document.getElementById('categList');
const categList2 = document.getElementById('categList2');
const cards = document.getElementById('cards');
const hiddenDiv = document.getElementById('hiddenDiv');

async function PrintCategData() {
    categdata = await getCategories();
    categdata.forEach(element => {
        categList.innerHTML += `<div onclick="printCategProds('${element.slug}')"><a class="text-black">${element.slug}</a></div>`;
    });
    categdata.forEach(element => {
        categList2.innerHTML += `<div onclick="printCategProds('${element.slug}')"><a class="text-black">${element.slug}</a></div>`;
    });
}
let cardData=[]
window.printCategProds = async (ctg) => {
  localStorage.clear()
    hiddenDiv.style.display = 'none';
    if (ctg === "kampaniyalar") {
      hiddenDiv.style.display = 'flex';
  }
    cardData = await getProductByCtg(ctg);
    cards.innerHTML = "";
    cardData.forEach(element => {
        cards.innerHTML += `
        <div class="max-w-xs rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800">
            <img src="${element.img}" alt="" class="object-cover object-center w-full rounded-t-md h-72 dark:bg-gray-500">
            <div class="flex flex-col justify-between p-6 space-y-8">
                <div class="space-y-2">
                    <h2 class="text-3xl font-semibold tracking-wide">${element.title}</h2>
                    <p class="dark:text-gray-800">${element.composition}</p>
                </div>
                <button type="button" onclick='addForm(${JSON.stringify(element)})' class="flex items-center justify-center w-full p-3 bg-lime-400 border-1 border-black rounded-3xl text-white">Edit</button>
                <button onclick="handleDel('${ctg}','${element.id}')" type="button" class="flex items-center justify-center w-full p-3 bg-[#ED2100] border-1 border-black rounded-3xl text-white">Delete</button>
            </div>
        </div>`;
    });
  
};

window.handleDel = async (ctg, id) => {
  await deleteProductById(ctg, id);
  // localStorage.setItem('category', ctg);
  Swal.fire("Silindi!", "Məhsul uğurla silindi.", "success");
  printCategProds(ctg);
};

const toggleButton = document.getElementById("menu-toggle");
toggleButton.addEventListener("click", () => {
    categList2.classList.toggle("hidden");
});

// PrintCategData();

window.addForm = (product = {}) => {
    if (product.id) {
        localStorage.setItem('editId', product.id);
    }
    document.getElementById('main').innerHTML = `
    <div id="inputs" class="container max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-3xl border border-gray-200 mt-10">
        <h2 class="text-2xl font-bold text-[#007243] mb-6">Product Form</h2>
        <div id="editPart" class="flex flex-col gap-4">
            <input name="title" class="w-full p-3 rounded-xl text-gray-700 bg-[#f1f8f4] border border-[#007243]" type="text" placeholder="Product Name" value="${product.title || ''}" />
            <input name="composition" class="w-full p-3 rounded-xl text-gray-700 bg-[#f1f8f4] border border-[#007243]" type="text" placeholder="Description" value="${product.composition || ''}" />
            <input name="img" class="w-full p-3 rounded-xl text-gray-700 bg-[#f1f8f4] border border-[#007243]" type="text" placeholder="Image URL" value="${product.img || ''}" />
            <input name="category" class="w-full p-3 rounded-xl text-gray-700 bg-[#f1f8f4] border border-[#007243]" type="text" placeholder="Category" value="${product.category || ''}" />
            <input name="price" class="w-full p-3 rounded-xl text-gray-700 bg-[#f1f8f4] border border-[#007243]" type="number" placeholder="Price" value="${product.price || ''}" />
            <div class="flex gap-4">
                <button onclick="handleEdit()" class="flex-1 p-3  text-white bg-[#ED2100] border-1 border-black rounded-3xl transition">Edit</button>
                <button onclick="handlePost()" class="flex-1 p-3 rounded-3xl text-white bg-lime-400 border-1 border-black transition">Add</button>
            </div>
        </div>
    </div>`;
};

window.handlePost = () => {
    const newItem = {
        title: document.querySelector('[name="title"]').value,
        composition: document.querySelector('[name="composition"]').value,
        img: document.querySelector('[name="img"]').value,
        price: document.querySelector('[name="price"]').value,
        category: document.querySelector('[name="category"]').value
    };

    postNewItem(newItem, newItem.category).then(()=>{
      Swal.fire("Uğurluu!", "Məhsul əlavə olundu!", "success");
        printCategProds(category);
    })
};

window.handleEdit = () => {
    const updatedItem = {
        title: document.querySelector('[name="title"]').value,
        composition: document.querySelector('[name="composition"]').value,
        img: document.querySelector('[name="img"]').value,
        price: document.querySelector('[name="price"]').value,
        category: document.querySelector('[name="category"]').value
    };

    const id = localStorage.getItem('editId');
    const category = updatedItem.category;

    updateProductById(category, id, updatedItem).then(() => {
        Swal.fire("Uğurluu !", "Məhsul redaktə olundu!", "success");
        printCategProds(category);
    });
};

function staticRender() {
    const category = localStorage.getItem('category');
    if (category) {
        printCategProds(category);
    }
}
staticRender();
PrintCategData()