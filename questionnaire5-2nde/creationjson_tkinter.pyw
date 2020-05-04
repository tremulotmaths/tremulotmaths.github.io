#!/usr/bin/env python
# -*- coding: utf-8 -*-

from tkinter import *
import json   # Pour pouvoir exporter le fichier au format JSON
import os     # Permet la création de dossiers
import fonctions_alea as fcta   # fichier de génération aléatoire des questions


# --- Fonction permettant de définir le nom du questionnaire ---

def valid_nom(questionnaire):
    """Cette fonction permet d'enregistrer le nom du questionnaire, d'initialiser la liste des questions,
    et d'afficher le nom dans le cadre en haut de la fenêtre"""
    global cadre_nom
    questionnaire["nom"]=champ_nom.get()    # On enregistre le nom entré
    questionnaire["questions"]=[]           # On initialise la liste des questions
    cadre_nom.destroy()                     # On détruit le cadre
    
    # On redéfinit le cadre avec cette fois un Label à la place de l'Entry 
    cadre_nom=LabelFrame(cadre_principal,text="Nom du questionnaire",padx=20,pady=20)
    cadre_nom.grid(row=0,column=0)
    text_nom=Label(cadre_nom,text=questionnaire["nom"],width=78)
    text_nom.grid()
    
    choix_type(questionnaire,0)


# --- Fonctions permettant de définir chaque question (énoncé, réponses avec scores) ---

def choix_type(questionnaire,i):
    """Cette fonction permet de choisir le type de la question i+1 dans un second cadre"""
    global cadre_question
    num=i+1
    cadre_question=LabelFrame(cadre_principal,text="Question "+str(num),padx=20,pady=20)
    cadre_question.grid(row=1,column=0)
    
    text_type=Label(cadre_question,text="Veuillez choisir le type de question voulue dans le menu : ",width=62).grid(row=0,column=0)
    
    # Définition du menu avec les 4 types proposés
    # Un bouton qui permet de dérouler le menu
    bouton_type=Menubutton(cadre_question,text="Types disponibles",borderwidth=3,relief='raised')
    bouton_type.grid(row=0,column=1)
    # Le menu avec les 4 types
    type_var=StringVar()
    menu_type=Menu(bouton_type,tearoff=0)    # le menu est défini comme enfant du bouton
    menu_type.add_radiobutton(label="Question ouverte",variable=type_var,value="ouverte",command=lambda:nouvelle_question(questionnaire,i,type_var))
    menu_type.add_radiobutton(label="Question à choix multiples",variable=type_var,value="QCM",command=lambda:nouvelle_question(questionnaire,i,type_var))
    menu_type.add_radiobutton(label="Question aléatoire de changement de base",variable=type_var,value="chgt base",command=lambda:nouvelle_question(questionnaire,i,type_var))
    menu_type.add_radiobutton(label="Question aléatoire de conversion C2",variable=type_var,value="conversion C2",command=lambda:nouvelle_question(questionnaire,i,type_var))
    bouton_type['menu']=menu_type    # Le menu est appliqué au bouton
    

def nouvelle_question(questionnaire,i,type_var):
    """Le type de la question étant choisi, on définit les premiers éléments de la question (ou tous les éléments si la question est aléatoire)"""
    try:
        type_question=type_var.get()    # On capte le type, valable si c'est le premier passage
    except:
        type_question=type_var          # Valable si la proposition précédente n'a pas été validée (voir la fonction affiche_question) 
    
    global cadre_question
    cadre_question.destroy()    # On détruit le second cadre pour le récréer ensuite vide et lui définir de nouveaux éléments
    
    # On crée à nouveau le second cadre
    num=i+1
    cadre_question=LabelFrame(cadre_principal,text="Question "+str(num),padx=20,pady=20)
    cadre_question.grid(row=1,column=0)
    
    if type_question in ["ouverte","QCM"]:    # Tout doit être défini par l'utilisateur
        # Initialisation de la question avec son type
        question={}
        question['type']=type_question
        
        # On présente les différents éléments à l'utilisateur
        Label(cadre_question,text="Veuillez entrer l'énoncé de la question",width=77).grid(row=0,column=0,columnspan=2)
        Label(cadre_question,text="et choisir le nombre de réponses que vous voulez renseigner").grid(row=1,column=0,columnspan=2)
        
        # L'utilisateur renseigne l'énoncé de la question
        Label(cadre_question,text="Enoncé : ").grid(row=2,column=0,columnspan=2,sticky='w')
        champ_enonce=Entry(cadre_question,width=77)
        champ_enonce.grid(row=3,column=0,columnspan=2)
        
        # Explications sur le fait de proposer plusieurs réponses. 2 versions de texte, une pour le type "ouverte", une pour le type "QCM"
        texte_affiche_1={"ouverte":"Pour une question ouverte, plusieurs réponses peuvent être proposées :","QCM":"Pour une question à choix multiples, plusieurs réponses sont forcément proposées :"}
        Label(cadre_question,text=texte_affiche_1[question['type']]).grid(row=4,column=0,sticky='w')
        texte_affiche_2={"ouverte":"- une ou plusieurs bonnes réponses avec un score de 100 chacune","QCM":"- la bonne réponse avec un score de 100"}
        Label(cadre_question,text=texte_affiche_2[question['type']]).grid(row=5,column=0,sticky='w')
        texte_affiche_3={"ouverte":"- une ou plusieurs réponses incomplètes avec un score entier entre 1 et 99","QCM":"- une ou plusieurs mauvaises réponses avec un score de 0"}
        Label(cadre_question,text=texte_affiche_3[question['type']]).grid(row=6,column=0,sticky='w')
                
        # L'utilisateur choisit le nombre de réponses possibles
        Label(cadre_question,text="Nombre de réponses souhaité : ").grid(row=7,column=0,sticky='e')
        bouton_nbre=Menubutton(cadre_question,text="choix possibles",borderwidth=3,relief='raised')
        bouton_nbre.grid(row=7,column=1,sticky='w')
        nbre_var=StringVar()
        menu_nbre=Menu(bouton_nbre,tearoff=0)
        menu_nbre.add_radiobutton(label="1 réponse",variable=nbre_var,value=1,command=lambda:entree_reponses(questionnaire,i,question,champ_enonce,nbre_var))
        menu_nbre.add_radiobutton(label="2 réponses",variable=nbre_var,value=2,command=lambda:entree_reponses(questionnaire,i,question,champ_enonce,nbre_var))
        menu_nbre.add_radiobutton(label="3 réponses",variable=nbre_var,value=3,command=lambda:entree_reponses(questionnaire,i,question,champ_enonce,nbre_var))
        menu_nbre.add_radiobutton(label="4 réponses",variable=nbre_var,value=4,command=lambda:entree_reponses(questionnaire,i,question,champ_enonce,nbre_var))
        bouton_nbre['menu']=menu_nbre
        
    else:    # Toutes les informations de la question vont être créées aléatoirement avec des fonctions définies dans le fichier fonctions_alea.py
        if type_question=="chgt base":    # aléa de changement de base
            question=fcta.changement_de_base(i+1)
        
        else:                     # aléa de conversion C2
            question=fcta.complement_2(i+1)
        # Ici tout a été défini aléatoirement, on peut donc afficher ces informations pour validation
        affiche_question(questionnaire,i,question)


def entree_reponses(questionnaire,i,question,champ_enonce,nbre_var):
    """Cette fonction permet pour chaque question non aléatoire de définir les réponses possibles et les scores associés"""
    global cadre_question
    # On enregistre l'énoncé de la question renseigné par l'utilisateur
    question['textquestion']=champ_enonce.get()
    # On enregistre le numéro de la question
    num=i+1
    question['numero']=num
    # On capte le nombre de réponses demandé
    nbre_rep=int(nbre_var.get())
    
    # On détruit le cadre pour le récréer avec l'énoncé sous forme de Label et entrer les réponses et scores
    cadre_question.destroy()
    cadre_question=LabelFrame(cadre_principal,text="Question "+str(num),padx=20,pady=20)
    cadre_question.grid(row=1,column=0)
    Label(cadre_question,text="Enoncé :").grid(row=0,column=0,sticky='w')
    Label(cadre_question,text=question["textquestion"],width=77,padx=5,pady=5).grid(row=2,column=0,columnspan=4,sticky='w')
    
    liste_rep=[]          # c'est la liste des éléments Entry du cadre liés aux réponses (même format que question['reponses] : liste de dictionnaires)
    for k in range(nbre_rep):
        rep={}            # rep est le dictionnaire avec une Entry 'textrep' et une Entry 'score' correspondant à la réponse d'indice k
        Label(cadre_question,text="Réponse :").grid(row=3+k,column=0,sticky='w')
        rep['textrep']=Entry(cadre_question,width=60)
        rep['textrep'].grid(row=3+k,column=1,sticky='w')
        Label(cadre_question,text="Score attribué : ").grid(row=3+k,column=2,sticky='e')
        rep['score']=Entry(cadre_question,width=5)
        rep['score'].grid(row=3+k,column=3,columnspan=2,sticky='w')
        liste_rep.append(rep)
    
    bouton_valid_rep=Button(cadre_question,text="Valider",command=lambda:valid_reponses(questionnaire,i,question,liste_rep))
    bouton_valid_rep.grid(row=3+nbre_rep,column=2)


def valid_reponses(questionnaire,i,question,liste_rep):
    """Cette fonction permet d'enregistrer les réponses proposées pour la question"""
    global cadre_question
    
    question['reponses']=[]
    
    for k in range(len(liste_rep)):
        reponse={}
        reponse['textrep']=liste_rep[k]['textrep'].get()
        reponse['score']=int(liste_rep[k]['score'].get())
        question['reponses'].append(reponse)
    
    cadre_question.destroy()
    
    num=i+1
    cadre_question=LabelFrame(cadre_principal,text="Question "+str(num),padx=20,pady=20)
    cadre_question.grid(row=1,column=0)
    
    # Ici tout a été défini par l'utilisateur, on peut donc afficher ces informations pour validation
    affiche_question(questionnaire,i,question)


def affiche_question(questionnaire,i,question):
    """Cette fonction affiche toutes les informations de la question numéro i+1 pour validation"""
    # On affiche les informations dans le second cadre
    global cadre_question
    num=i+1
    Label(cadre_question,text="Voici les données de la question "+str(num),width=77).grid(row=0,column=0,columnspan=4)
    Label(cadre_question,text="Enoncé : ",width=10).grid(row=1,column=0,sticky='w')
    Label(cadre_question,text=question["textquestion"]).grid(row=2,column=0,columnspan=4,sticky='w')
    for k in range(len(question['reponses'])):
        Label(cadre_question,text="Réponse : ",width=10).grid(row=3+k,column=0,sticky='w')
        Label(cadre_question,text=question["reponses"][k]["textrep"]).grid(row=3+k,column=1,columnspan=2,sticky='w')
        Label(cadre_question,text="Score attribué : ",width=17).grid(row=3+k,column=2,sticky='e')
        Label(cadre_question,text=str(question["reponses"][k]["score"]),width=3).grid(row=3+k,column=3,sticky='w')
    
    # On affiche un sous-cadre du second qui permet à l'utilisateur de valider la question ou d'en définir une autre à la place
    global cadre_conserve
    cadre_conserve=Frame(cadre_question,padx=5,pady=5,bg='white')
    cadre_conserve.grid(row=4+len(question['reponses']),column=2,columnspan=3)
    Label(cadre_conserve,text="Voulez-vous conserver cette question ? ",bg='white').grid(row=0,column=0)
    # On valide la question
    Button(cadre_conserve,text="Oui",command=lambda:conserve_question(questionnaire,i,question)).grid(row=0,column=1)
    # On relance la définition d'une question de même type et de même numéro
    Button(cadre_conserve,text="Non",command=lambda:nouvelle_question(questionnaire,i,question['type'])).grid(row=0,column=2)

def conserve_question(questionnaire,i,question):
    """Cette fonction enregistre la question numéro i+1 dans le questionnaire et demande si le questionnaire est terminé"""
    # On ajoute la question au questionnaire
    questionnaire["questions"].append(question)
    
    # On détruit le second cadre
    global cadre_question
    cadre_question.destroy()
    
    # On crée un nouveau cadre qui permet à l'utilisateur de poursuivre avec d'autres questions ou de terminer le questionnaire
    global cadre_suppl
    num=i+1
    cadre_suppl=LabelFrame(cadre_principal,text="Fin du questionnaire ?",padx=20,pady=20)
    cadre_suppl.grid(row=2,column=0)
    Label(cadre_suppl,text="Vous avez "+str(num)+" question(s)",bg='white',padx=5,pady=5,width=77).grid(row=0,column=0,columnspan=2,sticky='w')
    # On ajoute une question
    Button(cadre_suppl,text=" Ajouter une question  ",command=lambda:ajouter_question(questionnaire,i),padx=10,pady=10).grid(row=1,column=0)
    # On lance la fermeture du questionnaire
    Button(cadre_suppl,text=" Questionnaire terminé ",command=lambda:fin_questionnaire(questionnaire),padx=10,pady=10).grid(row=1,column=1)

def ajouter_question(questionnaire,i):
    """Cette fonction permet d'enchaîner le questionnaire avec une question supplémentaire"""
    # On détruit le dernier cadre créé
    global cadre_suppl
    cadre_suppl.destroy()
    # On lance la création d'une nouvelle question par le choix de son type, et en incrémentant sa position dans la liste
    choix_type(questionnaire,i+1)


# --- Fonction permettant de clore le questionnaire ---

def fin_questionnaire(questionnaire):
    """Cette fonction enregistre le questionnaire dans un fichier JSON et permet à l'utilisateur de fermer la fenêtre"""
    # On détruit le dernier cadre créé
    global cadre_suppl
    cadre_suppl.destroy() 
    
    nom_fichier="default"     # C'est le nom que portera le fichier json
    #--- Création du dossier Questionnaires qui va contenir le fichier json
    try:
        os.mkdir("Questionnaires")
    except OSError:
        pass  # Si le dossier Questionnaires existe déjà, on ne fait rien
    
    #--- Création du fichier json
    fichier=open("Questionnaires/"+nom_fichier+".json","w")
    json.dump(questionnaire,fichier,indent=4) # indent=4 permet de le présenter sous forme indentée
    fichier.close()
    
    #--- Petit mot de la fin pour terminer
    cadre_fin=LabelFrame(cadre_principal,text="Vous avez terminé",padx=20,pady=20)
    cadre_fin.grid(row=1,column=0)
    Label(cadre_fin,text="Le questionnaire "+questionnaire["nom"]+" comporte "+str(len(questionnaire["questions"]))+" questions.",padx=5,pady=5,width=77).grid(row=1,column=0)
    Label(cadre_fin,text="Il a été enregistré dans Questionnaires/"+nom_fichier+".json",padx=5,pady=5).grid(row=2,column=0)
    Button(cadre_fin,text="Terminer",command=fen.destroy,padx=10,pady=10).grid(row=3,column=0)


# --- PARTIE PRINCIPALE ---
    
questionnaire={}

# On crée la fenêtre unique
fen=Tk()
fen.title("Création Questionnaire")

# Intégration d'une image de fond
photo=PhotoImage(file="images/bg.png")
fond=Canvas(fen,width=1000,height=700)
image=fond.create_image(0,0,anchor=NW,image=photo,)
fond.grid(row=0,column=0,rowspan=3)

# Dans la fenêtre, on crée un cadre principal par-dessus l'image de fond
cadre_principal=Frame(fen,padx=20,pady=20)
cadre_principal.grid(row=0,column=0)

# Dans le cadre principal, on crée un cadre qui permet de définir puis d'afficher le nom du questionnaire
cadre_nom=LabelFrame(cadre_principal,text="Nom du questionnaire",padx=20,pady=20)
cadre_nom.grid(row=0,column=0)

# Contenu du cadre
intro=Label(cadre_nom,text="Entrer le nom de questionnaire :   ")
intro.grid(row=0,column=0)
champ_nom=Entry(cadre_nom,width=53)
champ_nom.grid(row=0,column=1)
bouton_valid_nom=Button(cadre_nom,text="Valider",command=lambda:valid_nom(questionnaire))
bouton_valid_nom.grid(row=0,column=2)
    
fen.mainloop()
