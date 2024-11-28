let ddlcate = document.getElementById('ddlcate');
let category = document.getElementById('category');
let product = document.getElementById('product');
let quantity = document.getElementById('quantity');
let price = document.getElementById('price');
let discount = document.getElementById('discount');
let total = document.getElementById('total');


// save categoary
let categoryAry ;
localStorage.category != null? categoryAry= JSON.parse(localStorage.category) : categoryAry=[];

function SaveCateogry(){
    let objectcate={
        category :  category.value
    }
    categoryAry.push(objectcate);
    localStorage.setItem('category', JSON.stringify(categoryAry))
    Rest()
    ShowCateory()
    
}

//resetcate

function Rest(){
    category.value='';
}

// show category
function ShowCateory(){
    let item='';
    item+=` <option value="">Select Category......</option>`
    for (i=0 ; i<categoryAry.length ; i++)
    {
        item+=` <option value="${i}">${categoryAry[i].category}</option>`
    }
    ddlcate.innerHTML=item;
}


















$(document).ready(function(){
    ShowCateory();
    $('#tablepro').DataTable();
})
 
