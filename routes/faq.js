const express=require('express')
const router=express.Router();
const FAQ=require('../models/FAQ');
const redisClient=require('../config/redis');

router.get('/',async(req,res)=>{
  try{
    const lag=req.query.lang || 'en';
    const cachekey=`faqs_${lang}`;

    const cachedFAQs=await redisClient.get(cachekey);
    if(cachedFAQs){
      return res.json(JSON.parse(cachedFAQs));
    }

    const faqs=await FAQ.find();
    const translatedFAQs=faqs.map(faq =>({
      id:faq._id,
      question:faq.getTranslatedQuestion(lang),
      answer:faq.answer,
    }));

    await redisClient.set(cachekey,JSON.stringify(translatedFAQs),{
      EX:60*15,
    });

    res.json(translatedFAQs);
  }
  catch(err){
    res.status(500).json({message:err.message});
  }
});

module.exports=router;