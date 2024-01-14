const items = [
    'diamond',
    'grapes','grapes','grapes',
    'banana', 'banana', 'banana',
    'cherry', 'cherry',
    'watermelon', 'watermelon', 'watermelon',
    'prune', 'prune', 'prune',
    'orange', 'orange', 'orange',
  
  ];
  
  let playerBalance = 50; // Solde initial du joueur
  let currentBet = 1; // Montant initial de la mise
  
  const winningCombination = [
  ['diamond', 'diamond', 'diamond'],
  ['grapes', 'grapes', 'grapes'],
  ['banana', 'banana', 'banana'], 
  ['cherry', 'cherry', 'cherry'],
  ['watermelon', 'watermelon', 'watermelon'],
  ['prune', 'prune', 'prune'],
  ['orange', 'orange', 'orange'],
  
  ] // Définissez votre combinaison gagnante
  
  
  // Fonction pour mettre à jour le solde du joueur dans l'interface
  const updateBalance = () => {
    document.getElementById("balance").innerText = `Solde : ${playerBalance} jetons`;
    document.getElementById("bet").innerText = `Mise : ${currentBet} jetons`;
  };
    
  // Fonction pour afficher le résultat du jeu dans l'interface
  const displayResult = (message) => {
    document.getElementById("result").innerText = message;
  };
  
  document.querySelector(".bet-buttons1").addEventListener("click", () => {
    setBet(1); // Miser 1 jeton
  });
  
  document.querySelector(".bet-buttons5").addEventListener("click", () => {
    setBet(2); // Miser 2 jetons
  });
  
  document.querySelector(".bet-buttons10").addEventListener("click", () => {
    setBet(3); // Miser 3 jetons
  });
  
  const buttonEl = document.querySelector("button")
  const levierEl = document.querySelector(".levier")
  const soundEl = document.getElementById("sound");
  
  
  buttonEl.addEventListener("click", () => {
    // Vérifier si le joueur a suffisamment de jetons pour placer une mise
    if (currentBet > playerBalance) {
      alert("Vous n'avez pas suffisamment de jetons.");
      return;
    }
    soundEl.play();
  
    // Déduire le montant de la mise du solde du joueur
    playerBalance -= currentBet;
  
    // Mettre à jour l'affichage du solde
    updateBalance();
  
    document.querySelectorAll("img").forEach((imgEl, index) => {
      const randomTime = 1000 + 1000 * index;
      randomizeImg(imgEl, randomTime);
    });
  
    levierEl.classList.toggle("press")
    setTimeout(()=>{
      levierEl.classList.toggle("press")
    },1000)
  
    // Vérifier la combinaison gagnante après la rotation
    setTimeout(() => {
      checkWin();
    }, 3000); // Ajuster cette valeur en fonction de la durée de votre animation
  });
  
  const setBet = (amount) => {
      // Efface le contenu du message de résultat
      document.getElementById("result").innerText = "";
    
      currentBet = amount;
      updateBalance();
    };
    
  
  const randomizeImg = (imgEl, time) => {
    const timeInterval = setInterval(() => {
      imgEl.classList.remove("animate");
      chooseRandom(imgEl);
    }, 100); // Vous pouvez ajuster cette valeur pour accélérer ou ralentir la rotation.
  
    setTimeout(() => {
      imgEl.classList.remove("animate");
      clearInterval(timeInterval);
    }, time);
  };
  
  const chooseRandom = (imgEl) => {
      const random = Math.floor(Math.random() * items.length);
      const selectedItem = items[random];
      imgEl.src = `/static/machineasous/slotmachine/${selectedItem}.png`; 
      imgEl.classList.add("animate");
    };
    function openModal(message) {
      const modal = document.getElementById("myModal");
      const modalMessage = document.getElementById("modal-message");
      modalMessage.innerText = message;
      modal.style.display = "block";
    }
    
    function closeModal() {
      const modal = document.getElementById("myModal");
      modal.style.display = "none";
    }
    const checkWin = () => {
      const slotItems = document.querySelectorAll(".slot-item img");
      const selectedItems = Array.from(slotItems).map((item) => item.src.split('/').pop().split('.')[0]);
    
      // Vérifiez chaque combinaison gagnante
      for (const winCombination of winningCombination) {
        if (
          selectedItems[0] === winCombination[0] &&
          selectedItems[1] === winCombination[1] &&
          selectedItems[2] === winCombination[2]
        ) {
          // Le joueur gagne
          if (selectedItems[0] === 'diamond') {
            // Si la combinaison est trois diamants, attribuez le jackpot
            playerBalance += currentBet * 10;
          }
          else if (selectedItems[0] === 'cherry') {
            // Si la combinaison est trois cherry, attribuez le gain
            playerBalance += currentBet * 5;
          } else {
            // Pour les autres combinaisons, attribuez la mise habituelle
            playerBalance += currentBet * 2;
          }
    
          updateBalance();
    
          setTimeout(() => {
            // Fenêtre contextuelle avec le message et option de rejouer
            if (window.confirm(`JACKPOT !! ${selectedItems[0] === 'diamond' ? currentBet * 10 : currentBet * 2} jetons! Voulez-vous rejouer ?`)) {
              resetGame(); // Fonction pour réinitialiser le jeu
            } else if (window.confirm(`YOU WIN!! ${selectedItems[0] === 'cherry' ? currentBet * 5 : currentBet * 2} jetons! Voulez-vous rejouer ?`)){
              resetGame();
            }
          }, 500);
    
          return; // Sortez de la fonction dès qu'une combinaison gagnante est trouvée
        }
      }
    
      // Si aucune combinaison gagnante n'est trouvée, le joueur perd
      updateBalance();
    
      // Attendre 2 secondes avant d'afficher la fenêtre contextuelle
      setTimeout(() => {
        // Fenêtre contextuelle avec le message et option de rejouer
        if (window.confirm(`Vous avez perdu ${currentBet} jetons. Voulez-vous rejouer ?`)) {
          resetGame(); // Fonction pour réinitialiser le jeu
        }
      }, 500);
    };
    
  
    let btn = document.getElementById("btn");
    let btnIcon = document.getElementById("btn-icon");
    let details = document.getElementById("details");
    function toggleDetails() {
      const details = document.getElementById("details");
      const btnIcon = document.getElementById("btn-icon");
  
      if (details.style.height === "0px" || details.style.height === "") {
          details.style.height = "max-content";
          btnIcon.name = "chevron-up";
      } else {
          details.style.height = "0px";
          btnIcon.name = "chevron-down";
      }
  }