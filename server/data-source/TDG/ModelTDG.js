/*
 Created by kpamela on 2017-10-21.
*/

const mysql   = require('mysql'),
      handler = require('./handler.js');

class ModelTDG{

  /****************************************
                  Read
  ****************************************/
  SQLget_model_All(){                                                //Retrieves all models in the database
    let modelInfo = `SELECT * FROM models`;
    handler.handleRead(modelInfo);
  }

  SQLget_model_All(category){                                          //Retrieves all models of a certain category
    let modelInfo = {sql: `SELECT * FROM models WHERE models.Discriminator = ?`,
                     values: [category]};
    handler.handleRead(modelInfo);
  }


  /****************************************
                Write
  ****************************************/

  SQLadd_model(model){                                               //Adds a model into the database
    let addModel = {sql: 'INSERT INTO models SET ?',
                    values:[model];
    handler.handleWrite(addModel);
  }

  SQLmodify_model(modelNumber, column, modification){                 //Modifies the information for the model
    let modifyModel = '';
    handler.handleWrite(modifyModel);
  }

  SQLdelete_product(modelNumber){                                       //Will remove a model from the database
    let deleteProduct = {sql:'DELETE FROM models WHERE ModelNumber = ?',
                         values: [modelNumber]};
      handler.handleWrite(deleteProduct);
  }

}
module.exports = ModelTDG;
