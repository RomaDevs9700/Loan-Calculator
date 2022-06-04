// Credit forms
let form = {
	"annuitet": {
		"id": 1,
		"type": "annuitet",
		"choice": false
	},
	"diffirent": {
		"id":2,
		"type": "diffirent",
		"choice": false
	},
}

let credit = {
	"present1" : {
		"id" : 1,
		"value" : 25.9,
		"choice": false
	},
	"present2" : {
		"id": 2,
		"value" : 24.9,
		"choice": false

	},
	"present3" : {
		"id":3,
		"value" : 24.5,
		"choice": false
	}
}

function annuitetForm() {
	let annuitet = document.getElementById('annuitet').value;
	if (annuitet == 'annuitetForm'){
		form.annuitet.choice = true;
		form.diffirent.choice = false;
	}
}

function diffirentForm() {
	let diffirent = document.getElementById('diffirent').value;
	if (diffirent == 'diffirentForm'){
		form.diffirent.choice = true;
		form.annuitet.choice = false;
	}
}

//  Boshlang'ich Foiz to'lovlarni miqdorini aniqlash funksiyalari

function creditPresent1() {
	let presentAmount1 = document.getElementById('presentAmount1').value;
	if (presentAmount1 == 'option1'){
		credit.present1.choice = true;
		credit.present2.choice = false;
		credit.present3.choice = false;
	}
}

function creditPresent2() {
	let presentAmount2 = document.getElementById('presentAmount2').value;
	if (presentAmount2 == 'option2'){
		credit.present1.choice = false;
		credit.present2.choice = true;
		credit.present3.choice = false;
	}
}

function creditPresent3() {
	let presentAmount3 = document.getElementById('presentAmount3').value;
	if (presentAmount3 == 'option3'){
		credit.present1.choice = false;
		credit.present2.choice = false;
		credit.present3.choice = true;
	}
}

// Credit Calc function
let present,  creditSum, creditDeadline;
  
function creditCalc(){
  // Credit Sums 
  creditSum = document.getElementById('creditSum').value;
  creditSum = Number(creditSum)
  if (creditSum > 400000000){
	creditSum = 400000000;
  } else if(creditSum < 5000000) {
	creditSum = 5000000;
  }

  // Credit Deadline
  creditDeadline = document.getElementById('creditDeadline').value;
  creditDeadline = Number(creditDeadline)
  if (creditDeadline > 48){
	creditDeadline = 48;
  } else if(creditDeadline < 1) {
	creditDeadline = 1;
  }
  
  document.getElementById('sumAll').innerHTML = creditSum;
  document.getElementById('monthLimit').innerHTML = creditDeadline;

  // Presents choice
  if (credit.present1.choice) {
	present = credit.present1.value;
  } else if (credit.present2.choice) {
	present = credit.present2.value;
  } else if (credit.present3.choice) {
	present = credit.present3.value;
  } 

  // Form choice

  // Annuitet kreditini hisoblash
  if (form.annuitet.choice) {
		let monthlyPresentRate = (present / 100 / 12);
		let monthlyTotalPay = Number((creditSum * (monthlyPresentRate + monthlyPresentRate/((Math.pow((monthlyPresentRate + 1), creditDeadline)) - 1))).toFixed(2));

		let content = " ";
		let allSum = 0;
      	let allPresentPay = 0;

    for (let i = 1; i <= creditDeadline; i++) {
		let monthlyPresentPay = Number((creditSum * monthlyPresentRate).toFixed(2));
		let mainDebtPay = Number((monthlyTotalPay - monthlyPresentPay).toFixed(2));
		let mainDebtMod = Number((creditSum - mainDebtPay).toFixed(2));
		if (i == creditDeadline){
			mainDebtMod = parseInt(mainDebtMod);
		}
		content +=
		"<tr>" +
		  "<td class='px-3'>" + (i) + "</td>" +
		  "<td class='px-3'>" + mainDebtMod + "</td>" +
		  "<td class='px-3'>" + mainDebtPay + "</td>" +
		  "<td class='px-3'>" + monthlyPresentPay + "</td>" +
		  "<td class='px-3'>" + `<b>${monthlyTotalPay}</b>` + "</td>" +
		"</tr>"
		creditSum = mainDebtMod;
		allPresentPay += monthlyPresentPay;
		allSum += monthlyTotalPay;
		if (i == 1) {
			document.querySelector(".monthFee").innerText = parseInt(monthlyTotalPay);
			document.querySelector(".t-currency").innerHTML = "so'm";
		}
	}
		document.getElementById("result").innerHTML = content;
		document.querySelector(".presentCurrent").innerText = present;
		document.querySelector(".allPresentFee").innerText = allPresentPay.toFixed(0);
		document.querySelector(".allCreditAmount").innerText = allSum.toFixed(0);
	}

  // Different kreditini hisoblash
  else if (form.diffirent.choice) {
    let mainDebtPay = Number((creditSum / creditDeadline).toFixed(2));

    let content = " ";
    let allSum = 0;
    let allPresentPay = 0;

    for (var i = 1; i <= creditDeadline; i++) {
      let mainDebtMod = Number((creditSum - mainDebtPay).toFixed(2));
      let monthlyPresentPay = Number((creditSum * (present / 100 / 12)).toFixed(2));
      let monthlyTotalPay = Number((mainDebtPay + monthlyPresentPay).toFixed(2));
      if (i == creditDeadline){
			mainDebtMod = parseInt(mainDebtMod);
		}
		content +=
		"<tr>" +
		  "<td class='px-3'>" + (i) + "</td>" +
		  "<td class='px-3'>" + mainDebtMod + "</td>" +
		  "<td class='px-3'>" + mainDebtPay + "</td>" +
		  "<td class='px-3'>" + monthlyPresentPay + "</td>" +
		  "<td class='px-3'>" + `<b>${monthlyTotalPay}</b>` + "</td>" +
		"</tr>"
		creditSum = mainDebtMod;
		allPresentPay += monthlyPresentPay;
		allSum += monthlyTotalPay;
		if (i == 1) {
			document.querySelector(".monthFee").innerText = parseInt(monthlyTotalPay);
			document.querySelector(".t-currency").innerHTML = "so'm*"
		}
	}
		document.getElementById("result").innerHTML = content;
		document.querySelector(".presentCurrent").innerText = present;
		document.querySelector(".allPresentFee").innerText = allPresentPay.toFixed(0);
		document.querySelector(".allCreditAmount").innerText = allSum.toFixed(0);
	}
  }
