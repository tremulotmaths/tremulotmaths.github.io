<!DOCTYPE html>

<html lang="fr">

<head>
		<meta charset=utf-8">
		<title>Réponse PHP</title>
</head>

	<body>
		<?php
			if (isset($_GET['nom1'])) {
				$nom = $_GET['nom1'];
				}
			else {
				$nom = 'Inconnu';
				} ?>
		
		<h2>Bonjour, <?php echo $nom ?></h2>
		<?php
			if (!empty($_GET['email1'])) {
				echo "Votre email est : ".$_GET['email1'];
				}
			else {
				echo "Vous n'avez pas saisi d'email !";
			}
			echo "<br/> Les infos sur votre navigateur et système sont : ".$_SERVER['HTTP_USER_AGENT'];
			echo "<br/>Votre adresse IP est : ".$_SERVER['REMOTE_ADDR'];
		?>
		
	</body>

</html>
