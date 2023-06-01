import { useRouter } from "next/router"

function Login(){
  const router = useRouter()
  return(
  <div>
      <button onClick={()=>router.push('api/auth/signin/google')}>gAA</button>
      <div>gAA</div>
    </div>
  )
}

export default Login
