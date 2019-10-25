var inputPlayer1 = document.getElementById('searchWord');
var buttonPlayer1 = document.getElementById("confirmWord");
var inputPlayer2 = document.getElementById('searchLetter');
var buttonPlayer2 = document.getElementById("confirmLetter");
var secretWord = document.getElementById('secretWord');
var point = document.getElementById('point');
var victory = document.getElementById('victory');
var defeat = document.getElementById('defeat');
var secretCharactere = "_ "; // caractères secrets a trouver
var secretWordTable; // transformer caractères secrets en tableau
var saveCharactere; // Enregistrer la lettre a verifier
var charactereFound = false; // Verifie si la lettre est dans le mot ou non 
var wordFound = ""; // stock au fur et a mesure les lettres trouver pour verifier si le mot a trouver est fini
var charactereAlreadySearchTable = []; // Stocker les lettres deja chercher
var charactereAlreadySearch = false; // Verifie si la lettre a ete chercher

buttonPlayer1.addEventListener('click', function(){
     if(inputPlayer1.value.length < 3) {
         $("#alertPlayer1").fadeIn();  
         $("#alertPlayer1").delay(3000).fadeOut();  
     } else {
        $('#player1').fadeOut(1000);
        $('#player2').fadeIn(7000);
        point.textContent = 10;
        var saveWord = inputPlayer1.value; // Stock le mot a chercher
        var saveWordSplit = saveWord.split(''); // Transforme le mot en tableau
        // Mettre le bon nombre de tiret pour le mot a trouver
        for(var j = 0; j < saveWordSplit.length; j++) {
            secretWord.textContent = secretCharactere + secretCharactere.repeat(j);
        }
        secretWordTable = secretWord.textContent.split(' '); // transforme les caractères secrets en tableau
        buttonPlayer2.addEventListener('click', function() {
            if(inputPlayer2.value.length === 0) {
                $("#alertNoLetter").fadeIn();  
                $("#alertNoLetter").delay(3000).fadeOut();
            } else if(inputPlayer2.value.length > 1){
                $("#alertTooMuchLetter").fadeIn();  
                $("#alertTooMuchLetter").delay(3000).fadeOut();
            } else {
                saveCharactere = inputPlayer2.value;
                inputPlayer2.value = ""; // reset la valeur du champ
                // Parcourt le tableau pour check si la lettre a deja ete chercher et met une erreur si c'est le cas
                for(var j = 0; j < charactereAlreadySearchTable.length; j++){
                    if(charactereAlreadySearchTable[j] === saveCharactere) {
                        charactereAlreadySearch = true;
                        $("#letterAlreadySearch").fadeIn();  
                        $("#letterAlreadySearch").delay(3000).fadeOut();
                        break;
                    }
                }
                // Si la lettre n'a pas deja ete chercher, Verifie si la lettre dans le champ correspond a une ou plusieurs lettres dans le mot
                if(!charactereAlreadySearch){
                    for(var i = 0; i < saveWordSplit.length; i++) {                                     
                        if(saveCharactere === saveWordSplit[i]) {
                            console.log(saveCharactere);
                            secretWordTable[i] = saveCharactere; // Repère et place la lettre au bon endroit 
                            secretWord.textContent = secretWordTable.join(" ");// Affiche la lettre trouver au bon endroit
                        // wordFound = secretWordTable.join(""); // Stock au fur et a mesure le mot trouver
                            charactereFound = true;
                        }
                    }
                }
                // Enlève 1 point si le caractère n'est pas bon et que la lettre n'a pas deja ete chercher et push la nouvelle lettre dans le taleau
                if(!charactereFound && !charactereAlreadySearch) {
                    point.textContent -= 1;
                    charactereAlreadySearchTable.push(saveCharactere);
                    console.log(charactereAlreadySearchTable);
                } else {
                    charactereFound = false;
                    charactereAlreadySearch = false;
                }
                if(secretWordTable.join("").startsWith(saveWord)) {
                    victory.textContent += "Le mot était " + saveWord;
                    $("#victory").fadeIn();  
                    $("#victory").delay(3000).fadeOut();
                    $('#retry').fadeIn(2000);
                    inputPlayer2.disabled = true;
                } else if(point.textContent === '0') {
                    defeat.textContent += "Le mot était " + saveWord;
                    $("#defeat").fadeIn();  
                    $("#defeat").delay(3000).fadeOut();
                    $('#retry').fadeIn(2000);
                }
            }
         })    
     }
})

