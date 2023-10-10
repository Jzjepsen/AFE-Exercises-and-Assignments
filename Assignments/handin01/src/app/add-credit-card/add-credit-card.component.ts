import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { CreditCardService } from '../services/credit-card.service';


@Component({
  selector: 'app-add-credit-card',
  templateUrl: './add-credit-card.component.html',
  styleUrls: ['./add-credit-card.component.css']
})
export class AddCreditCardComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private cardService: CreditCardService) {
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
          Validators.pattern('^[0-9]{3}$') // ensures only 3 numeric characters
        ]
      ],
      cardholder_name: [
        '',
        [
          Validators.required
        ]
      ],
      expiration_date_month: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
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
      issuer: [
        '',
        [
          Validators.required,
        ],
      ]
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
      // Log the form data
      console.log('Form submitted with data:', this.form.value);

      // Use HttpClient to send the POST request
      this.cardService.addCard(this.form.value).subscribe( 
      (response) => {
          // Handle a successful response from the server
          console.log('API response:', response);

          // Reset the form after a successful submission
          this.form.reset();
        },
        (error) => {
          // Handle any errors that occur during the request
          console.error('API error:', error);
        }
      );
    } else {
      console.log('Form is invalid. Please check the inputs.');
    }
  }
}