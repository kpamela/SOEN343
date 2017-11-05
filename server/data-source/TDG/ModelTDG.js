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

  SQLget_models(model){                                          //Retrieves model of specified modelnumber
      let data = new jquery.Deferred();
      let modelInfo = {sql: `SELECT * FROM models WHERE models.ModelNumber = ?`,
                     values: [model]};
    handler.handleRead(modelInfo, data);
    return data;
  }


  /****************************************
                Write
  ****************************************/

  SQLadd_models(model){                                               //Adds a model into the database
      let data = new jquery.Deferred();
    let addInfo = {sql: "INSERT INTO models SET ?",
                    values: [model]};
    handler.handleWrite(addInfo, data);
    return data;
  }

  SQLmodify_models(modelNumber, newModel){                 //Modifies the information for the model
      let data = new jquery.Deferred();
      let modifyModel = {sql: "UPDATE models SET ? WHERE models.ModelNumber =" + modelNumber,
                         values: newModel};
    handler.handleWrite(modifyModel, data);
    return data;
  }

  SQLdelete_models(modelNumber){                                       //Will remove a model from the database
      let data = new jquery.Deferred();
    let deleteProduct = {sql:`DELETE FROM models WHERE ModelNumber = ?`,
                         values: [modelNumber]};
      handler.handleWrite(deleteProduct,data);
      return data;
  }

}
module.exports = ModelTDG;
