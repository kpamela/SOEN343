/*
 Created by kpamela on 2017-10-21.
*/

const mysql = require('mysql');

class ModelTDG{

  /****************************************
                  Read
  ****************************************/
  SQLget_model_All(){                                                //Retrieves all models in the database
    let modelInfo = `SELECT * FROM models`;
    handleRead(modelInfo);
  }

  SQLget_model_All(category){                                          //Retrieves all models of a certain category
    let modelInfo = {sql: `SELECT * FROM models WHERE models.Discriminator = ?`
                     values: [category]};
    handleRead(modelInfo);
  }


  /****************************************
                Write
  ****************************************/

  SQLadd_model(model){                                               //Adds a model into the database
    let addModel = 'INSERT INTO models SET ?';
    handleWrite(addModel);
  }

  SQLmodify_model(modelNumber, column, modification){                 //Modifies the information for the model
    let modifyModel = '';
    handleWrite(modifyModel);
  }

  SQLdelete_product(modelNumber){                                       //Will remove a model from the database
    let deleteProduct = {sql:'DELETE FROM models WHERE ModelNumber = ?',
                         value: [modelNumber]};
      handler.handleWrite(deleteProduct);
  }

  /****************************************
              Query execution
  ****************************************/
  handleRead(input){                                                //To be used after read queries for debugging
    connection.query(sqlStatement, input, (err, result) => {
        if(err){
            console.log(err);
        }
        else{
          console.log("Successful read");
        }
    });
  }

  handleWrite(input){                                               //To be used after write queries for debugging
    connection.query(sqlStatement, input, (err, result) => {
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
