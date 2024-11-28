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















$(document).ready(function(){
    ShowCateory();
    ShowTableCategory();
    countcate();
    $('#tablepro').DataTable();
})
 
