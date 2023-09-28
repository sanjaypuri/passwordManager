const bodyParser = require('body-parser');
const express = require('express');
const conn = require('./database');
const cors = require('cors');

const app = express();
app.use(express.static('./build'));

app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.use(cors(
  {
    origin:["http://localhost:3000", "https://password-manager-fawn.vercel.app"],
    methods:["GET", "POST", "DELETE", "PUT", "OPTIONS"],
    credentials: true
  }
));

app.get("/api/passwords", (req, resp) => {
  const sql = 'select * from passwords';
  try{
    conn.query(sql, (err, result) => {
      if(err){
        return resp.json({status: 300, success: false, error:err});
      }
      if(result.length == 0){
        return resp.json({status: 300, success: false, error:"no records"});
      }
      return resp.json({status:200, data:result, success:true});
      // return resp.json(rows);
    });
  } catch (error){
    return resp.json({
      status: 400,
      success: false,
    });
  }
});

app.patch('/api/updatepassword', (req, resp)=>{
  const sql = "UPDATE passwords SET name=?, website=?, username=?, password=?, notes=? WHERE id=?";
  const {name, website, username, password, notes, id} = req.body;
  try{
    console.log(name);
    conn.query(sql, [name, website, username, password, notes, id], (err, result)=>{
      if(err){
        return resp.json({status:300, success:false, error:err})
      }
      console.log("Updated successfully");
    });
    return resp.json({
      status:200,
      success:true
    });
  } catch (error){
    return resp.json({
      status:400,
      success: false
    });
  }
});

app.post('/api/newpassword', (req, resp)=>{
  const sql = "INSERT INTO passwords (name, website, username, password, notes) values(?, ?, ?, ?, ?)";
  const {name, website, username, password, notes} = req.body;
  try{
    conn.query(sql, [name, website, username, password, notes], (err, result)=>{
      if(err){
        return resp.json({status:300, success: false, error:err});
      }
      console.log("Successful input ", name);
    });
    return resp.json({
      status:200,
      success: true
    });
  } catch (error) {
    return resp.json({
      status:400,
      success:false,
    });
  }
});

app.delete('/api/password/:id', (req, resp)=>{
  try{
    const sql = "DELETE FROM passwords WHERE id = ?";
    conn.query(sql, [req.params.id], (err)=>{
      if(err){
        return resp.json({
          status:300,
          success:false,
          error:err
        });
      }
      console.log("Successfully deleted record ", req.params.id);
    });
    return resp.json({
      status:200,
      success:true
    });
  } catch (error){
    return resp.json({
      status:400,
      success: false
    });
  }
});

app.get("/api/notes", (req, resp) => {
  const sql = 'select * from notes';
  try{
    conn.query(sql, (err, result) => {
      if(err){
        return resp.json({status: 300, success: false, error:err});
      }
      if(result.length == 0){
        return resp.json({status: 300, success: false, error:"no records"});
      }
      return resp.json({status:200, data:result, success:true});
      // return resp.json(rows);
    });
  } catch (error){
    return resp.json({
      status: 400,
      success: false,
    });
  }
});

app.patch('/api/updatenote', (req, resp)=>{
  const sql = "UPDATE notes SET name=?, details=? WHERE id=?";
  const {name, details, id} = req.body;
  try{
    console.log(name);
    conn.query(sql, [name, details, id], (err, result)=>{
      if(err){
        return resp.json({status:300, success:false, error:err})
      }
      console.log("Updated successfully");
    });
    return resp.json({
      status:200,
      success:true
    });
  } catch (error){
    return resp.json({
      status:400,
      success: false
    });
  }
});

app.delete('/api/note/:id', (req, resp)=>{
  try{
    const sql = "DELETE FROM notes WHERE id = ?";
    conn.query(sql, [req.params.id], (err, result)=>{
      if(err){
        return resp.json({
          status:300,
          success:false,
          error:err
        });
      }
      console.log("Successfully deleted record ", req.params.id);
    });
    return resp.json({
      status:200,
      success:true
    });
  } catch (error){
    return resp.json({
      status:400,
      success: false
    });
  }
});

app.post('/api/newnote', (req, resp)=>{
  const sql = "INSERT INTO notes (name, details) values(?, ?)";
  const {name, details} = req.body;
  try{
    conn.query(sql, [name, details], (err, result)=>{
      if(err){
        return resp.json({status:300, success: false, error:err});
      }
      console.log("Successful input ", name);
    });
    return resp.json({
      status:200,
      success: true
    });
  } catch (error) {
    return resp.json({
      status:400,
      success:false,
    });
  }
});

app.get("/api/wallets", (req, resp) => {
  const sql = 'select * from wallets';
  try{
    conn.query(sql, (err, result) => {
      if(err){
        return resp.json({status: 300, success: false, error:err});
      }
      if(result.length == 0){
        return resp.json({status: 300, success: false, error:"no records"});
      }
      return resp.json({status:200, data:result, success:true});
      // return resp.json(rows);
    });
  } catch (error){
    return resp.json({
      status: 400,
      success: false,
    });
  }
});

app.patch('/api/updatewallet', (req, resp)=>{
  const sql = "UPDATE wallets SET name=?, cardno=?, validfrom=?, validto=?, cvc=?, pin=?, bank=?, notes=? WHERE id=?";
  const {name, cardno, validfrom, validto, cvc, pin, bank, notes, id} = req.body;
  try{
    conn.query(sql, [name, cardno, validfrom, validto, cvc, pin, bank, notes, id], (err, result)=>{
      if(err){
        return resp.json({status:300, success:false, error:err})
      }
      console.log("Updated successfully");
    });
    return resp.json({
      status:200,
      success:true
    });
  } catch (error){
    return resp.json({
      status:400,
      success: false
    });
  }
});

app.delete('/api/wallet/:id', (req, resp)=>{
  try{
    const sql = "DELETE FROM wallets WHERE id = ?";
    conn.query(sql, [req.params.id], (err, result)=>{
      if(err){
        return resp.json({
          status:300,
          success:false,
          error:err
        });
      }
      console.log("Successfully deleted record ", req.params.id);
    });
    return resp.json({
      status:200,
      success:true
    });
  } catch (error){
    return resp.json({
      status:400,
      success: false
    });
  }
});

app.post('/api/newwallet', (req, resp)=>{
  const sql = "INSERT INTO wallets (name, cardno, validfrom, validto, holdername, cvc, pin, bank, notes) values(?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const {name, cardno, validfrom, validto, holdername, cvc, pin, bank, notes} = req.body;
  try{
    conn.query(sql, [name, cardno, validfrom, validto, holdername, cvc, pin, bank, notes], (err,result)=>{
      if(err){
        return resp.json({status:300, success: false, error:err});
      }
      console.log("Successful input ", name);
    });
    return resp.json({
      status:200,
      success: true
    });
  } catch (error) {
    return resp.json({
      status:400,
      success:false,
    });
  }
});

app.listen(PORT, ()=> {
  console.log(`server is listning on port ${PORT}`);
});

