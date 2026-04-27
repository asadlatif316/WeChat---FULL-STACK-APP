import { useAuthStore } from "@/store/useAuthStore"

const Register = () => {
  const {signup, isSigningUp} = useAuthStore()

  return (
    <div>
      <h2>Register Page</h2>
    </div>
  )
}

export default Register
