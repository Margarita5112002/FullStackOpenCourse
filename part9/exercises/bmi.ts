const calculateBmi = (heightInCms : number, weightInKgs : number) : string => {
    const heightInMetres = heightInCms / 100
    const bmi = weightInKgs / (heightInMetres * heightInMetres)

    if (bmi < 18.5) {
        return "Underweight (unhealthy weight)"
    } else if (bmi < 24.9) {
        return "Normal (healthy weight)"
    } else if (bmi < 29.9) {
        return "Overweight (unhealthy weight)"
    }
    return "Obese (unhealthy weight)"
}

export default calculateBmi