let balance = 100.00;

    // Function to calculate and update the multiplier
    function updateMultiplier() {
      const winCondition = parseFloat(document.getElementById("winCondition").value);
      const payoutMultiplier = (winCondition > 50) 
        ? (100 / (100 - winCondition)) 
        : (100 / winCondition);
      
      document.getElementById("winConditionValue").textContent = winCondition;
      document.getElementById("multiplierValue").textContent = payoutMultiplier.toFixed(2);
    }

    // Deposit money
    function depositMoney() {
      const depositAmount = parseFloat(document.getElementById("depositAmount").value);
      if (isNaN(depositAmount) || depositAmount <= 0) {
        alert("Please enter a valid deposit amount.");
        return;
      }
      balance += depositAmount;
      document.getElementById("balance").textContent = `Balance: $${balance.toFixed(2)}`;
      document.getElementById("depositAmount").value = ''; // Clear input
    }

    // Roll Dice
    function rollDice() {
      const betAmount = parseFloat(document.getElementById("betAmount").value);
      const winCondition = parseFloat(document.getElementById("winCondition").value);
      const payoutMultiplier = parseFloat(document.getElementById("multiplierValue").textContent);
      const betType = document.getElementById("betType").value;
      const resultDiv = document.getElementById("result");

      if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
        resultDiv.textContent = "Please enter a valid bet amount.";
        resultDiv.style.color = "#ff4757";
        return;
      }

      const roll = Math.random() * 100;
      const won = (betType === "under" && roll < winCondition) || (betType === "over" && roll > winCondition);

      if (won) {
        const winnings = betAmount * payoutMultiplier;
        balance += winnings;
        resultDiv.textContent = `🎉 You rolled ${roll.toFixed(2)}! You win $${winnings.toFixed(2)}!`;
        resultDiv.style.color = "#2ed573";
      } else {
        balance -= betAmount;
        resultDiv.textContent = `😢 You rolled ${roll.toFixed(2)}. You lose $${betAmount.toFixed(2)}.`;
        resultDiv.style.color = "#ff4757";
      }

      document.getElementById("balance").textContent = `Balance: $${balance.toFixed(2)}`;
    }

    // Event Listeners
    document.getElementById("winCondition").addEventListener("input", updateMultiplier);
    document.getElementById("depositButton").addEventListener("click", depositMoney);
    document.getElementById("rollButton").addEventListener("click", rollDice);

    // Initialize multiplier on page load
    updateMultiplier();