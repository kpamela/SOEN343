/*
 Created by kpamela on 2017-10-21.
*/

const mysql   = require('mysql'),
      handler = require('./handler.js'),
      jquery = require('jquery-deferred');

class ModelTDG{

  /****************************************
                  Read
  ****************************************/
  SQLget_models_All(){                                                //Retrieves all models in the database
      let data = new jquery.Deferred();
      let modelInfo = `SELECT * FROM models`;
      handler.handleRead(modelInfo, data);
      return data;
  }

  SQLget_models(category){                                          //Retrieves all models of a certain category
      let data = new jquery.Deferred();
      let modelInfo = {sql: `SELECT * FROM models WHERE models.Category = ?`,
                     values: [category]};
    handler.handleRead(modelInfo, data);
  }


  /****************************************
                Write
  ****************************************/

  SQLadd_models(model){                                               //Adds a model into the database
      let data = new jquery.Deferred();
    let addModel = {sql: `INSERT INTO models SET ?`,
                    values:[model]};
    handler.handleWrite(addModel, data);
  }

  SQLmodify_models(modelNumber, column, modification){                 //Modifies the information for the model
      let data = new jquery.Deferred();
      let modifyModel = { sql: `UPDATE models SET ? = ? WHERE models.ModelNumber = ?`,
                        values:[column, modification, modelNumber]};
    handler.handleWrite(modifyModel, data);
  }

  SQLdelete_models(modelNumber){                                       //Will remove a model from the database
      let data = new jquery.Deferred();
    let deleteProduct = {sql:`DELETE FROM models WHERE ModelNumber = ?`,
                         values: [modelNumber]};
      handler.handleWrite(deleteProduct,data);
  }

}
module.exports = ModelTDG;
