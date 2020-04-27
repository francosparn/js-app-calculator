// Constructor for the 'Calculator' class
class Calculator {

    constructor(cards, amount, cash) {
        this.cards = cards;
        this.amount = amount;
        this.cash = cash;
    }

    cardQuote() {

        // Variables
        let tax;
        let amount;
        let base = document.getElementById('cash').value;

        /*
        Tax for card:
        1. Visa 1.03 = 3%
        2. MasterCard 1.02 = 2%
        3. American Express 1.06 = 6%
        4. Cabal 1.09 = 9%
        5. Tarjeta Naranja 1.15 = 15%
        */

        switch (this.cards) {
            case '1':
                amount = base * 1.03;
                break;
            case '2':
                amount = base * 1.02;
                break;
            case '3':
                amount = base * 1.06;
                break;
            case '4':
                amount = base * 1.09;
                break;
            case '5':
                amount = base * 1.15;
                break;
        }

        /*
        Read amount of fees
        1 = 5%
        3 = 10%
        6 = 15%
        12 = 30%
        18 = 45%
        */

        switch (this.amount) {
            case '1':
                tax = amount * 1.05;
                break;
            case '3':
                tax = amount * 1.10;
                break;
            case '6':
                tax = amount * 1.15;
                break;
            case '12':
                tax = amount * 1.30;
                break;
            case '18':
                tax = amount * 1.50;
                break;
        }

        let difference = tax - this.cash;

        const p = document.createElement('p');

        // Print result in DOM
        p.innerHTML = `
        <div id="result-card" class="card text-center mt-5">
            <div class="result">
                <div class="card-header text-light result">
                    <h5>Total a cobrar: <span class="price-finish">$${Math.round(tax)}</span></h5>
                    <h6>Interés: <span class="tax">$${Math.round(difference)}</span></h6>
                </div>
            </div>
        </div>
        `;

        p.style.display = 'none';
        setTimeout(function() {
            p.style.display = 'block';
            result.appendChild(p);
        }, 3000);
    }

}

// Everything to be displayed in the DOM
class Interfaz {

    showMessage(message, type) {
        const div = document.createElement('div');

        if (type === 'error') {
            div.classList.add('message', 'error');
        } else {
            div.classList.add('message', 'ok');
        }

        div.innerHTML = `${message}`;
        form.insertBefore(div, document.querySelector('.form-group'));

        setTimeout(function() {
            document.querySelector('.message').remove();
        }, 3000);
    }

    showResult(calculator, amount) {
        const result = document.getElementById('result');
        let cards;

        switch (calculator.cards) {
            case '1':
                cards = 'Visa';
                break;
            case '2':
                cards = 'MasterCard';
                break;
            case '3':
                cards = 'American Express';
                break;
            case '4':
                cards = 'Cabal';
                break;
            case '5':
                cards = 'Tarjeta Naranja';
                break;
        }

        // Create div element where we store the result
        const div = document.createElement('div');

        // Insert information
        div.innerHTML = `
        <div id="info">
            <div class="result-div text-center">
                <p><b>Tarjeta de Crédito</b>: ${cards}</p>
                <p><b>Cantidad de Cuotas</b>: ${calculator.amount}</p>
                <p><b>Efectivo</b>: $${calculator.cash}</p>
            </div>
        </div>
        `;

        // Spinner
        const spinner = document.querySelector('#loading img');
        spinner.style.display = 'block';
        setTimeout(function() {
            spinner.style.display = '';
            result.appendChild(div);
        }, 3000);
    }
}

// Events
const form = document.getElementById('calc');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Read the value of the selected credit card
    const cards = document.getElementById('cards');
    const selectCards = cards.options[cards.selectedIndex].value;

    // Read the amount of selected installments
    const amount = document.getElementById('amount');
    const selectAmount = amount.options[amount.selectedIndex].value;

    // Read the amount of cash entered
    const cash = document.getElementById('cash').value;

    // Create interface instance
    const interfaz = new Interfaz();

    // We check that the fields are not empty
    if (selectCards === '' || selectAmount === '' || cash === '') {
        // Interface showing error
        interfaz.showMessage('Se ha producido un error, complete todos los campos del formulario y envíelo nuevamente.', 'error');
    } else {
        // Clear past results
        const resultsHeader = document.querySelector('#result-card, .result-div div');
        const resultsBody = document.querySelector('#info div');

        if (resultsHeader != null || resultsBody != null) {
            resultsHeader.remove();
            resultsBody.remove();
        }

        // Instantiate calculator and show interface
        const calculator = new Calculator(selectCards, selectAmount, cash);

        // Quotation
        const amount = calculator.cardQuote();

        // Show result in DOM
        interfaz.showResult(calculator, amount);
        interfaz.showMessage('Realizando cotización, aguarde unos instantes...', 'ok');
    }

});