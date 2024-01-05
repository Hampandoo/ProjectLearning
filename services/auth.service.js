import { 
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth"
import { JWTService } from "./jwt.service"

class AuthService {
  static async signIn({ email, password }) {
    return signInWithEmailAndPassword(getAuth(), email, password)
      .then((resp) => {
        JWTService.setToken(resp.user.accessToken)
        return resp
      })
  }
  static async signUp({ email, password }) {
    return createUserWithEmailAndPassword(getAuth(), email, password)  
  }
  static async signOut() {
    const auth = getAuth()
    return signOut(auth).then(() => {
      JWTService.removeToken()
    })
  }
}

export { AuthService }