window.addEventListener("scroll", function(event){
    var scroll = this.scrollY;
    if(scroll > 0) {
       this.document.getElementById("header").classList.add("sticky");
    } else {
       this.document.getElementById("header").classList.remove("sticky");
    }
    });

