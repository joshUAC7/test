import { useRouter } from "next/router"

function Login(){
  const router = useRouter()
  return(
  <div>
      <button onClick={()=>router.push('api/auth/signin/google')}>gAA</button>
    </div>
  )
}

export default Login
