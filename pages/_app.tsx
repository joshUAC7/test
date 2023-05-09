import '@/styles/globals.css'
import type { AppProps } from 'next/app'


export default function App({ Component, pageProps }: AppProps) {
//    pageProps = pageProps.posts
// console.log(pageProps)
// function convertData(data:any[]){
//     return data.map(function(ele:any){
//       return {
//         ...ele,
//         evaluadores: ele.evaluadores.map((ele2:any)=>({"name":ele2,"grade":1}))
//       }
//     }
//     )
//   }
//   // const finalProps = convertData(pageProps)
//   const [actualData,setActualData] = useState(finalProps)

  //<Modal componentName="programa1" componentData={['grado','pregrado']}></Modal>         
  // useEffect(()=>{
  //   if(typeof posts === 'object' && Object.keys(posts).length  > 0){
  //     setData(finalData)
  //   }
  // },[setData])

  // useEffect(()=>{
  //   if(Object.keys(actualData).length <= 0 && Object.keys(data).length >0){
  //     setData(finalData)
  //   }
  // },[])
  return (
    <Component {...pageProps} />
    )
}
