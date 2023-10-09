import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-credit-card',
  templateUrl: './add-credit-card.component.html',
  styleUrls: ['./add-credit-card.component.css']
})
export class AddCreditCardComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      card_number: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'), //allow only numerical input
          this.cardNumberLengthValidator //customer validator for input length
        ]
      ],
      csc_code: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'), //allow only numerical input
          Validators.minLength(3),
          Validators.maxLength(3)
        ]
      ],
      expiration_date_month: [
        '',
        [
          Validators.required,
          Validators.pattern('^[1-12]*$'),
          Validators.min(1),
          Validators.max(12)
        ]
      ],
      expiration_date_year: [
        '',
        [
          Validators.required
        ]
      ],
    })
  }
  // Custom validator function for card_number length
  cardNumberLengthValidator(control: FormControl) {
    const value = control.value;

    if (value && (value.length < 7 || value.length > 16)) {
      return { cardNumberLength: true } // validation failed
    }
    return null;
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form submitted with data:', this.form.value);
      // Perform actions like sending data to a server or processing it here
      // Call api 
      this.form.reset();
    } else {
      console.log('Form is invalid. Please check the inputs.');
    }
  }
}