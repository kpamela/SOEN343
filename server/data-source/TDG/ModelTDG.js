/*
 Created by kpamela on 2017-10-21.
*/

const mysql = require('mysql');

class ModelTDG{

  /****************************************
                  Read
  ****************************************/
  SQLget_model_All(){                                                   //Retrieves all models in the database
    let modelInfo = `SELECT * FROM models`;
    handleRead(modelInfo);
  }

  SQLget_model_All(category){                                          //Retrieves all models of a certain category
    let modelInfo = `SELECT * FROM models WHERE Discriminator = '${category}'`;
    handleRead(modelInfo);
  }


  /****************************************
                Write
  ****************************************/

  SQLadd_model(model){                                                 //Adds a model into the database
    let addModel = 'INSERT INTO models SET ?';
    handleWrite(addModel);
  }

  SQLmodify_model(model, modifiedInfo){                               //Modifies the information for the model
    let modifyModel = '';
    handleWrite(modifyModel);
  }


  /****************************************
              Error handling
  ****************************************/
  handleRead(input){                                                   //To be used after read queries for debugging and for returns
    connection.query(sql, input, (err, result) => {
        if(err){
            console.log(err);
        }
        else{
          console.log("Successful read");
        }
    });
  }

  handleWrite(input){                                               //To be used after write queries for debugging
    connection.query(sql, input, (err, result) => {
        if(err){
            console.log(err);
        }
        else{
          console.log("Successful write to database");
          return input;
        }
    });
  }


}
module.exports = ModelTDG;
