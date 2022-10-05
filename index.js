import {Payment, Callback} from 'ecommpay'
import express from "express"
import {v4 as uuidv4} from 'uuid'
import cors from "cors"

const PORT = process.env.PORT || 3000
const app = express()
const secret = "8503b1297ca663bd24bdbae27bc35e68fa7e4fe2ec93458d20499740c9a0832f48369eaf0748925126979fc4c687558a98ee5fabeb59d3b08251035467c51ea9"
const projectId = 91592

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  return res.status(200).json({"STATUS": "Ok", "MESSAGE": "Server is up and running"})
})

app.post("/pay", (req, res) => {
  const payId = uuidv4()
  const {payAmout, payCurrency} = req.body
  if (!payAmout || !payCurrency) {
    return res.status(400).json({"MESSAGE": "Intercepted request"})
  }
  const payment = new Payment(projectId, secret)
  payment.paymentId = payId
  payment.paymentAmount = payAmout
  payment.paymentCurrency = payCurrency
  payment.paymentDescription = payDesc
  const payUrl = payment.getUrl()
  return res.status(200).json({"URL": payUrl})
})

app.post('/payment/callback', (req, res) => {
  const callback = new Callback(secret, req.body)
  console.log("CALLBACK: " + callback)
  if (callback.isPaymentSuccess()) {
    const paymentCont = callback.payment()
    const paymentId = callback.getPaymentId()
  }
});

app.listen(PORT, () => console.log("Server is running on PORT: " + PORT))