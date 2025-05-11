document.addEventListener("DOMContentLoaded", function () {

    const items = document.querySelectorAll("#onglets li");
    const infoContainer = document.getElementById("info-container");

    const scientists = {
        greek: [
            { name: "Archimedes", image: "pythagore.jpg", description: "a" },
            { name: "Pythagorus", image: "archimede.jpg", description:"X"},
            { name: "Thales", image: "archimede.jpg", description: "X" },
            { name: "Euclides", image: "archimede.jpg", description:"X" },
            { name: "Hypatia", image: "archimede.jpg", description: "X" }
        ],

        polish: [
            { name: "Helena Rasiowa", image: "pythagore.jpg", description: "X" },
            { name: "Marie Skłodowska-Curie", image: "archimede.jpg", description: "X" },
            { name: "Nicolaus Copernicus", image: "archimede.jpg", description:"X" }
        ],

        italian: [
            { name: "Leornardo Da Vinci", image: "galilee.jpg", description: "X" },
            { name: "Galilleo", image: "davinci.jpg", description:"X" },
            { name: "Maria Gaetana Agnesi", image: "Maria_Gaetana_Agnesi.jpg", description: "Famous mathematician women", link:"../Page scientifique/Page scientifique base.html" }
        ],

        german: [
            { name: "Albert Einstein ", image: "pythagore.jpg", description:"X" },
            { name: "Nikola Tesla", image: "archimede.jpg", description: "X" },
            { name: "Johannes Kepler ", image: "archimede.jpg", description: "X" },
            { name: "Leibniz", image: "archimede.jpg", description: "X" },
            { name: "Emmy Noether", image: "archimede.jpg", description: "X" }
        ],

        french: [
            { name: "Antoine Lavoisier", image: "pascal.jpg", description: "X"},
            { name: "Sophie Germain", image: "curie.jpg", description:"X"  },
            { name: "Denis Papin", image: "curie.jpg", description: "X" },
            { name: "Emilie du Chatelet", image: "curie.jpg", description:"X"  },
            { name: "Pasteur", image: "curie.jpg", description: "X" }
        ],

        british: [
            { name: "Ada Lovelace", image: "pythagore.jpg", description: "X"  },
            { name: "Alan Turing", image: "archimede.jpg", description: "X" },
            { name: "Isaac Newton", image: "archimede.jpg", description: "X" }
        ],

        asian: [
            { name: "Tasuku Honjo", image: "pythagore.jpg", description:"X" },
            { name: "Hwang Woo Suk", image: "archimede.jpg", description: "X"},
            { name: "Wan Yue", image: "archimede.jpg", description: "X" }
         ],

        american: [
                { name: "Robert Oppenheimer", image: "pythagore.jpg", description: "X"},
                { name: "Thomas Edison", image: "archimede.jpg", description:"X" },
                { name: "Dorothy Vaughn", image: "archimede.jpg", description: "X" }
        ],
    };

    items.forEach(item => {
        item.addEventListener("click", function () {
            const key = this.id;
            if (!scientists[key]) return;
    
            infoContainer.innerHTML = "";
    
            scientists[key].forEach(scientist => {
                const scientistBox = document.createElement("div");
                scientistBox.classList.add("scientist-box");
    
                const img = document.createElement("img");
                img.src = scientist.image;
                img.alt = scientist.name;
    
                const name = document.createElement("h2");
                name.textContent = scientist.name;
    
                const description = document.createElement("p");
                description.textContent = scientist.description;
    
                const link = document.createElement("a");
                link.href = scientist.link;
                link.textContent = "See more";
    
                scientistBox.append(img, name, description, link);
                infoContainer.appendChild(scientistBox);
            });
    
            infoContainer.style.display = "flex";
            infoContainer.style.position = "absolute";
            infoContainer.style.top = "100%"; 
            infoContainer.style.left = "0";
        });
    });
});


function agrandirImage() {
    document.getElementById('photo').style.transform = 'scale(1.05)';
}

function reduireImage() {
    document.getElementById('photo').style.transform = 'scale(1)';
}