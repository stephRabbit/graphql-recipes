import React from 'react'
import { PulseLoader } from 'react-spinners'

const Spinner = () => (
  <div className="spinner">
    <PulseLoader
      color={'#1eaedb'}
      margin={'3px'}
      size={20}
    />
  </div>
)

export default Spinner