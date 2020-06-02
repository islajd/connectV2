class Location{
    constructor(merchantId, nipt, {...locationData}) {
        this.merchantId = merchantId
        this.nipt = nipt

        if(Object.keys(locationData).length !== 0) this.locationData = locationData
    }

    key(){
        return {
            'PK' : "Merchant#" + this.merchantId,
            'SK': "Location#" + this.nipt
        }
    }

    toDynamoDBItem(){
        return{
            ...this.key(),
            ...this.locationData,
        }
    }
}

module.exports = {
    Location
}