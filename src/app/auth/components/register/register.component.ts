import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { checkPasswords } from '../../utils/check-password';
import { PasswordValidator } from '../../utils/password.validator';
import { MyErrorStateMatcher } from '../../utils/statement-password';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        PasswordValidator.strong
      ]],
      confirmPassword: ['', Validators.required]
    }, { validators: checkPasswords });

  }

  submit(): void{
    const user = this.form.getRawValue();
    this.authService.registerUser(user).subscribe(
      resp => {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso.',
          text: 'Te has registrado exitosamente.',
          showConfirmButton: false,
          timer: 2000
        });
        this.router.navigateByUrl('auth/login');
      }
    )
  }


}
