const express = require('express')
const path = require('path');
const app = express()
var bodyParser = require('body-parser');
var initWebRoutes = require("./src/routes/route");
const handlebars = require('express-handlebars');
const crypto = require('crypto');
const axios = require('axios');
const moment = require('moment'); // npm install moment
const qs = require('qs');
const CryptoJS = require('crypto-js'); // npm install crypto-js


// Template engine
app.engine(
  'hbs',
  handlebars.engine({ defaultLayout: 'main' ,
  extname:'.hbs',
  }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname,'src', 'resources','views'));
const port = 3000
app.use(bodyParser.urlencoded({
    extended: false
}));
  app.use(bodyParser.json());
  initWebRoutes(app);



// Thông tin app ZaloPay
const app_id = '2554';
const key1 = 'sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn';
const endpoint = 'https://sb-openapi.zalopay.vn/v2/create';
const config = {
  app_id: '2554',
  key1: 'sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn',
  key2: 'kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz',
  endpoint: 'https://sb-openapi.zalopay.vn/v2/create',
};
async function createZaloPayTransaction(amount) {
  const items = [];
  const transID = Math.floor(Math.random() * 1000000);

  const order = {
    app_id: config.app_id,
    app_trans_id: `${moment().format('YYMMDD')}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
    app_user: 'user123',
    app_time: Date.now(), // miliseconds
    item: JSON.stringify(items),
    embed_data: JSON.stringify({}),
    amount: 50000,
    //khi thanh toán xong, zalopay server sẽ POST đến url này để thông báo cho server của mình
    //Chú ý: cần dùng ngrok để public url thì Zalopay Server mới call đến được
    callback_url: 'https://b074-1-53-37-194.ngrok-free.app/callback',
    description: `Chó fiii :) #${transID}`,
    bank_code: '',
  };

  // appid|app_trans_id|appuser|amount|apptime|embeddata|item
  const data =
    config.app_id +
    '|' +
    order.app_trans_id +
    '|' +
    order.app_user +
    '|' +
    order.amount +
    '|' +
    order.app_time +
    '|' +
    order.embed_data +
    '|' +
    order.item;
  order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

  try {
    const result = await axios.post(config.endpoint, null, { params: order });
    console.log("result",result.data)
  } catch (error) {
    console.log(error);
  }
  // hello
  // try {
  //   const response = await axios.post(endpoint, data);
  //   console.log(response.data);
  //   if (response.data.return_code === 1) {
  //     console.log("Tạo giao dịch thành công:", response.data.order_url);
  //   } else {
  //     console.log("Tạo giao dịch thất bại:", response.data.return_message);
  //   }
  // } catch (error) {
  //   console.error("Lỗi khi tạo giao dịch:", error);
  // }
}

// Gọi hàm tạo giao dịch
createZaloPayTransaction(50000); // Ví dụ: thanh toán 50,000 VND





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})