
type Props = {
  children: React.ReactNode
}
const Layout = ({children}:Props) => {
  return (
    <>
      <div className="min-h-screen">
        <h1>GAAA</h1>
        <main>{children}</main>
      </div>
    </>
  )
}
export default Layout
