import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../../interfaces/login.interface';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', Validators.required],
      rememberPassword: [false]
    })

    const user = this.authService.getCredentialsData();
    if(user){
      this.form.patchValue(user);
    }
  }

  submit(): void{
    const user: Login = this.form.getRawValue();
    this.authService.login(user).subscribe(
      resp => {
        this.router.navigateByUrl('/list');
        Swal.fire({
          icon: 'success',
          title: 'Bienvenido de nuevo:',
          text: resp.username,
          showConfirmButton: false,
          timer: 2000
        });
      }
    )
  }

}
