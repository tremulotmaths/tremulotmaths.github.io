let togg11 = document.getElementById("togg11");
let togg12 = document.getElementById("togg12");
let togg21 = document.getElementById("togg21");
let togg22 = document.getElementById("togg22");
let togg31 = document.getElementById("togg31");
let togg32 = document.getElementById("togg32");
let d11 = document.getElementById("d11");
let d12 = document.getElementById("d12");
let d21 = document.getElementById("d21");
let d22 = document.getElementById("d22");
let d31 = document.getElementById("d31");
let d32 = document.getElementById("d32");

togg11.addEventListener("click", () => {
  if(getComputedStyle(d11).display != "none"){
    d11.style.display = "none";
  } else {
    d11.style.display = "block";
  }
})

togg12.addEventListener("click", () => {
  if(getComputedStyle(d12).display != "none"){
    d12.style.display = "none";
  } else {
    d12.style.display = "block";
  }
})

togg21.addEventListener("click", () => {
  if(getComputedStyle(d21).display != "none"){
    d21.style.display = "none";
  } else {
    d21.style.display = "block";
  }
})

togg22.addEventListener("click", () => {
  if(getComputedStyle(d22).display != "none"){
    d22.style.display = "none";
  } else {
    d22.style.display = "block";
  }
})

togg31.addEventListener("click", () => {
  if(getComputedStyle(d31).display != "none"){
    d31.style.display = "none";
  } else {
    d31.style.display = "block";
  }
})

togg32.addEventListener("click", () => {
  if(getComputedStyle(d32).display != "none"){
    d32.style.display = "none";
  } else {
    d32.style.display = "block";
  }
})

