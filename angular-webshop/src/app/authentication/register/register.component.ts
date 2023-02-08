import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { Customer } from 'src/app/types/customer';

//function for validating email matching
function emailMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const emailControl = c.get('email');
  const confirmControl = c.get('confirmEmail');

  if (emailControl?.pristine || confirmControl?.pristine) {
    return null;
  }

  if (emailControl?.value === confirmControl?.value) {
    return null;
  }
  // returns a validation error object
  return { 'match': true };
}

// use factory pattern if want to pass parameters
// the validator func is wrapped inside a factory function which returns a validator function
// if only this component uses this validator its okay to define it here
function ratingRange(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (c.value !== null && (isNaN(c.value) || c.value < min || c.value > max)) {
      // returns a validation error object
      return { range: true };
    }
    return null;
  };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  customerForm!: FormGroup;
  customer = new Customer();
  emailMessage: string = '';

  get addresses(): FormArray {
    return this.customerForm.get('addresses') as FormArray;
  }

  // validation messages for email form input
  private validationMessages: any = {
    required: 'Please enter your email address.',
    email: 'Please enter a valid email address.'
  };

  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required]],
      // crossfield validation
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', [Validators.required]],
      }, { validator: emailMatcher }),
      phone: [''],
      notification: ['email'],
      //
      rating: [null, [ratingRange(1, 5)]],
      getNewsLetter: true,
      addresses: this.fb.array([ this.buildAddress() ])

    });

    

    // using a watcher to change the validation not relying on html (click) event
    this.customerForm.get('notification')?.valueChanges.subscribe(
      value => this.setNotification(value)
    );

    const emailControl = this.customerForm.get('emailGroup.email');
    emailControl?.valueChanges.pipe(
      // ignores all events until a specified time passed
      // giving user a chance to type in a valid email address
      debounceTime(1000)
    ).subscribe(
      value => this.setMessage(emailControl)
    );
  }

  addAddress(): void {
    this.addresses.push(this.buildAddress());
  }

  buildAddress(): FormGroup {
    return this.fb.group({
      addressType: 'home',
      street1: ['', Validators.required],
      street2: '',
      city: '',
      state: '',
      zip: ''
    });
  }

  // email error message logic
  setMessage(c: AbstractControl): void {
    this.emailMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      // error collection's keys
      this.emailMessage = Object.keys(c.errors).map(
        key => this.validationMessages[key]).join(' ');
    }
  }

  save() {
    console.log(this.customerForm);
    console.log('Saved' + JSON.stringify(this.customerForm.value));
  }

  populateTestData() {
    // need to specify all the fields of form control
    this.customerForm.setValue({
      firstName: 'John',
      lastName: 'Wick',
      email: 'asd@asd.com',
      getNewsLetter: true
    });
    // can use if don't want to change all the fields
    // this.customerForm.patchValue({
    //   firstName: 'John',
    //   getNewsLetter: true
    // });
  }

  setNotification(notifyVia: string): void {
    // if text notification is chosen the phone num is required
    const phoneControl = this.customerForm.get('phone');
    if (notifyVia === 'text') {
      phoneControl?.setValidators(Validators.required);
    } else {
      phoneControl?.clearValidators();
    }
    // changes validation during runtime
    phoneControl?.updateValueAndValidity();
  }

}
