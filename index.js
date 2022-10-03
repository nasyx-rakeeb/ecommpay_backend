import {Payment, Callback} from 'ecommpay'
import express from "express"
import {v4 as uuidv4} from 'uuid'
import cors from "cors"

const PORT = process.env.PORT || 3000
const app = express()
const secret = "3b25b6736ee83c8018639489c0e729fd03188643fea7527df115a6c818654afeef47ff731e365554a4e78609ca879bff5cbbedacf1c3302d91f44e24e599ae9c"
const projectId = 91662

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  return res.status(200).json({"STATUS": "Ok", "MESSAGE": "Server is up and running"})
})
app.get("/test", (req, res) => {
  return res.status(200).redirect("https://google.com")
})
app.post("/pay", (req, res) => {
  const payId = uuidv4()
  const {payAmout, payCurrency, payDesc} = req.body
  if (!payAmout || !payCurrency || !payDesc) {
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

app.listen(PORT, () => console.log("Server is running on port: " + PORT))