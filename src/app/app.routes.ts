import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/signup/signup.component';
import { AddressComponent } from './pages/address/address.component';
import { AuthGuard } from './services/auth-guard.service';
import { CreateAddressComponent } from './pages/create-address/create-address.component';

export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "signup",
        component: SignUpComponent
    },
    {
        path: "address",
        component: AddressComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "create-address",
        component: CreateAddressComponent,
        canActivate: [AuthGuard]
    },
];