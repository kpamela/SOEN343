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

  SQLadd_models(model, wasDeleted){                                               //Adds a model into the database
      let data = new jquery.Deferred();
    let addInfo;
    if(wasDeleted){
        addInfo = { sql: "UPDATE models SET ? WHERE ModelNumber = ?",
            values:[model, model.ModelNumber]};
    }
    else{
         addInfo = {sql: "INSERT INTO models SET ?",
            values: [model]};
    }
    handler.handleWrite(addInfo, data);
    return data;
  }

  SQLmodify_models(modelNumber, newModel){                 //Modifies the information for the model
      let data = new jquery.Deferred();
      let modifyModel = { sql: "UPDATE models SET ? WHERE ModelNumber = ?" ,
                            values:[newModel, modelNumber]};
    handler.handleWrite(modifyModel, data);
    return data;
  }

  SQLupdate_amount(modelNumber, amount){
      let data = new jquery.Deferred();
      let modifyModel = { sql: "UPDATE models SET Amount = ? WHERE ModelNumber = ?" ,
          values:[amount, modelNumber]};
      handler.handleWrite(modifyModel, data);
      return data;
  }

  SQLdelete_models(modelNumber) {                                //Will update the IsDeleted status in the database
    let data = new jquery.Deferred();
    let updateModel = {sql:"UPDATE models SET IsDeleted = 1 WHERE ModelNumber = ?",
                         values: [modelNumber]};
      handler.handleWrite(updateModel,data);
      return data;
  }

}
module.exports = ModelTDG;
