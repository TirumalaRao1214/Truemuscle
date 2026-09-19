/**
 * True Muscle Fitness Hub — Client-Side BMI Calculator Engine
 */

class BMICalculator {
  constructor() {
    this.heightInput = document.getElementById('bmiHeight');
    this.weightInput = document.getElementById('bmiWeight');
    this.ageInput = document.getElementById('bmiAge');
    this.genderInputs = document.querySelectorAll('input[name="bmiGender"]');
    this.calcBtn = document.getElementById('btnCalculateBMI');
    
    this.scoreDisplay = document.getElementById('bmiScoreDisplay');
    this.categoryDisplay = document.getElementById('bmiCategoryBadge');
    this.adviceDisplay = document.getElementById('bmiAdviceText');
    this.gaugeDisplay = document.getElementById('bmiGaugeMeter');

    if (!this.calcBtn) return;
    this.init();
  }

  init() {
    this.calcBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.calculate();
    });

    // Auto calculate on input change if both height & weight are filled
    [this.heightInput, this.weightInput].forEach(input => {
      if (input) {
        input.addEventListener('input', () => {
          if (this.heightInput.value && this.weightInput.value) {
            this.calculate();
          }
        });
      }
    });
  }

  calculate() {
    const heightCm = parseFloat(this.heightInput.value);
    const weightKg = parseFloat(this.weightInput.value);

    if (!heightCm || !weightKg || heightCm <= 0 || weightKg <= 0) {
      if (this.adviceDisplay) {
        this.adviceDisplay.textContent = "Please enter valid height and weight values.";
      }
      return;
    }

    const heightM = heightCm / 100;
    const bmi = (weightKg / (heightM * heightM)).toFixed(1);

    let category = "";
    let color = "#0088ff";
    let advice = "";

    if (bmi < 18.5) {
      category = "Underweight";
      color = "#38bdf8";
      advice = "Focus on a caloric surplus with progressive resistance training to build dense muscle mass.";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      category = "Optimal / Athletic";
      color = "#0088ff";
      advice = "Prime body composition! Elevate athletic performance, strength periodization, and metabolic conditioning.";
    } else if (bmi >= 25 && bmi <= 29.9) {
      category = "Overweight / Bulking";
      color = "#60a5fa";
      advice = "Focus on high-intensity metabolic resistance, calorie deficit, and structured cardio conditioning.";
    } else {
      category = "High Body Composition Indicator";
      color = "#2563eb";
      advice = "Prioritize guided personal training, caloric deficit management, and joint-friendly compound movements.";
    }

    this.animateScore(bmi);
    if (this.categoryDisplay) {
      this.categoryDisplay.textContent = category;
      this.categoryDisplay.style.color = color;
      this.categoryDisplay.style.borderColor = color;
      this.categoryDisplay.style.backgroundColor = `${color}18`;
    }
    if (this.adviceDisplay) {
      this.adviceDisplay.textContent = advice;
    }
    if (this.gaugeDisplay) {
      this.gaugeDisplay.style.borderTopColor = color;
    }
  }

  animateScore(target) {
    if (!this.scoreDisplay) return;
    let current = 0;
    const targetNum = parseFloat(target);
    const step = targetNum / 20;
    
    const interval = setInterval(() => {
      current += step;
      if (current >= targetNum) {
        current = targetNum;
        clearInterval(interval);
      }
      this.scoreDisplay.textContent = current.toFixed(1);
    }, 20);
  }
}

// Initializer helper
window.initBMICalculator = function() {
  new BMICalculator();
};
