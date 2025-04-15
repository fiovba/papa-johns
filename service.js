async  function getCategories(){
    const res = await fetch("https://papa-data.onrender.com/category");
    const data = await res.json();
    return data;
}
async  function getProductByCtg(ctg){
    const res = await fetch(`https://papa-data.onrender.com/${ctg}`);
    const data = await res.json();
    return data;
}
async  function deleteProductById(ctg,id){
    const res = await fetch(`https://papa-data.onrender.com/${ctg}/${id}`,{
        method:'DELETE'
    });
    const data = await res.json();
    return data;
}
async function postNewItem(newItem, category) {
    const res = await fetch(`https://papa-data.onrender.com/${category}`, {
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newItem), 
        method: 'POST'
    });

    if (res.ok) {
        const data = await res.json();
        console.log("Məhsul uğurla əlavə olundu:", data);
        return data;
    } else {
        console.log("Xəta baş verdi:", res.statusText);
        throw new Error("Məhsul əlavə edilə bilmədi");
    }
}
async function updateProductById(ctg, id, updatedItem) {
    const res = await fetch(`https://papa-data.onrender.com/${ctg}/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedItem)
    });
    console.log(ctg,id);
    
    if (res.ok) {
        const data = await res.json();
        console.log("Məhsul uğurla yeniləndi:", data);
        return data;
    } else {
        console.log("Xəta baş verdi:", res.statusText);
        throw new Error("Məhsul yenilənə bilmədi");
    }
}

export{
    getCategories,
    getProductByCtg,
    deleteProductById,
    postNewItem,
    updateProductById
}