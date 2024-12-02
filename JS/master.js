let ddlcate = document.getElementById('ddlcate');
let category = document.getElementById('category');
let product = document.getElementById('product');
let quantity = document.getElementById('quantity');
let price = document.getElementById('price');
let discount = document.getElementById('discount');
let total = document.getElementById('total');


// save categoary
let categoryAry ;
let productArray;
let BtnStatus = "Create";
let proID;


localStorage.category != null? categoryAry= JSON.parse(localStorage.category) : categoryAry=[];
localStorage.product != null? productArray= JSON.parse(localStorage.product) : productArray=[];

function SaveCateogry(){
    let objectcate={
        category :  category.value
    }
    categoryAry.push(objectcate);
    localStorage.setItem('category', JSON.stringify(categoryAry))
    Rest();
    ShowCateory();
    ShowTableCategory();
    countcate();
    
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

//showtable
function ShowTableCategory(){
    let Table ='';
    for (i=0 ; i<categoryAry.length ; i++)
        {
            Table+=`
              <tr>
                     <td>${i+1}</td>
                     <td>${categoryAry[i].category}</td>
                                
                     <td>
                      
                        <button class="btn btn-danger ms-4 " onclick = "DeleteCategory(${i})" >
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                        </td>
                        </tr>
            `
        }
        document.getElementById('bodycate').innerHTML= Table;
        
}

//deletecategory

function DeleteCategory(id){
    if(confirm('Are you sure From deleted..?')==true){
        categoryAry.splice(id,1)
        localStorage.category= JSON.stringify(categoryAry);
        ShowTableCategory();
        ShowCateory();
        countcate();
    }
    
    
}


//count cate

function countcate(){
    document.getElementById('countcategory').innerHTML=`--Total(${categoryAry.length})`
}


//validation category 

function validationcategory(){
    let valid =true;
    if(category.value ==''){
        alert('Enter Category Name')
        valid=false;
    }else{
        SaveCateogry();
        valid=true;
    }
    return valid;
} 


//get total 
// دالة حساب المجموع الكلي
function GetTotal() {
    
    let qty = parseFloat(quantity.value) || 0;
    let prc = parseFloat(price.value) || 0;
    let disc = parseFloat(discount.value) || 0;

    
    let totalValue = qty * prc - disc;

   
    total.value = totalValue >= 0 ? totalValue.toFixed(2) : 0; 
}


function validateInput(input) {
    input.value = input.value < 0 ? 0 : input.value;
}


quantity.addEventListener('input', () => validateInput(quantity));
price.addEventListener('input', () => validateInput(price));
discount.addEventListener('input', () => validateInput(discount));


quantity.addEventListener('input', GetTotal);
price.addEventListener('input', GetTotal);
discount.addEventListener('input', GetTotal);


// save product
function saveproduct(){
    let NewProduct={
        ddlcate : ddlcate.options[ddlcate.selectedIndex].text,
        product : product.value,
        quantity: quantity.value,
        price : price.value,
        discount : discount.value,
        total : total.value

    };
    if(BtnStatus==="Create"){
        productArray.push(NewProduct);

    }else{
        productArray[proID]=NewProduct;
        BtnStatus = "Create";
    }
   
    
    localStorage.setItem("product" , JSON.stringify(productArray))
    rest();
    showtableproduct();
}

// rest 

function rest(){
    ddlcate.options[ddlcate.selectedIndex].text="Select Category......",
    product.value='',
    quantity.value='',
    price.value='',
    discount.value='',
    total.value=''

}


//show table
function showtableproduct(){
    let Tablepro = '';
    for(let x =0 ; x< productArray.length ; x++){
        Tablepro +=`
        <tr>
                   <td>${x}</td>
                   <td>${productArray[x].ddlcate}</td>
                   <td>${productArray[x].product}</td>
                   <td>${productArray[x].quantity}</td>
                   <td>${productArray[x].price}</td>
                   <td>${productArray[x].discount}</td>
                   <td>${productArray[x].total}</td>
                   <td>
                       <button class="btn btn-info">
                           <i class="fa-solid fa-pen-to-square" onclick="EditProduct(${x})"></i>
                       </button>
                       <button class="btn btn-danger ms-4" onclick=" delpro(${x})">
                           <i class="fa-solid fa-trash-can"></i>
                       </button>
                   </td>
               </tr>
        `

    }
    document.getElementById('tableproo').innerHTML = Tablepro;

}


//delete

function delpro(id){
    if(confirm('Are You Sure From Deleting')==true){
        productArray.splice(id,1);
        localStorage.product =JSON.stringify(productArray);
        showtableproduct();
    }
    

}

//EditProduct
function EditProduct(id){
    ddlcate.options[ddlcate.selectedIndex].text= productArray[id].ddlcate;
     product.value= productArray[id].product;
     quantity.value=productArray[id].quantity;
     price.value=productArray[id].price;
     discount.value=productArray[id].discount;
     total.value=productArray[id].total;

     BtnStatus = "Edit";
     proID= id;


}












$(document).ready(function(){
    ShowCateory();
    ShowTableCategory();
    countcate();
    showtableproduct();
    $('#tablepro').DataTable();
})
 
