function afficherContenu(section) {
  var sections = document.querySelectorAll('.contenu-section');
  sections.forEach(function(section) {
    section.style.display = 'none';
  });


  var sectionChoisie = document.getElementById(section);
  sectionChoisie.style.display = 'block';
}