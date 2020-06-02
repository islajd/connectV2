const AWS = require('aws-sdk')
const dynamodb = new AWS.DynamoDB.DocumentClient()

/*
* input {updateLocationInput, merchantId, locationId}
* */
const updateCashDrawerShiftEvent = async (cashDrawerShiftEvent) => {
    try {
        const key = cashDrawerShiftEvent.key()
        const rest = cashDrawerShiftEvent.cashDrawerShiftEventData

        //Set up some space to keep track of things we're updating **
        let expNames = {}
        let expValues = {}
        let expSet = {}
        let expRemove = []
        let expression
        // Iterate through each argument, skipping keys **
        for(let name in rest){
            if(!rest[name]){
                // If the argument is set to "null", then remove that attribute from the item in DynamoDB **
                if(name.indexOf("-") > -1)
                    name = name.split("-")[1]

                let tmp = "#" + name
                expRemove.push(tmp)
                expNames[tmp] = name
            }
            else{
                // Otherwise set (or update) the attribute on the item in DynamoDB **
                if(name.indexOf("-") > -1){
                    let tmp = name
                    name = name.split("-")[1]
                    let key = "#" + name
                    let value = ":" + name
                    expSet[key] = value
                    expNames[key] = tmp
                    expValues[value] = rest[tmp]
                }
                else {
                    let key = "#" + name
                    let value = ":" + name
                    expSet[key] = value
                    expNames[key] = name
                    expValues[value] = rest[name]
                }
            }
        }

        // Start building the update expression, starting with attributes we're going to SET **
        if(!isEmpty(expSet)){
            expression = "SET"
            for(let name in expSet){
                expression += " " + name + " = " + expSet[name]
                expression += ","
            }
            // Remove last comma
            expression = expression.substring(0, expression.length - 1)
        }

        // Continue building the update expression, adding attributes we're going to REMOVE **
        if(expRemove.length !== 0){
            expression += " REMOVE"
            for(let name of expRemove){
                expression += " " + name
                expression += ","
            }
            // Remove last comma
            expression = expression.substring(0, expression.length - 1)
        }

        // add pk name in expression attribute names
        expNames["#PK"] = "PK"
        expNames["#SK"] = "SK-1"

        let params = {
            ReturnValues: "ALL_NEW",
            TableName: process.env.TABLE_CashDrawerShift,
            UpdateExpression: expression,
            ExpressionAttributeNames: expNames,
            ExpressionAttributeValues: expValues,
            Key: key,
            ConditionExpression: 'attribute_exists(#PK) AND attribute_exists(#SK)'
        }
        let response = await dynamodb.update(params).promise()
        return response.Attributes
    }
    catch (err) {
        console.log(err)

        let errorMessage = 'Could not update CashDrawerShiftEvent'
        // If it's a condition check violation, we'll try to indicate which condition failed.
        if (err.code === 'ConditionalCheckFailedException') {
            errorMessage = 'Given CashDrawerShiftEvent not found.'
        }
        return {
            error: errorMessage
        }
    }
}

function isEmpty(obj) {
    for(let key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

module.exports = {
    updateCashDrawerShiftEvent
}