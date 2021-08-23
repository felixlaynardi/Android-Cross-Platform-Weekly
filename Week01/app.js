const calculateBMI = () => {
    const enteredHeight = document.getElementById('height-input').value / 100;
    const enteredWeight = document.getElementById('weight-input').value;
    // Calculate BMI
    const bmi = enteredWeight / (enteredHeight * enteredHeight)
    console.log(bmi)

    setResultsCard(bmi);
}
const setResultsCard = (bmi) => {
    document.getElementById('bmi-value').innerHTML = bmi;
    // Set bmi status
    if(bmi < 18.5){
        document.getElementById('bmi-status').innerHTML = 'Kurus';
    }
    else if(bmi < 25){
        document.getElementById('bmi-status').innerHTML = 'Normal';
    }
    else if(bmi < 30){
        document.getElementById('bmi-status').innerHTML = 'Gemuk';
    }
    else if(bmi > 30){
        document.getElementById('bmi-status').innerHTML = 'Obesitas';
    }
    else{
        document.getElementById('bmi-status').innerHTML = 'Invalid Value';
    }
    // Unhide card results
    document.getElementById('results-card').classList.remove('ion-hide');
}
const resetCalculation = () => {
    document.getElementById('height-input').value = ''
    document.getElementById('weight-input').value = ''
    document.getElementById('results-card').classList.add('ion-hide');
}