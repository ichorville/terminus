// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { LoginVariable } from '../global';

// @Component({
// 	selector: 'app-login',
// 	templateUrl: './login.component.html',
// 	styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {

// 	form: FormGroup;
// 	user: User;
 
// 	constructor(
// 		private router: Router,
// 		private fb: FormBuilder
// 	) { 
// 		this.user = new User();
// 	}

// 	ngOnInit() {
// 		this.buildForm();
    
// 	}

// 	buildForm(): void {
// 		this.form = this.fb.group({
// 			'username': [this.user.username, [Validators.required]],
// 			'password': [this.user.password, [Validators.required]],
// 		});
// 		this.form.valueChanges.subscribe(data => this.onValueChanged(data));
// 		this.onValueChanged();
// 	}

// 	formErrors = {
// 		'username': '',
// 		'password': ''
// 	};

// 	validationMessages = {
// 		'email': {
// 			'required': 'Username is required.',
// 		},
// 		'password': {
// 			'required': 'Password is required.'
// 		}
// 	};

// 	onValueChanged(data?: any) {
// 		if (!this.form) {
// 			return;
// 		}
// 		const thisForm = this.form;

// 		for(const field in this.formErrors) {
// 			// clear previous messages if any
// 			this.formErrors[field] = '';
// 			const control = thisForm.get(field);

// 			if(control && control.dirty && !control.valid) {
// 				const messages = this.validationMessages[field];
// 				for(const key in control.errors) {
// 					this.formErrors[field] += messages[key] + ' ';
// 				}
// 			}
// 		}
// 	}

// 	onSubmit(event) {
// 		if (this.form.valid) {
// 			let user: any = {
// 				'email': this.user.username,
// 				'password': this.user.password
// 			}
// 			LoginVariable.IS_LOGGED_IN = this.isLoggedIn;
// 			this.router.navigateByUrl(`/home`);
//       console.log(LoginVariable.IS_LOGGED_IN);
// 			// this._ls.login(user).then((response) => {
// 			// 	if (response.status != 200) {
// 			// 		return alert(`Login Unauthotized !`);
// 			// 	}
// 			// 	this.router.navigateByUrl(`/dashboard`);	
// 			// });
// 		} else {
// 			this.onValueChanged();
// 		}
// 	}
// }

// export class User {
//     username: string;
//     password: string;
// }
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  form: FormGroup;
  private formSubmitAttempt: boolean;
 
  constructor(
    private fb: FormBuilder, 
    private authService: AuthService
    
  ) {}

  ngOnInit() {
    
    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    if (this.form.valid) {
      this.authService.login(this.form.value);
    }
    this.formSubmitAttempt = true;
  }
}
