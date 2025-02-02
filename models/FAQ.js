const mongoose=require('mongoose')
const {schema}=mongoose;
const {translateText}=require('../services/translate');

const faqschema=new mongoose.Schema({
  question:{type:String,required:true},
  answer:{type:String,required:true},
  question_hi:{type:String},
  question_bn:{type:String},
});

faqschema.methods.getTranslatedQuestion=function(lang='en'){
  if(lang=='hi' && this.question_hi) return this.question_hi;
  if(lang=='bn' && this.question_bn) return this.question_bn;
  return this.question;
}

faqschema.schema.pre('save',async function(next){
  if(!this.question_hi){
    this.question_hi=await translateText(this.question,'hi');
  }
  if(!this.question_bn){
    this.question_bn=await translateText(this.question,'bn');
  }
  next();
});

module.exports=mongoose.model('FAQ',faqschema);