import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, onAuthStateChanged } from 'firebase/auth'
import app from './firebase'

const auth = getAuth(app)

async function signUp({ email, password, name }) {
    try {
         
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        if (userCredential && userCredential.user) {
            await updateProfile(userCredential.user, {
                displayName: name,
            });
        }
    
    } catch (error) {
        return error;

    }
}
async function login({ email, password }) {
    try {

        return await signInWithEmailAndPassword(auth, email, password)

    }
    catch (error) {
        return error;


    }
}

async function logout() {
    try {
        return await signOut(auth);

    } catch (error) {
        return error;


    }
}
function getCurrentUser() {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                resolve(currentUser); 
            } else {
                reject('No current user found'); 
            }
        }, (error) => {
            reject(error); 
        });
        return unsubscribe;
    });
}

async function fetchCurrentUser() {
    try {
        const currentUser = await getCurrentUser();
        
        return currentUser
    } catch (error) {
        return error;

    }
}


export { signUp, login, logout, fetchCurrentUser }