#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Programme annexe initié par Alaric
# Ce programme permet de générer aléatoirement une question de 
# chnagement de base ou une question de conversion C2 au format 
# utilisé dans le programme principal creationjson.py

import random

def list_int_to_str(L):       # prend comme argument une liste
    """transforme une liste en chaîne de caractères"""
    return "".join(str(L[i]) for i in range (len(L)))

def test_list_int_to_str():
	"""Test de la fonction list_int_to_str"""
	L=[1,2,3,4]
	assert list_int_to_str(L)=='1234'

# --- choix de la base de départ et de la base d'arrivée ---

def choix_bases():
    """choix aléatoire de la base départ et de la base d'arrivée"""
    liste_bases=[2,10,16]
    base_depart=base_arrivee=0
    while(base_depart==base_arrivee):
        base_depart=random.choice(liste_bases)
        base_arrivee=random.choice(liste_bases)
    return base_depart,base_arrivee

def test_choix_bases():
	"""Test de la fonction choix_bases"""
	assert choix_bases() in [(2,10),(2,16),(10,2),(10,16),(16,2),(16,10)]

# --- fonctions de conversion ------------------------------

def convert_dec2bin(nb_dec):
    """met sous forme binaire (str sur 8 caractères) un nombre donné sous forme décimale (int)"""
    liste_bin=[]   # dans un premier temps, le résultat est dans cette liste
    for i in range (8):
        nb_bin=nb_dec%2 
        nb_dec//=2 
        liste_bin.append(nb_bin)
    liste_bin.reverse()       # car le poids fort est le dernier bit de la liste
    str_bin=list_int_to_str(liste_bin)
    return str_bin

def test_convert_dec2bin():
    """Test de la fonction convert_dec2bin"""
    assert convert_dec2bin(125)=='01111101'
    assert convert_dec2bin(200)=='11001000'
    assert convert_dec2bin(72)=='01001000'

def convert_dec2hex(nb_dec):
    """met sous forme hexadecimale (str 2 caractères) un nombre entier donné en base 10"""
    liste_base16=[]   # liste qui stockera le résultat
    liste_base10=[10,11,12,13,14,15] 
    liste_hexa=['A','B','C','D','E','F'] 
    for i in range (2):
        nb_hexa=nb_dec%16 
        nb_dec//=16
        if (nb_hexa>9):
            i=0
            for element in liste_base10:
                if (element==nb_hexa):
                    nb_hexa=liste_hexa[i]
                i+=1 
        liste_base16.append(nb_hexa)
    liste_base16.reverse()       # car le poids fort est le dernier bit de la liste
    str_base16=list_int_to_str(liste_base16)
    return str_base16

def test_convert_dec2hex():
    """Test de la fonction convert_dec2bin"""
    assert convert_dec2hex(125)=='7D'
    assert convert_dec2hex(200)=='C8'
    assert convert_dec2hex(72)=='48'

# --- génération d'une question de changement de base au format de la structure de données ----

def changement_de_base(numero):
    """fonction qui génère aléatoirement une question de changement de base 
       au format utilisé dans le programme creationjson.py"""
    # choix aléatoire des bases de départ et d'arrivée
    basedepart,basearrivee=choix_bases()    
    # choix aléatoire d'un entier entre 1 et 255 (codage sur un octet) 
    nb_dec= random.randint(1,255)

    # conversion en binaire 
    representation_base2=convert_dec2bin(nb_dec)    
    # conversion en hexa methode1
    representation_base16=convert_dec2hex(nb_dec)
    
    # prise en compte de la base de départ,de la base d'arrivée, et de la représentation de départ dans la question    
    if(basedepart==2):        
        representation_depart=representation_base2
    elif(basedepart==10):
        representation_depart=str(nb_dec)
    elif(basedepart==16):
        representation_depart=representation_base16

    if(basearrivee==2):
        representation_arrivee=representation_base2
    elif(basearrivee==10):
        representation_arrivee=str(nb_dec)
    elif(basearrivee==16):
        representation_arrivee=representation_base16
        
    # génération du dictionnaire question et affichages
    question={}
    question["type"]='chgt base' 
    question["numero"]=numero
    format_rep={2:' sur un octet',16:' sur 2 caractères',10:''}
    question["textquestion"]='Convertir de la base '+str(basedepart)+' à la base '+str(basearrivee)+format_rep[basearrivee]+' la représentation suivante : '+representation_depart+'.'
    question["reponses"]=[{"textrep": representation_arrivee,"score":100}]
    return question

# --- complément à 2 d'un binaire sur 8 bits au format string

def c2(bin_sur_8_bits):
    """Complément à 2 à partir d'un binaire sur 8 bits sous forme string"""
    c1=[]    # creation de la liste qui contiendra le c1 du nombre à convertir
    c2=[]    # creation de la liste qui contiendra le c2 du nombre à convertir 
    
    retenue=[1]    # initialisation de la 1ere retenue à 1 faisant le + 1 qui permet de passer du c1 au c2    
    
    for i in range (len(bin_sur_8_bits)):    # boucle permettant de calculer le C1
        if(bin_sur_8_bits[i]=='1'):
            c1.append(0)
        else:
            c1.append(1)
    inc=0
    for i in range (8):                 # boucle permettant de calculer le c2
        c2.append(c1[(7-i)]^retenue[i]) # l'addition binaire sans gestion de retenue correspond à un ou exclusif

        if (int(c1[(7-i)])&int(retenue[i])==1):    #permet de gérer la retenue
            retenue.append(1)    # si 1+1 retenue=1     
        else:
            retenue.append(0)    # si 1+0 ou 0+1 ou 0+0 retenue=0 
    c2.reverse()    # car le poids fort est le dernier bit de la liste
    return list_int_to_str(c2)

def test_c2():
    """Test de la fonction c2"""
    assert c2('01111000')=='10001000'
    assert c2('01001000')=='10111000'
    assert c2('00100000')=='11100000'
    
# --- génération d'une question de complément à 2 au format de la structure de données ----

def complement_2(numero):
    """fonction qui génère aléatoirement une question de conversion C2 
       au format utilisé dans le programme creationjson.py"""
    dec= random.randint(1,128)    # sur 8 bits en c2 la plage est de -128 à +127 (cette fonction n'est utilisée que pour des nombres négatifs)
    
    comp2=c2(convert_dec2bin(dec))

    #test du complément à 2
    #assert 
    
    # génération du dictionnaire questionnaire et affichages
    question={}
    question["type"]='conversion C2' 
    question["numero"]=numero
    question["textquestion"]='Représenter (sur un octet) en notation complément à 2 (C2) le nombre décimal suivant : -'+str(dec)
    
    question["reponses"]=[{"textrep": comp2,"score":100}]
    
    return question



# --- Partie test de la génération de questions ---------------------------

if __name__ == '__main__':
    # Grâce à cette condition, toutes les instructions suivantes ne sont appliquées 
    # que si c'est ce fichier qui est lancé en premier.
    test_list_int_to_str()
    test_choix_bases()
    test_convert_dec2bin()
    test_convert_dec2hex()
    test_c2()
    
    # Test de la fonction changement_de_base()
    for i in range(4):
        question=changement_de_base(i+1)
        print("Question :",question["textquestion"])
        print("Réponse :"+question["reponses"][0]["textrep"])
        print("Score :",question["reponses"][0]["score"])
    
    # Test de la fonction complement_C2()
    for i in range(4,8):
        question=complement_2(i+1)
        print("Question :",question["textquestion"])
        print("Réponse :"+question["reponses"][0]["textrep"])
        print("Score :",question["reponses"][0]["score"])



