const mongoose = require('mongoose');
const donationSchema = new mongoose.Schema({
    donor:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'User',
       required:true 
    },

    itemName:{
        type:String,
        required:true
    },
     quantity: { 
        
        type: String,
         required: true },
    condition:{
        type:String,
        enum:['New', 'Good', 'Used'],
        required:true
    },
    pickupAddress:{
        type:String,
        required:true,
    },
    pickupDate:{
        type:Date,
        required:true
    }, 
      imageFilename: String,
    status:{
        type: String, 
        enum: ['pending', 'approved', 'matched', 'delivered'], 
        default: 'pending' 
    },
    createdAt: { 
        type: Date, 
        default: Date.now }
})
module.exports = mongoose.model('Donation', donationSchema);