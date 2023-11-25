const router = require("express").Router();

const isNumberValid = (number) => {
    return typeof number === "number" && number > 0
}
const calculateMonthlyPayments = (principalAmount, loanTerm, interestRate) => {
    const monthlyInterest = interestRate / 100 / 12;
    const numberOfMonths = loanTerm * 12;

    return (
      (principalAmount *
        monthlyInterest *
        Math.pow(1 + monthlyInterest, numberOfMonths)) /
      (Math.pow(1 + monthlyInterest, numberOfMonths) - 1)
    );
} 

router.post("/calculate-loan-details",(req, res)  => {
    const { interestRate, loanTerm, principalAmount } = req.body;

    if(!isNumberValid(interestRate) || !isNumberValid(loanTerm) || !isNumberValid(principalAmount)){
        return res.status(400).json("numbers are fine please.");
    }
    const initialPrincipal = principalAmount
    let remainingPrincipal = initialPrincipal;
    const monthlyPayment = calculateMonthlyPayments(principalAmount, loanTerm, interestRate);

    let counter = 0;
    let totalInterestPaid = 0;
    let year = 1;

    const years = [];
    const yearlyInterestPaid = [];
    const yearlyPrincipalPaid = [];
    const yearlyRemainingPrincipal = [];

    while (remainingPrincipal > 0) {
      const monthlyInterestPaid =
        remainingPrincipal * (interestRate / 100 / 12);

      const monthlyPaymentAmountTowardsPrincipal =
        monthlyPayment - monthlyInterestPaid;

      totalInterestPaid += monthlyInterestPaid;
      remainingPrincipal -= monthlyPaymentAmountTowardsPrincipal;

      counter++;

      //statement to clarify a year has been passed

      if (counter === 12) {
        yearlyInterestPaid.push(Math.round(totalInterestPaid));
        yearlyPrincipalPaid.push(Math.round(initialPrincipal - remainingPrincipal));
        yearlyRemainingPrincipal.push(Math.round(Math.max(remainingPrincipal, 0)));
        years.push(year);
        year++;
        counter = 0;
      }
    }
    res.json( {
      yearlyInterestPaid,
      yearlyPrincipalPaid,
      yearlyRemainingPrincipal,
      years,
      totalInterestPaid: Math.round(totalInterestPaid),
      monthlyPayment: Math.round(monthlyPayment)
    });
})

module.exports = router;


