import * as firebaseAuth from 'firebase/auth';
import { fireAuth } from '../api/authapi';

export default class AuthService {
    getLoggedUser() {
        return new Promise(resolve => {
            firebaseAuth.onAuthStateChanged(fireAuth, (user: any) => {
                resolve(user);
            })
        })
    }

    login(email: string, password: string) {
        return firebaseAuth.signInWithEmailAndPassword(
            fireAuth, email, password
        )
<<<<<<< HEAD
        .then(user => {
            return user;
        })
        .catch(error => {
            //console.log('error', error);
            return Promise.reject(error);
        });
=======
            .then(user => {
                return user;
            })
            .catch(error => {
                console.log('error', error);
                return Promise.reject(error);
            });
>>>>>>> 3bef88da1c1793d99ca93f24ccd197deb58c4967
    }

    signOut() {
        return firebaseAuth.signOut(fireAuth)
    }
}