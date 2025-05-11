function agrandirImage() {
    document.getElementById('photo').style.transform = 'scale(1.05)';
}

function reduireImage() {
    document.getElementById('photo').style.transform = 'scale(1)';
}

document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".bouton").forEach(button => {
        button.addEventListener("click", function(event) {
            event.preventDefault();
            let box = this.closest(".box");

            if (box.classList.contains("expanded")) {
                box.classList.remove("expanded");
                this.textContent = "See more";
            } else {
                document.querySelectorAll(".box").forEach(b => {
                    b.classList.remove("expanded");
                    b.querySelector(".bouton").textContent = "See more"; 
                });

                box.classList.add("expanded");
                this.textContent = "See less";
            }
        });
    });
});

function toggleText(button) {
    let box = button.closest(".box");
    let defaultText = box.querySelector(".text-default");
    let hiddenText = box.querySelector(".text-hidden");

    let isAlreadyOpen = hiddenText.style.display === "block";

    document.querySelectorAll(".box").forEach(b => {
        b.querySelector(".text-default").style.display = "block";
        b.querySelector(".text-hidden").style.display = "none";
        b.querySelector("button").textContent = "See more";
    });

    if (!isAlreadyOpen) {
        defaultText.style.display = "none";
        hiddenText.style.display = "block";
        button.textContent = "See less";
    }
}