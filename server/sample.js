const sampleUsers = [
    /* 1 */
    { employeeId: 10001,
      password: "hello",
      hubName: "Manila" },

    /* 2 */
    { employeeId: 10002,
        password: "sample",
        hubName: "Romblon" },

    /* 3 */
    { employeeId: 10003,
        password: "pass",
        hubName: "Magdiwang" },

    /* 4 */
    { employeeId: 10004,
        password: "four",
        hubName: "Cajidiocan" },

    /* 5 */
    { employeeId: 10005,
        password: "last",
        hubName: "San Fernando" },
];

const sampleOrders = [
    /* 1 */
    {   orderId : "FRI12345",
        senderName : "John Dela Cruz",
        receiverName : "Juan Perez",
        senderNum : 9121231234,
        receiverNum : 9121234567,

        itemDesc : ["Item1", "Item2"],
        itemNum : [1, 1],
        itemPrice : [123, 456],

        transDate : "10-18-2024",
        originBranch : "Manila",
        destBranch : "Romblon",

        initialCharge : 579,
        discount : 123,
        total : 456,

        status : "IN TRANSIT",
        arrivalDate : "10-20-2024",
        updatedBy : "Manila",
        updates: [30002, 30003]
    },

    /* 2 */
    {
        orderId: "FRI98765",
        senderName: "Joseph Santos",
        receiverName: "Juan Perez",
        senderNum: 9124446574,
        receiverNum: 9122222222,

        itemDesc: ["Item11", "Item22"],
        itemNum: [3, 5],
        itemPrice: [300, 100],

        transDate: "10-18-2024",
        originBranch: "Manila",
        destBranch: "Romblon",

        initialCharge : 1400,
        discount : 100,
        total: 1500,

        status: "PROCESSING",
        arrivalDate: "---",
        updatedBy: "---",
        updates: []
    },

    /* 3 */
    {   orderId : "THU11111",
        senderName : "Juan Dela Cruz",
        receiverName : "Juanita",
        senderNum : 9129874567,
        receiverNum : 9123331122,

        itemDesc : ["Item12"],
        itemNum : [5],
        itemPrice : [400],

        transDate : "10-17-2024",
        originBranch : "Magdiwang",
        destBranch : "Manila",

        initialCharge : 2000,
        discount : 100,
        total : 1900,

        status : "PROCESSING",
        arrivalDate : "10-27-2024",
        updatedBy : "Magdiwang",
        updates : [30001] 
    },
];

const sampleUpdates = [
    /* 1 */
    {   updateId : 30001,
        status : "PROCESSING",
        statusDesc : "The order has been received and is being prepared for shipment",
        updateDate : "10-17-2024",
        updateTime : "09:30:00 PM" },


    /* 2 */
    {   updateId : 30002,
        status : "PROCESSING",
        statusDesc : "The order has been received and is being prepared for shipment",
        updateDate : "10-18-2024",
        updateTime : "07:18:39 AM" },    

    /* 3 */
    {   updateId : 30003,
        status : "IN TRANSIT",
        statusDesc : "The package is on its way to the destination",
        updateDate : "10-18-2024",
        updateTime : "12:18:39 PM" },
];

module.exports = { sampleUsers, sampleOrders, sampleUpdates };