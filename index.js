import {Payment, Callback} from 'ecommpay'
import express from "express"
import {v4 as uuidv4} from 'uuid'
import cors from "cors"

const PORT = process.env.PORT || 3000
const app = express()
const secret = "8ad76754f79a436dfdf853d99f8d0cc0e0c7d532cecd6fa68acdbeff8a7952ff071f214e3388720874828bdecdc34aac25b9a10cd2a285eea727762693fe83ad"
const projectId = 91771

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