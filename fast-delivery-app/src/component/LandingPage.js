import CreateUser from './CreateUser'

function LandingPage(props) {
  const { userAddress, setUserAddress } = props
  return (
    <CreateUser userAddress={userAddress} setUserAddress={setUserAddress} />
  )
}

export default LandingPage