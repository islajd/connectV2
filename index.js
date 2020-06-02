

//imports for update location
const{ updateLocation } = require('lib/data/updateLocation.js')
const{ Location } = require('lib/entities/Location.js')


//imports for update shift
const{ updateCashDrawerShift } = require('lib/data/updateCashDrawerShift.js')
const{ CashDrawerShift } = require('lib/entities/CashDrawerShift.js')


//imports for update shift events
const{ updateCashDrawerShiftEvent } = require('lib/data/updateCashDrawerShiftEvent.js')
const{ CashDrawerShiftEvent } = require('lib/entities/CashDrawerShiftEvent.js')


module.exports.handler = async (event, context, callback ) => {
    /*
    //update location example
    const { merchantId, nipt } = event

    //keep the same key values that comes from sqs and change only the values you
    //want to update
    //example values
    let data = {
        "gov":{
            "tcr": {
                "businUnitCode": "123",
                "issuerNUIS": "J12345678A",
                "mantainerCode": "123",
                "softCode": "123",
                "TCRCode": "123",
                "TCRIntID": "123",
                "validFrom": "123",
                "validTo": "123"
            }
        }
    }

    //values to change
    data.gov.tcr.TCRCode = "!@#$%"
    data.gov.tcr.softCode = "q4refiosdj4r"

    const location = new Location(merchantId, nipt, data)

    try{
        let response = await updateLocation(location)
    }catch(err){
        console.log(err)
    }

    */

    // //update cashDrawerExample
    // let {merchantId, nipt, shiftId} = event
    //
    // //key-values only what you want to update
    // let data = {
    //     "gov-responseCode" : 200,
    //     "gov-responseMessage": "312ewqd1xe-123erxwec-4365fas-faed",
    //     "description": "u ndryshua"
    // }
    //
    // let cdrSh = new CashDrawerShift(merchantId,nipt,shiftId, data)
    //
    // try{
    //     await updateCashDrawerShift(cdrSh)
    // }catch(err){
    //     console.log(err)
    // }

    //update cashDrawerEvent Example
    //key-values only what you want to update
    let {merchantId, nipt, shiftId, eventId, eventType} = event

    let data = {
        "gov-responseCode" : 200,
        "gov-responseMessage": "312ewqd1xe-123erxwec-4365fas-faed",
        "description": "u ndryshua"
    }

    let cdrShE = new CashDrawerShiftEvent(merchantId, nipt, shiftId, eventId, eventType, data)

    try{
        await updateCashDrawerShiftEvent(cdrShE)
    }catch(err){
        console.log(err)
    }
};