let myImage = document.querySelector('img')
myImage.onclick = function() {
    let mySrc = myImage.getAttribute('src')
    if(mySrc === 'images/firefox-icon.png') {
        myImage.setAttribute('src', 'images/意境.jpg')
    }else {
        myImage.setAttribute('src', 'image/firefox-icon.png')
    }
}

let myButton = document.querySelector('button')
let myHeading = document.querySelector('h1')

function setUserName() {    
    let myName = prompt('请输入你的名字')
    if(!myName || myName === null) {
        setUserName()
    }else {
        localStorage.setItem('name', myName)
        myHeading.textContent = '你好，' + myName
    }
}

if(!localStorage.getItem('name')) {
    setUserName()
}else {
    let storedName = localStorage.getItem('name')
    myHeading.textContent = '欢迎回来，' + storedName
}



myButton.onclick = function() {
    setUserName()
}