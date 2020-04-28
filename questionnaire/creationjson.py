#!/usr/bin/env python
# -*- coding: utf-8 -*-

# version de creationjson.py d'Alaric puis en collaboration avec Arnaud, Dominique et Guillaume

import json   # Pour pouvoir exporter le fichier au format JSON
import os     # Permet la création de dossiers
import fonctions_alea as fcta   # fichier de génération aléatoire des questions

# --- Fonction permettant de définir les réponses avec score à une question ouverte ---

def entree_rep(question):
    """Cette fonction permet de définir les réponses avec score à une question en adaptant le texte au mode ouverte ou QCM"""
    
    texte_affiche_1={
    "ouverte":"""
    Pour chaque réponse, valider le texte puis le score attribué
    (100 pour une réponse correcte ou un autre entier
     en pourcentage pour une réponse incomplète).
    Une entrée de texte vide indiquera qu'il n'y a plus de réponse à donner""",
    "QCM":"""
    Pour chaque réponse, valider le texte
    puis renseigner 100 pour la réponse correcte
    et 0 pour les réponses incorrectes.
    Une entrée de texte vide indiquera qu'il n'y a plus de réponse à donner."""}
    texte_affiche_2={
    "ouverte":"Indiquer le score correspondant : ",
    "QCM":"Indiquer si cette réponse est correcte (100) ou incorrecte (0) : "}
    
    print(texte_affiche_1[question["type"]])
    
    k=0   # Initialise l'indice de la réponse
    texte="au moins 1 réponse"   # Pour entrer une 1ère fois dans la boucle
    
    while texte!="":
        texte=input("Entrer votre réponse numéro "+str(k+1)+" : ")
        if texte!="":   # Une réponse vide marque la fin des réponses à la question
            reponse={}
            
            # Enregistrement de la réponse attendue
            reponse["textrep"]=texte
            
            # Entrée du score associé et test de sa validité
            score_valide=False
            while not score_valide:
                score=input(texte_affiche_2[question["type"]])
                try:
                    score=int(score)        # Etape franchie si le score est bien un entier
                    if question["type"]=="ouverte":
                        if 0<=score<=100:
                            score_valide=True
                            reponse["score"]=score
                        else:
                            print("ATTENTION ! Le score doit être un entier entre 0 et 100")
                    elif question["type"]=="QCM":
                        if score in [0,100]:
                            score_valide=True
                            reponse["score"]=score
                        else:
                            print("ATTENTION ! Le score doit être 0 ou 100")
                except:            # Instruction appliquée si le score n'est pas un entier
                    print("ATTENTION ! Le score doit être un entier")
            
            # Ajout de la réponse à la liste des réponses
            question["reponses"].append(reponse)
            k+=1
    

# --- PARTIE PRINCIPALE ---

nom_fichier="default"     # C'est le nom que portera le fichier json
nom_questionnaire=input("Entrer le nom du questionnaire : ")   
liste_questions=[]     # Liste contenant l'ensemble des questions (avec réponses et scores) du questionnaire

i=0      # Initialise l'indice de la question
type_question="0"   # Pour entrer une 1ère fois dans la boucle

while(type_question in ["0","1","2","3"]):
    num=i+1
    print()
    print("Indiquer le type de la question numéro",num,"\n      0 : Question ouverte,\n      1 : QCM,\n      2 : Question aléatoire de changement de base,\n      3 : Question aléatoire de conversion C2\n      Autre entrée : Fin du questionnaire")
    type_question=input("Choix: ")
    print()
        
    if type_question in ["0","1"]:   # si validation par entrée sans type, fin du questionnaire et on génère le fichier json
        
        question={}    # Dictionnaire contenant l'énoncé de la question, son numéro, son type, ses réponses
        question["textquestion"]=input("Entrer l'énoncé de la question "+str(num)+" : ")
        question["numero"]=num
        question["reponses"]=[]
        
        if type_question=="0":
            question["type"]='ouverte'
        else:
            question["type"]='QCM'
        
        entree_rep(question)
        liste_questions.append(question)
    
    elif type_question in ["2","3"]:
        if type_question=="2":    # aléa de changement de base
            question=fcta.changement_de_base(i+1)
        
        else:                     # aléa de conversion C2
            question=fcta.complement_2(i+1)
            
        print("Question",num,":",question["textquestion"])
        print("Réponse :"+question["reponses"][0]["textrep"])
        print("Score :",question["reponses"][0]["score"])
        liste_questions.append(question)
    i+=1       

questionnaire={"nom":nom_questionnaire,"questions":liste_questions}

#--- Création du dossier Questionnaires qui va contenir le fichier json

try:
    os.mkdir("Questionnaires")
except OSError: 
    pass  #Si le dossier Questionnaires existe déjà, on ne fait rien

#--- Création du fichier json

fichier=open("Questionnaires/"+nom_fichier+".json","w")
json.dump(questionnaire,fichier,indent=4) # indent=4 permet de le présenter sous forme indentée
fichier.close()
