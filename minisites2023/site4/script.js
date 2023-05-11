
document.addEventListener('click', function(event) {
  if (event.target.classList.contains('nav-link')) {
    var navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(function(link) {
      link.classList.remove('active');
    });

    event.target.classList.add('active');
  }
});

