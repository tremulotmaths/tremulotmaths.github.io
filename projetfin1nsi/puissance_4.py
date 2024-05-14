#!/usr/bin/env python
# -*- coding: utf-8 -*-

from tkinter import *

def affiche_pion(ligne :int, colonne: int, couleur: int):
    '''
        Affichage d'un pion à la position [ligne][colonne] de la grille
            couleur = 1 -> rouge
            couleur = 2 -> jaune
    '''

    if couleur == 1: # remplacement par un cercle rouge ou jaune selon la valeur de la variable couleur
        can.create_oval(colonne*100+10,ligne*100+10, colonne*100+90, ligne*100+90, fill ='red')
    elif couleur == 2:
        can.create_oval(colonne*100+10,ligne*100+10, colonne*100+90, ligne*100+90, fill ='yellow')

def dessin_jeu():
    for i in range(6): # dessin plateau de jeu
        for j in range(7):
            can.create_oval(j*100+10,i*100+10, j*100+90, i*100+90, fill ='white')

#######################
# VOTRE PROGRAMME ICI #
#######################


def clic(event):
    '''
      Fonction déterminant lors d'un clic-gauche sur la grille le numéro
      de la colonne dans laquelle le clic a eu lieu
    '''
    global joueur, grille # permet de modifier les variables 'joueur' et 'grille' définies dans le programme principal

    colonne = (event.x // 100) # n° de la colonne cliquée

    pass









##########################
# FIN DE VOTRE PROGRAMME #
##########################



fen = Tk()
fen.title('Puissance 4')

can = Canvas(fen, width = 700, height = 600, background='blue')
can.pack()

can.bind('<Button-1>', clic)

dessin_jeu()

fen.mainloop()
