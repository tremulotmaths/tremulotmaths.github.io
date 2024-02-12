document.addEventListener("DOMContentLoaded", function () {
    const flashcardContainer = document.getElementById("flashcard-container");
    const flashcards = [];

    // Replace this JSON with your own flashcard data
    const flashcardData = [
        { front: "$2+\dfrac{1}{3}$", back: "Answer 1" },
        { front: "$2+3$", back: "Answer 2" },
        { front: "Question 3", back: "Answer 3" },
        // Add more flashcards as needed
    ];

    let currentCardIndex = 0;

    function createFlashcard(card) {
        const flashcard = document.createElement("div");
        flashcard.classList.add("flashcard");

        const front = document.createElement("div");
        front.classList.add("front");
        front.innerHTML = card.front;

        const back = document.createElement("div");
        back.classList.add("back");
        back.innerHTML = card.back;

        flashcard.appendChild(front);
        flashcard.appendChild(back);

        flashcards.push(flashcard);
        flashcardContainer.appendChild(flashcard);

        flashcard.addEventListener("click", function () {
            flashcard.classList.toggle("flipped");
        });
    }

    function showCard(index) {
        flashcards.forEach((card, i) => {
            card.style.display = i === index ? "block" : "none";
        });
    }


    

    document.addEventListener("keydown", function (event) {
        if (event.key === "ArrowRight") {
            currentCardIndex = (currentCardIndex + 1) % flashcardData.length;
            showCard(currentCardIndex);
        } else if (event.key === "ArrowLeft") {
            currentCardIndex = (currentCardIndex - 1 + flashcardData.length) % flashcardData.length;
            showCard(currentCardIndex);
        }
    });

    flashcardData.forEach(card => {
        createFlashcard(card);
    });

    showCard(currentCardIndex);
});
