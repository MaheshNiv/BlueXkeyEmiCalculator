import { Component } from '@angular/core';

@Component({
  selector: 'app-emi-calculator',
  templateUrl: './emi-calculator.component.html',
  styleUrls: ['./emi-calculator.component.css']
})
export class EmiCalculatorComponent {
  loanAmount: any;
  interestRate: any;
  loanTenure: any;
  loanEMI: any;
  totalInterestPayable: any;
  totalPayment: any;
  emiDetails: any[] = [];

  calculateEMI() {
    const principal = this.loanAmount;
    const interestRate = this.interestRate / 100 / 12; // Monthly interest rate
    const loanTenureMonths = this.loanTenure * 12; // Loan tenure in months

    // Calculate EMI
    const numerator = principal * interestRate * Math.pow(1 + interestRate, loanTenureMonths);
    const denominator = Math.pow(1 + interestRate, loanTenureMonths) - 1;
    this.loanEMI = numerator / denominator;

    // Calculate total payment and total interest payable
    this.totalPayment = this.loanEMI * loanTenureMonths;
    this.totalInterestPayable = this.totalPayment - principal;

    // Calculate and populate EMI details
    let balance = principal;
    const emiDetails: any[] = [];
    let loanPaidToDate = 0;
    for (let month = 1; month <= loanTenureMonths; month++) {
      const interest = balance * interestRate;
      const principalPaid = this.loanEMI - interest;
      balance -= principalPaid;
      loanPaidToDate += principalPaid;

      emiDetails.push({
        monthYear: this.getMonthYear(month),
        principal: principalPaid.toFixed(2),
        interest: interest.toFixed(2),
        totalPayment: this.loanEMI.toFixed(2),
        balance: balance.toFixed(2),
        loanPaidToDate: ((loanPaidToDate / principal) * 100).toFixed(2)
      });
    }

    this.emiDetails = emiDetails;
  }

  getMonthYear(month: number): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const newMonth = currentDate.getMonth() + month;
    const newYear = year + Math.floor(newMonth / 12);
    const formattedMonth = (newMonth % 12) + 1;
    return `${formattedMonth}/${newYear}`;
  }
}
