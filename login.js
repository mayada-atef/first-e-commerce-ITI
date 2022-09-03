var storge = window.localStorage;
var curentUser = [];
var loginForm = document.getElementById('LoginForm')
var RegisterForm = document.getElementById('registerForm')
var adminLoginForm = document.getElementById('adminLoginForm')
const date = Date.now();
/////////////////////////////////////////////////////////////////////////////////
////////////////Register///////////
///////////////////////////////////////////////////////////////////////////////

if (RegisterForm) {
    document.getElementById('registerSubmit').addEventListener('click', function () {
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        var confirPassword = document.getElementById('confirPassword').value;
        var gender = document.getElementsByName('gender');

        createUser(name, email, password, confirPassword, gender);
    })
}

function createUser(name, email, password, confirPassword, gender) {
    resetError();
    if (registerValidation(name, email, password, confirPassword, gender)) {

        gender = gender[0] ? 'male' : 'female';
        var role = 0
        var id = hasUsers() ? id = allUser().length + 1 : id = 1;
        role = id == 1 ? role = 1 : role = 0;
        var user = 
            {
                'id': id,
                'name': name,
                'email': email,
                'password': password,
                'gender': gender,
                'data': Date(),
                'role': role,
                'token': date,
            }
        setUser(user);
        if (role == 1)
        {
            setCookie('AdminToken', date, './');
        } else {
             setCookie('userToken', date, './');
            }
       
        window.location.assign("./");
    }
}
function isUniqeEmail(userEmail) {
    if (hasUsers()) {
        var users = allUser();
        for (var i = 0; i < users.length; i++) {
            if (users[i].email === userEmail) {
                return false;
                break;
            }
        }
    }

    return true;
}

function registerValidation(name, email, password, confirPassword, gender) {
    var nameReg = /^[A-Za-z0-9 ]{3,20}$/;
    var emailReg = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    var passwordReg = /^[A-Za-z0-9!@#$%^&*()_]{8,20}$/;
    var isGender = gender[0].checked || gender[1].checked ? true : false;
    if (name.match(nameReg) && email.match(emailReg) && isUniqeEmail(email) && password.match(passwordReg) && isGender) {
        return true;

    } else {
        if (!name.match(nameReg)) {
            document.getElementsByClassName('valid-name')[0].setAttribute('style', 'display:block;color:red')

        } else if (!email.match(emailReg)) {
            document.getElementsByClassName('valid-email')[0].setAttribute('style', 'display:block;color:red')
        }
        else if (!isUniqeEmail(email)) {
            document.getElementsByClassName('repeat-email')[0].setAttribute('style', 'display:block;color:red')
        }
        else if (!password.match(passwordReg)) {
            document.getElementsByClassName('valid-password')[0].setAttribute('style', 'display:block;color:red')
        }
        else if (confirPassword != password) {
            document.getElementsByClassName('valid-confirPassword')[0].setAttribute('style', 'display:block;color:red')
        }
        else if (!isGender) {
            document.getElementsByClassName('valid-gender')[0].setAttribute('style', 'display:block;color:red')
        }
        return false;
    }
}

function resetError() {
    var span = document.getElementsByClassName('valid');

    for (var i = 0; i < span.length; i++) {

        span[i].setAttribute('style', 'display:none');
    }

}

/////////////////////////////////////////////////////////////////////////////////
////////////////Login///////////
///////////////////////////////////////////////////////////////////////////////

if (loginForm) {
    document.getElementById('loginSubmit').addEventListener('click', function () {
        var email = document.getElementById('LoginEmail').value;
        var password = document.getElementById('LoginPassword').value;
      
        if (loginValidation(email, password)) {

            
        window.location.assign("./");
        } else {
            
        document.getElementsByClassName('valid-data')[0].setAttribute('style', 'display:block;color:red; text-align: center;')
        }
    })

}
function loginValidation(email, pass) {
    if (hasUsers()) {
        
        var users = allUser();
            for (var i = 0; i < users.length; i++) {
                if (users[i].email === email && users[i].password === pass) {
                    users[i].token = date;
                    setUsers(users);
                    if (users[i].role == 1)
                    {
                        setCookie('AdminToken', date, './')
                    } else {
                            setCookie('userToken', date, './')
                        }
                    
                //setCurrentUser(users[i].id, users[i].email, users[i].name, users[i].gender, users[i].data)
                    return true;
                    break;
                }
            }
    }
   
    return false;
}

//////////////////////////////////////
///////////////////localStorage/////////////////

/////set on user ///
function setUser(user) {
    if (hasUsers()) {
        var users = allUser();
        users.push(user)
        storge.setItem('users', JSON.stringify(users))
    } else {
        storge.setItem('users', JSON.stringify([user]))
    }
}
//////////set all user/////
function setUsers(users)
{
    if(hasUsers())
    {
        storge.setItem('users', JSON.stringify(users))
    }
}

function allUser() {
    if (hasUsers()) {
        return JSON.parse(storge.getItem('users'));
    }
}

function hasUsers() {
    return storge.getItem('users') != undefined ? true : false

}



function getuserTokenCookie()
{
    var token = "";
    var all = document.cookie.split(';')
    for(var i =0; i<all.length; i++)
        {
            for(var x = 0; x< all.length; x++)
            {
                if(all[x].trim().startsWith('userToken'))
                {
                    token = all[x].trim();
                }
            }
        }
        return token.split('=')[1];
    
}
function getAdminTokenCookie()
{
    var token = "";
    var all = document.cookie.split(';')
    for(var i =0; i<all.length; i++)
        {
            for(var x = 0; x< all.length; x++)
            {
                if(all[x].trim().startsWith('AdminToken'))
                {
                    token = all[x].trim();
                }
            }
        }
        return token.split('=')[1];
    
}
function getUserLogin()
{
   var  token = getuserTokenCookie();
if(token != "")
{
    users = allUser()
    for(var i = 0; i < users.length; i++)
    {
        if(users[i].token == token )
        {
            return users[i];
            break
        }
    }
}
}
function getAdminLogin()
{
    var token = getAdminTokenCookie();
   
if(token != "")
{
    users = allUser()
    for(var i = 0; i < users.length; i++)
    {
      
        if(users[i].token == token )
        {   
            return users[i];
            break
        }
    }
}
    
}



////////////////////////////////////////
////////////////////Set & GET CURRENT USER/////////////////////
function setCurrentUser(id, email, name, gender, data) {
    curentUser = [
        {
            'id': id,
            'email': email,
            'name': name,
            'gender': gender,
            'data': data
        }
    ]

}

function getCurrentUser() {
    return curentUser;
}
///////////////////////////////////////////////////////
/////////////////////Cooki///////////////////////////////
var all = document.cookie.split(';')
function hasCookie(key) {
    for (var i = 0; i < all.length; i++) {
        if (all[i].trim().startsWith(key)) {
            return true;
            break;
            // stop loop
        }
    }
    return false
}


function setCookie(key, value, path) {
    var date = new Date();
    date.setDate(date.getDate() + 3);
    var expire = "expires=" + date.toUTCString() + ";"
    document.cookie = key + '=' + value + ';' + expire + "path=" + path + ";";

}



///////////////////////////////////////////////
/////////////////////////Admin Login///////////////////////
if (adminLoginForm) {
    document.getElementById('AdminLoginSubmit').addEventListener('click', function () {
        var email = document.getElementById('adminEmail').value;
        var password = document.getElementById('adminPassword').value;
        if (loginAdminValidation(email, password)) {
            setCookie('AdminToken', date, '/')
            // setCookie('name', user.name, './'); 
            document.location = location.origin +'/admin';
        } else {
            document.getElementsByClassName('valid-data')[0].setAttribute('style', 'display:block;color:red; text-align: center;')

        }
    })

}

function loginAdminValidation(email, pass) {

    if (hasUsers()) {
        
        var users = allUser();
        for (var i = 0; i < users.length; i++) {
            if (users[i].email === email && users[i].password === pass && users[i].role == 1) {
                users[i].token = date;
                setUsers(users);
                setCurrentUser(users[i].id, users[i].email, users[i].name, users[i].gender, users[i].data)
                return true;
                break;
            }
    
        }
    }
    return false;
}

////////////////////////
////////////admin Cooki//////////////
function checkAdminCookies() {
    if (!hasCookie('AdminToken')) {
        document.location = location.origin +'/admin/login.html';
    }
}


function checkUserCookies() {
    if(!hasCookie('AdminToken') && !hasCookie('userToken')) {
      
        document.location = location.origin +'/login.html';
    }

}
function checkCooki()
{
    if(hasCookie('AdminToken') || hasCookie('userToken'))
    {
        return true;
    }
    return false;
}

///////////////////////////////////////////////////////////////
//////////////////Users in admin panel//////////////////////////
function createHtmlElment(parent, child, classes, text) {
    var element = document.createElement(child);
    parent.append(element);
    if (classes) element.className=classes;
    if (text) element.innerText = text;
    return element;
}

var usersTable = document.getElementById("usersTable");
var tableBody=document.getElementsByTagName("tbody")[0]
if(usersTable)
{
    showAllUsers();
}
function showAllUsers() {
    tableBody.innerHTML = "";
    var index=0 
    var users =  allUser()
    users.forEach((user ,index) => {
     
        tr = document.createElement('td')
        var tr = createHtmlElment(tableBody, "tr", "", "");
        createHtmlElment(tr,"td","",index+1)
        createHtmlElment(tr, "td", "", user["id"])
        createHtmlElment(tr, "td", "", user["name"])
        createHtmlElment(tr, "td", "", user["email"])
        createHtmlElment(tr, "td", "", user["gender"])
        createHtmlElment(tr, "td", "", user["data"])    
        createHtmlElment(tr, "td", "", user["role"])    
        let operationTd = createHtmlElment(tr, "td", "", "")
        let deleteButton=createHtmlElment(operationTd, "button", "btn btnRed", "Delete")
        let editButton=createHtmlElment(operationTd, "button", "btn btnYellow", "Edit")
       deleteButton.addEventListener("click", ()=>{deleteUser(index,users)})
      editButton.addEventListener("click", () => { editUser(index, user) })
      
    })
 
}
const deleteUser = (index, users) => {

 users.splice(index, 1);
 setUsers(users);
 showAllUsers(); 
}

function editUser(index, user)
{
    var td = event.target.parentElement.parentElement.children;
    for(var i= 1; i< td.length -1; i++)
    {
        let tdText = td[i].innerText;
        td[i].innerHTML =  '<input type="text"  value = '+ tdText+ ' >';
    }
    let  lastTd = td[td.length-1];
    lastTd.lastChild.remove()
    var submitButton = createHtmlElment(lastTd, 'button', "btn btnGreen", "Submit")
    submitButton.addEventListener("click", () => {submitEditUser(index) })
}
 function submitEditUser(index)
 {
    var td = event.target.parentElement.parentElement.children;
    var users = allUser();
    var user = users[index];
        // let tdName= td[2].firstChild.value;
        // td[2].innerHTML =  '<td>'+tdName+'</td>';
        // user.name = tdName;
    
        // let tdEmail= td[3].firstChild.value;
        // td[3].innerHTML =  '<td>'+tdEmail+'</td>';
        // user.email = tdEmail;

        // let tdGender= td[4].firstChild.value;
        // td[4].innerHTML =  '<td>'+tdGender+'</td>';
        // user.gender = tdGender;

        let tdRole= td[6].firstChild.value;
        tdRole == '' ? tdRole = 0 :''; 
        td[6].innerHTML =  '<td>'+tdRole+'</td>';
        user.role = Number(tdRole);

    setUsers(users)
    showAllUsers();
 }


//////////////////////////////////////////////////////
///////////////////////////////////////////////////


var href = location.href;
if(href.match(/\W*(cart)\W*/))
{  
     checkUserCookies() ;
 
}
var href = location.href;
if(href.match(/\W*(admin)\W*/) && !href.match(/\W*(admin\/login)\W*/) )
{  
    
        checkAdminCookies() ;
   
  // 
}
function refuseRequestAdmin() {
     if (hasCookie('AdminToken')) {
        document.location = location.origin +'/admin/index.html';
    }
}
function refuseRequestUser() {
     if (hasCookie('userToken') || hasCookie('AdminToken') ) {
        document.location = location.origin +'/index.html';
    }
}
if (href.match(/\W*(login)\W*/)||href.match(/\W*(register)\W*/)) {
     refuseRequestUser();
}
if (href.match(/\W*(admin\/login)\W*/)||href.match(/\W*(admin\/register)\W*/)) {
    refuseRequestAdmin();
    
}

function removeCooki(token) {
    if (hasCookie(token)) {
        var date = new Date();
        date.setDate(date.getDate() - 7);
        var expire = "expires=" + date.toUTCString() + ";"
        document.cookie = token + "=;" + expire + "path=/;"
        location.href = '/';
     
    }
}
function logOut(token) {
    removeCooki(token);
   
}

var UserlogOut = document.getElementsByClassName('userlogout')[0] ;

if(UserlogOut) 
   {
    UserlogOut.addEventListener('click', () => logOut('userToken')   );
    UserlogOut.addEventListener('click', () => logOut('AdminToken')   );
   
   }

var adminlogOut = document.getElementsByClassName('adminlogout')[0] ;
if(adminlogOut) 
   {
    adminlogOut.addEventListener('click', function(){
        logOut('AdminToken') ;
   })
   }



if(checkCooki())
{  
   if(!href.match(/\W*(admin)\W*/))
   {
    let indexLogout = document.getElementById("IndexLogout");
    indexLogout.classList.remove("d-none");
    let userLoginName = document.getElementById('userNameIndex');
    userLoginName.classList.remove('d-none'); 
       userLoginName.innerText = hasCookie('userToken') ? getUserLogin().name : getAdminLogin().name;
       let myCart = document.getElementById("myCart");
       let vistorBlock = document.getElementById("vistorBlock")
       myCart.classList.remove("d-none");
       vistorBlock.classList.add("d-none"); 
   
   }else{
    let adminLoginName = document.getElementById('adminNameIndex');
    adminLoginName.classList.remove('d-none'); 
    adminLoginName.innerText =getAdminLogin().name;

   }
}



