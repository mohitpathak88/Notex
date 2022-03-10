const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Creating a Schema:
const blogSchema = new Schema({     //Creating a new instance of the schema object      //Now we have to pass an object as a parameter to \
    //   define a structure of our database
    title: {
      type: String,
      required: true        //Means this field is required for blog document
    },
    snippet: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    }
  }, { timestamps: true });     //Second argument... It automatically generates time stamp properties for us on our blog documents

const Blog = mongoose.model('Blog', blogSchema);   //Creating Models based on schema //Name of the models are started with capital letter.. hence, "Blog".
// The first argument it takes is the name of the model. Second argument is going to be the schema at which the model is based upon
module.exports = Blog;      //Exporting the model so we can use it elsewhere in the  project