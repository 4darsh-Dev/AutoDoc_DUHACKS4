const snarkjs = require('snarkjs')
const fs = require('fs')

const generateProof = async (req, res) => {
  try {
    const { age, rand } = req.body
    console.log(age, rand)
    // Validate input
    if (typeof age !== 'number' || typeof rand !== 'number') {
      return res.status(400).json({ error: 'Invalid input' })
    }
    // Load the WASM and ZKEY files
    const wasmPath = './circuit/AgeCircuit_js/AgeCircuit.wasm'
    const zkeyPath = './circuit/AgeCircuit_0001.zkey'

    // Generate the witness
    const { proof, publicSignals } = await snarkjs.groth16.fullProve(
      { age, rand },
      wasmPath,
      zkeyPath
    )

    // Save or return the proof and public signals
    return res.status(200).json({
      proof,
      publicSignals
    })
  } catch (error) {
    console.error('Error generating proof:', error)
    res.status(500).json({ error: 'Failed to generate proof' })
  }
}
const verifyProof = async (req, res) => {
  try {
    const { proof, publicSignals } = req.body

    // Load the verification key
    const vkey = require('../../circuit/verification_key.json')

    // Verify the proof
    const isValid = await snarkjs.groth16.verify(vkey, publicSignals, proof)

    // Return verification result
    res.json({ isValid })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Failed to verify proof' })
  }
}
module.exports = {
  generateProof,
  verifyProof
}
