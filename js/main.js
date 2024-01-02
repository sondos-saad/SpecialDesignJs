
let backgroundOption = true;
let backgroundInterval;
//check if there is local storage color option
let mainColors = localStorage.getItem('color_option');
if (mainColors !== null){
    document.documentElement.style.setProperty('--main-color' ,mainColors) ;
    document.querySelectorAll('.colors-list li').forEach(element =>{
        element.classList.remove('active')
        if(element.dataset.color === mainColors){
            element.classList.add('active')
        }
    })  
}
// start setting box
//check if there's local storage random background item
let backgroundLocalItem = localStorage.getItem("background_option");
//check if random background local storage is not empty
if(backgroundLocalItem !== null){
    if(backgroundLocalItem === "true"){
        backgroundOption = true;
    }else{
        backgroundOption = false;
    }
    // remove active class from all spans
    document.querySelectorAll(".random-background span").forEach(element =>{
        element.classList.remove("active");
    })
}

if(backgroundLocalItem === "true"){
   document.querySelector(".yes").classList.add("active") 
}else{
    document.querySelector(".no").classList.add("active") 
}

// toggle spin class on icon
document.querySelector('.toggle-settings .fa-gear').onclick = function(){
    this.classList.toggle('fa-spin');
    document.querySelector('.settings-box').classList.toggle('open');
};

// switch color 
const colorLi = document.querySelectorAll(".colors-list li");
colorLi.forEach(li =>{
    li.addEventListener("click", (e) =>{
        document.documentElement.style.setProperty('--main-color' ,e.target.dataset.color);
        //set color in local storage
        localStorage.setItem("color_option", e.target.dataset.color);
        handelActive(e)
    })
});

// switch background option list 
const randomBackEl = document.querySelectorAll(".random-background span");
randomBackEl.forEach(span =>{
    span.addEventListener("click", (e) =>{
        // active class
        handelActive(e)
        if(e.target.dataset.background ==="yes"){
            backgroundOption = true;
            randomizeImage()
            localStorage.setItem("background_option", true)
        }else{
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option", false)
        }
    })
});

// end setting box

// start random bg landing page
let landingPage = document.querySelector(".landing-page");
let imgArray = ["photo1.jpg","photo2.jpg","photo3.jpg","photo4.png","photo5.png"];
        //random Background option
 
 function randomizeImage(){
     if(backgroundOption === true){
        backgroundInterval= setInterval(()=>{
            let randomNumber = Math.floor(Math.random() * imgArray.length);
            landingPage.style.backgroundImage = 'url("images/' + imgArray[randomNumber] + '")'
        },10000);
     }
 }
 randomizeImage()

// end random bg landing page

//Select Skills Selector
 let ourSkills = document.querySelector(".skills");
 window.onscroll = function (){
    // skills offset Top
    let skillsOffsetTop = ourSkills.offsetTop;
    // skills outer height
    let skillsOuterHeight = ourSkills.offsetHeight;
    // window height
    let windowHeight = this.innerHeight;
    // window scroll top
    let windowScrollTop = this.pageYOffset;
    if(windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight){
        let allSkills = document.querySelectorAll(".skills-box .skill-progress span");
        allSkills.forEach(skill =>{
            skill.style.width = skill.dataset.progress;
        })
    }
 };

//  create popup with the image
 let ourGallery = document.querySelectorAll('.gallery img');
 ourGallery.forEach(imgItem =>{
     imgItem.addEventListener('click', (e)=>{
        // create overlay element
        let overlay =document.createElement("div");
        overlay.className= 'popup-overlay';
        document.body.appendChild(overlay);
        let popupBox = document.createElement('div');
        popupBox.className= 'popup-box';

        if(imgItem.alt !== null){
            let imgHeading = document.createElement('h3');
            let imgText = document.createTextNode(imgItem.alt);
            imgHeading.appendChild(imgText); 
            popupBox.appendChild(imgHeading)
        }

        let popupImage =document.createElement('img');
        popupImage.src = imgItem.src;
        popupBox.appendChild(popupImage);
        document.body.appendChild(popupBox);

        let closeButton = document.createElement('span');
        let closeButtonText = document.createTextNode("X");
        closeButton.appendChild(closeButtonText);
        closeButton.className = 'close-button';
        popupBox.appendChild(closeButton)
         
     });
 })

//  close popup
document.addEventListener('click' , function(e){
      if(e.target.className == 'close-button'){
          e.target.parentNode.remove();
          document.querySelector(".popup-overlay").remove()
      }
})

//bullets and nav Links
const allBullets = document.querySelectorAll('.nav-bullets .bullet');
const allLinks = document.querySelectorAll('.links a');

function scrollToSomeWhere(elements) {
    elements.forEach(ele =>{
        ele.addEventListener('click', (e)=>{
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior:'smooth'
            })
        })
})
}

scrollToSomeWhere(allBullets);
scrollToSomeWhere(allLinks)

// Handel active state
function handelActive(ev){
    ev.target.parentElement.querySelectorAll('.active').forEach(element =>{
        element.classList.remove('active');
    });
    ev.target.classList.add('active')
}

//show or hidden bullets
let bulletSpan = document.querySelectorAll('.bullets-option span');
let bulletsContainer = document.querySelector('.nav-bullets');
let bulletLocalItem = localStorage.getItem('bullets_option');

if(bulletLocalItem !== null){
    bulletSpan.forEach(span =>{
        span.classList.remove('active')
    })
    if(bulletLocalItem === "block"){
        bulletsContainer.style.display ="block"
        document.querySelector('.bullets-option .yes').classList.add('active')
    }else{
        bulletsContainer.style.display ="none"
        document.querySelector('.bullets-option .no').classList.add('active')
    }
}

bulletSpan.forEach(span =>{
    span.addEventListener('click', (e)=>{
        if(span.dataset.display === 'show'){
            bulletsContainer.style.display ="block"
            localStorage.setItem('bullets_option' , 'block')
        }else{
            bulletsContainer.style.display ="none"
            localStorage.setItem('bullets_option' , 'none')

        }
        handelActive(e)
    })
})

//reset button
document.querySelector('.reset-options').onclick =function(){
    localStorage.removeItem('bullets_option')
    localStorage.removeItem('color_option')
    localStorage.removeItem('background_option')
    window.location.reload();
}

// toggle Menu
let toggleBtn = document.querySelector('.toggle-menu');
let tLinks = document.querySelector('.links');

toggleBtn.onclick = function(e){
    e.stopPropagation();
    this.classList.toggle('menu-active');
    tLinks.classList.toggle('open');

}
document.addEventListener('click', (e)=>{
    if(e.target !== toggleBtn && e.target !== tLinks){
        if(tLinks.classList.contains('open')){
            toggleBtn.classList.toggle('menu-active');
            tLinks.classList.toggle('open');
        }
    }
})
tLinks.onclick =function(e){
    e.stopPropagation();
}
