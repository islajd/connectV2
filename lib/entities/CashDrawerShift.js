const defaultAmount= {
    "amount": 0,
    "currency": "LEK"
}

const states= {
    CLOSE : "CLOSE",
    END : "END",
    OPEN : "OPEN"
}

// for update new CashDrawerShift(merchantId, locationId, {id})
// for create add the input paramter that came from graph ql

class CashDrawerShift{
    //if id is passed, the user may be looking to generate the pk/sk only (update/delete)
    constructor(merchantId, locationId, id, { ...cashDrawerShiftData}){
        this.merchantId = merchantId
        this.locationId = locationId
        this.id = id

        //in case of not creating stop/return
        if(Object.keys(cashDrawerShiftData).length!==0){
            this.cashDrawerShiftData = cashDrawerShiftData
        }
    }

    key() {
        return {
            'PK': `${this.id}`,
            'SK-1': `${this.merchantId}#${this.locationId}`
        }
    }

    // for put
    toItem() {
        return {
            ...this.key(),
            ...this.CashDrawerShiftInput,
            merchantId: this.merchantId,
            locationId: this.locationId,
            id: this.id
        }
    }
}

module.exports = {
    CashDrawerShift
}