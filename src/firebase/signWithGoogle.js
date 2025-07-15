import axios from 'axios'
import config from "../config";

export default async function signWithGoogle(user) {
  const { email, displayName, uid, photoURL, emailVerified  } = user
  await axios.post(`${config.BACKEND_URL}/login?google=true`, {
      id: uid,
      email,
      name: displayName,
      image: photoURL,
      emailVerified,
      password: Math.random() * 1209847 + 'secretoGameScript'
  })
}
