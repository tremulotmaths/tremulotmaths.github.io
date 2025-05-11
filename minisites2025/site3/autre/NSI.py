#Liste pour chaque type/vérification
alaphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','O','P','Q','R','S','T','U','V','W','X','Y','Z']
hexa_str = ["A", "B", "C" ,"D" , "E", "F"]
decimale_int = [0,1,2,3,4,5,6,7,8,9]
binaire = [0,1]
erreur = 0
boucle = 1
spéciale = {'~'," ", ':', "'", '+', '[', '\\', '@', '^', '{', '%', '(', '-', '"', '*', '|', ',', '&', '<', '`', '}',"", '.', '_', '=', ']', '!', '>', ';', '?', '#', '$', ')', '/' , 'é', 'è', '^', 'ù', '¨', '§' ,'²'}

#Vairable pour les boucles


#########################################################################################################################################################
# Zonne pour les fonctions 

#Transforme une liste en  une chaine de caractère
def list_string_to_string(l) :
    a = str()                                           
    for i in range(0,len(l)) :  
        a = a + str(l[i])
    return a

#Fonction Décimale en Binaire
def Decimal_To_Binaire(n):
    n = int(n) # variable de l'user
    l_binaire = [] #Code Binaire(pas encore inversé)

    #Liste en 0 1 mais inversé
    for i in range(0,8):
        w = n%2
        n = n//2
        l_binaire.append(w)

        if n == 0:
            l_binaire.append(n)
            break
        elif n == 1:
            l_binaire.append(n)
            break


    #reverse la liste
    l_binaire.reverse()
    l_binaire = list_string_to_string(l_binaire)
    return l_binaire

#Fonction vers Décimale
def Binaire_To_Decimal(n : str):
    temp = len(n)
    resultat = 0
    for i in range(0,len(n)):
        temp = temp - 1
        if n[i] == '1':
            resultat = resultat + 2**temp
    return resultat

#Fonction Binaire vers Hexa
def Binaire_To_Hexa(n : str):

    bin_hex = {'0000': '0', '0001': '1', '0010': '2', '0011': '3','0100': '4', '0101': '5', '0110': '6', '0111': '7','1000': '8', '1001': '9', '1010': 'A', '1011': 'B','1100': 'C', '1101': 'D', '1110': 'E', '1111': 'F'} #Dictionnaire pour le binaire en hexadecimale
    hexa = ""
    #Si le binaire n'est pas divisible par 4 alors on ajoute 0 pour que il y ai des digits
    while len(n) % 4 != 0:
        n = "0" + n
    #Prends une suite de 4binaires et l'associe à une valeur 
    for i in range(0,len(n),4):
        digit = n[i: i+4]
        hexa += bin_hex[digit]
    return hexa

#Fonction Hexadécimale vers Binaire
def Hexadecimale_To_Binaire(n : str): 
    #Convertis en Binaire 
    binaire = ""
    hexa_to_bin = {"0": "0000" , "1" : "0001", "2" : "0010" , "3" : "0011", "4" : "0100", "5" : "0101", "6" : "0110", "7" : "0111" ,"8": "1000", "9" : "1001", "A" : "1010", "B" : "1011", "C" :  "1100", "D" : "1101", "E" : "1110", "F" : "1111" } #Dictionnaire pour hexadecimal en binaire

    for elements in n: #Associe un chiffre ou une lettre à un groupe de décimale
            binaire += hexa_to_bin[elements]
    return binaire

#Fonction Hexadécimale vers Décimale
def Hexadecimale_To_Decimale(n : str):
    binaire = Hexadecimale_To_Binaire(n)# Transforme l'Hexadécimale en Binaire
    return Binaire_To_Decimal(binaire)#Transforme Binaire en Décimale

#Fonction Decimale vers Hexadécimale
def Decimal_To_Hexadecimale(n : int):
    a = Decimal_To_Binaire(n)
    b = Binaire_To_Hexa(a)
    return b
#Continu ou pas une boucle
def Continuer():
    #Demande si l'user veut continuer
    demande = str(input("Voules vous convertir d'autre valeur : (O/N) ")).lower()
    if demande == "n" :
        global boucle
        boucle = 0

#Fonction pour tester si l'user rentre une bonne chance
def Test_Decimale_To_Binaire_or_Decimale_To_Hexadecimale(n: str):
    global newinput
    global erreur
    
    for elements in range(len(n)):        
        if n[elements] in alaphabet or n[elements] in spéciale:
            print("Error: wrong input!")
            erreur = 1
            newinput = input("Votre nombre à convertir : ")  
    
    if n[0] == "0":
        print("Error: wrong input! Leading zero detected.")
        newinput = input("Votre nombre à convertir : ") 
        erreur = 1  
    return n

#Fonction pour tester si l'user rentre une bonne chance
def Test_Binaire_To_Decimale_Or_Binaire_To_Hexadecimale(n: str):
    
    for elements in range(len(n)):
            if n[elements] in alaphabet or n[elements] or n[elements] in spéciale:
                #Regarde si l'user rentre une lettre, un caractere spécial et/ou un chiffre supérieur à 1
                print("Error wrong input !")
                global erreur
                erreur = 1     
                #Repose la question à l'user
                global newinput
                newinput = str(input("Votre nombre à convertir : "))

#Fonction pour tester si l'user rentre une bonne chance
def Test_Hexadecimale_To_Décimale_Or_Hexadecimale_To_Binaire(n: str):
    
    for elements in range(len(n)):
            if n[elements] not in hexa_str or decimale_int and n[elements] in spéciale:
                print("Error wrong input") 
                global erreur
                erreur = 1
                #Repose la question à l'user
                global newinput
                newinput = input("Votre nombre à convertir : ")

##############################################################################################################################################################################################

#Boucle pour les convertions

while boucle == 1 :
    
    erreur = 0
    convert = input(str(" Comment voulez-vous convertir ? \n ############################ \n Décimale en Binaire : 1 \n Décimale en Hexadécimale : 2 \n Binaire en Décimale  : 3 \n Binaire en Hexadécimale :4 \n Hexadécimale en Décimale : 5\n Hexadécimale en Binaire : 6 \n ############################ \n : "))

    #Décimale to Binaire
    if convert == "1":
        
        valeur = str(input("Quelle est votre Décimal à convertir ?"))

        Test_Decimale_To_Binaire_or_Decimale_To_Hexadecimale(valeur)
        
        if erreur == 0:
            newvaleur = Decimal_To_Binaire(valeur)
            print("La conversion de la base Décimal dans la base Binaire de la représentation "+ str(valeur) + " est : " + str(newvaleur))

        if erreur == 1:
            newvaleur = Decimal_To_Binaire(newinput)
            print("La conversion de la base Décimal dans la base Binaire de la représentation "+ str(newinput) + " est : " + str(newvaleur))


        Continuer()
    
    # Décimale to Hexadécimale   
    elif convert == "2":

        valeur = str(input("Quelle est votre Décimal à convertir ?"))

        Test_Decimale_To_Binaire_or_Decimale_To_Hexadecimale(valeur)
        
        if erreur == 0:
            newvaleur = Decimal_To_Hexadecimale(valeur)
            print("La conversion de la base Décimal dans la base Hexadécimal de la représentation "+ str(valeur) + " est : " + str(newvaleur))

        if erreur == 1:
            newvaleur = Decimal_To_Hexadecimale(newinput)
            print("La conversion de la base Décimal dans la base Hexadécimal de la représentation "+ str(newinput) + " est : " + str(newvaleur))

        
        Continuer()
    
    #Binaire to Décimale    
    elif convert == "3":
        
        valeur = str(input("Quelle est votre Binaire à convertir ?"))
        
        Test_Binaire_To_Decimale_Or_Binaire_To_Hexadecimale(valeur)
              
        if erreur == 0:
            newvaleur = Binaire_To_Decimal(valeur)
            print("La conversion de la base Binaire dans la base Décimal de la représentation "+ str(valeur) + " est : " + str(newvaleur))

        if erreur == 1:
            newvaleur = Binaire_To_Decimal(newinput)        
            print("La conversion de la base Binaire dans la base Décimal de la représentation "+ str(newinput) + " est : " + str(newvaleur))


        Continuer()
    
    #Binaire to Hexadécimale
    elif convert == "4":

        valeur = str(input("Quelle est votre Binaire à convertir ?"))
        
        Test_Binaire_To_Decimale_Or_Binaire_To_Hexadecimale(valeur)
               
        if erreur == 0:
            newvaleur = Binaire_To_Hexa(valeur)
            print("La conversion de la base Binaire dans la base Hexadécimal de la représentation "+ str(valeur) + " est : " + str(newvaleur))

        if erreur == 1:
            newvaleur = Binaire_To_Hexa(newinput)                
            print("La conversion de la base Binaire dans la base Hexadécimal de la représentation "+ str(newinput) + " est : " + str(newvaleur))


        Continuer()
    
    #Hexadécimale vers Décimale
    elif convert == "5":

        valeur = str(input("Quelle est votre Héxadécimal à convertir ?"))
        
        Test_Hexadecimale_To_Décimale_Or_Hexadecimale_To_Binaire(valeur)
        
        if erreur == 0:
            newvaleur = Hexadecimale_To_Decimale(valeur)
            print("La conversion de la base Hexadecimale dans la base Décimal de la représentation "+ str(valeur) + " est : " + str(newvaleur))

        if erreur == 1:
            newvaleur = Hexadecimale_To_Decimale(newinput)
            print("La conversion de la base Hexadecimale dans la base Décimal de la représentation "+ str(newinput) + " est : " + str(newvaleur))


        Continuer()
    
    #Hexadécimale vers Binaire    
    elif convert == "6":
        
        valeur = str(input("Quelle est votre Héxadécimal à convertir ?"))
        
        Test_Hexadecimale_To_Décimale_Or_Hexadecimale_To_Binaire(valeur)
        
        if erreur == 0:
            newvaleur = Hexadecimale_To_Binaire(valeur)
            print("La conversion de la base Hexadecimale dans la base Binaire de la représentation "+ str(valeur) + " est : " + str(newvaleur))

        if erreur == 1:
            newvaleur = Hexadecimale_To_Binaire(newinput)
            print("La conversion de la base Hexadecimale dans la base Binaire de la représentation "+ str(newinput) + " est : " + str(newvaleur))

        Continuer()