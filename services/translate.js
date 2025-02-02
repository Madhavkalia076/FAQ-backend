const translate=require('@vitalets/google-translate-api');

async function translateText(text,targetLang){
  try{
    const res=await translate(text,{to:targetLang});
    return res.text;

  }
  catch(err){
    console.log("Translation Error:",err);
    return text;
  }
}

module.exports={translateText};