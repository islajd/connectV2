const eventTypes= {
    PAID_IN : "PAID_IN",
    PAID_OUT: "PAID_OUT"
}

// for update new CashDrawerShift(merchantId, locationId, shiftId, {id})
// for create add the input paramter that came from graph ql

class CashDrawerShiftEvent{
    constructor(merchantId, locationId, shiftId, id, eventType, {...cashDrawerShiftEventData}){
        this.merchantId = merchantId
        this.locationId = locationId
        this.shiftId= shiftId
        this.id = id
        this.eventType = eventType

        //in case of not creating stop/return
        if(Object.keys(cashDrawerShiftEventData).length!==0){
            this.cashDrawerShiftEventData = cashDrawerShiftEventData
        }
    }

    key() {
        return {
            'PK': `${this.merchantId}#${this.locationId}#${this.shiftId}`,
            'SK-1': `${this.id}#${this.eventType}`
        }
    }

    // for put
    toItem() {
        return {
            ...this.key(),
            ...this.cashDrawerShiftEventData,
            merchantId: this.merchantId,
            locationId: this.locationId,
            shiftId: this.shiftId,
            id: this.id
        }
    }
}

module.exports = {
    CashDrawerShiftEvent
}